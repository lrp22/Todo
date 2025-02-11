import { Tabs } from "@/components/bottom-tabs";
import { Platform } from "react-native";

export default function TabLayout() {
  const isAndroid = Platform.OS === "android";
  return (
    <Tabs
      ignoresTopSafeArea
      tabBarInactiveTintColor="#635E5E"
      hapticFeedbackEnabled
      barTintColor="#f5f5f5"
      tabBarActiveTintColor="#dc4c3e"
    >
      <Tabs.Screen
        name="today"
        options={{
          title: "Today",
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            isAndroid
              ? focused
                ? require("@/assets/tabbar/calendar.svg")
                : require("@/assets/tabbar/calendar.svg")
              : { sfSymbol: "calendar" },
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            isAndroid
              ? focused
                ? require("@/assets/tabbar/magnifying.svg")
                : require("@/assets/tabbar/magnifying.svg")
              : { sfSymbol: "calendar" },
        }}
      />
      <Tabs.Screen
        name="browse"
        options={{
          title: "Browse",
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            isAndroid
              ? focused
                ? require("@/assets/tabbar/browse.svg")
                : require("@/assets/tabbar/browse.svg")
              : { sfSymbol: "calendar" },
        }}
      />
      <Tabs.Screen
        name="upcoming"
        options={{
          title: "Upcoming",
          tabBarIcon: ({ focused }: { focused: boolean }) =>
            isAndroid
              ? focused
                ? require("@/assets/tabbar/upcoming.svg")
                : require("@/assets/tabbar/upcoming.svg")
              : { sfSymbol: "calendar" },
        }}
      />
    </Tabs>
  );
}
