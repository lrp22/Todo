import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  RefreshControl,
  View,
  SectionList,
} from "react-native";
import { format } from "date-fns";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { projects, todos } from "@/db/schema";
import { eq } from "drizzle-orm";
import Animated, {
  StretchInY,
  LayoutAnimationConfig,
} from "react-native-reanimated";

import Fab from "@/components/Fab";
import TaskRow from "@/components/TaskRow";
import { Todo } from "@/types/interfaces";
import { useSQLiteContext } from "expo-sqlite";

// Interface for section data used in SectionList
interface Section {
  title: string;
  data: Todo[];
  timestamp: number; // Added to support sorting
}

const Page = () => {
  const db = useSQLiteContext(); // SQLite database context
  const drizzleDb = drizzle(db); // Drizzle ORM instance
  const { top } = useSafeAreaInsets(); // Safe area insets for proper padding
  const today = format(new Date(), "d MMM · eee"); // Current date formatted
  const [refreshing, setRefreshing] = useState(false); // State for RefreshControl
  const [sectionListData, setSectionListData] = useState<Section[]>([]); // Data for SectionList

  // Live query to fetch tasks from Drizzle ORM
  const { data } = useLiveQuery(
    drizzleDb
      .select()
      .from(todos)
      .leftJoin(projects, eq(todos.project_id, projects.id))
      .where(eq(todos.completed, 0))
  );

  // Effect to process and format data whenever the live query updates
  useEffect(() => {
    if (!data) return;

    // Map and format the data fetched from the database
    const formattedData = data.map((item) => ({
      ...item.todos,
      project_name: item.projects?.name || "No Project",
      project_color: item.projects?.color || "#000000",
    }));

    // Group tasks by due_date
    const groupedByDay = formattedData.reduce(
      (acc: { [key: string]: { tasks: Todo[]; timestamp: number } }, task) => {
        const rawDate = task.due_date ? new Date(task.due_date) : null;
        const day = rawDate
          ? format(rawDate, "d MMM · eee")
          : "Unknown Date";

        if (!acc[day]) {
          acc[day] = {
            tasks: [],
            timestamp: rawDate ? rawDate.getTime() : Infinity, // Use Infinity for unknown dates
          };
        }
        acc[day].tasks.push(task);
        return acc;
      },
      {}
    );

    // Convert grouped tasks into SectionList format and sort by timestamp
    const listData: Section[] = Object.entries(groupedByDay)
      .map(([day, { tasks, timestamp }]) => ({
        title: day,
        data: tasks,
        timestamp,
      }))
      .sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp

    setSectionListData(listData); // Update the state for SectionList
  }, [data]);

  // Function to manually refresh tasks (used by RefreshControl)
  const loadTasks = async () => {
    setRefreshing(true);
    try {
      const tasks = await db.getAllAsync<Todo>(`
        SELECT todos.*, projects.name as project_name
        FROM todos
        LEFT JOIN projects ON todos.project_id = projects.id
        WHERE todos.completed = 0
      `);

      if (tasks) {
        const groupedTasks = tasks.reduce((groups, task) => {
          const rawDate = task.due_date ? new Date(task.due_date) : null;
          const taskDate = rawDate
            ? format(rawDate, "d MMM · eee")
            : "Unknown Date";

          if (!groups[taskDate]) {
            groups[taskDate] = {
              tasks: [],
              timestamp: rawDate ? rawDate.getTime() : Infinity,
            };
          }
          groups[taskDate].tasks.push(task);
          return groups;
        }, {} as Record<string, { tasks: Todo[]; timestamp: number }>);

        const listData = Object.entries(groupedTasks)
          .map(([date, { tasks, timestamp }]) => ({
            title: date,
            data: tasks,
            timestamp,
          }))
          .sort((a, b) => a.timestamp - b.timestamp); // Sort by timestamp

        setSectionListData(listData);
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setRefreshing(false); // Stop the refresh indicator
    }
  };

  return (
    <View style={[styles.container, { paddingTop: top - 36 }]}>
      <SectionList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        sections={sectionListData}
        renderItem={({ item }) => (
          <LayoutAnimationConfig>
            <Animated.View entering={StretchInY}>
              <TaskRow task={item} />
            </Animated.View>
          </LayoutAnimationConfig>
        )}
        renderSectionHeader={({ section }) => (
          <Text style={styles.header}>{section.title}</Text>
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadTasks} />
        }
      />
      <Fab />
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 82,
  },
  header: {
    fontSize: 16,
    backgroundColor: "#fff",
    fontWeight: "bold",
    padding: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.lightBorder,
  },
});
