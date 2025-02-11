import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Colors, DATE_COLORS } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { format, addDays, nextSaturday, addWeeks } from "date-fns";
import { useMMKVString } from "react-native-mmkv";

const Page = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useMMKVString("selectedDate");

  useEffect(() => {
    if (selectedDate) {
      setCurrentDate(new Date(selectedDate));
    }
  }, [selectedDate]);

  const onSave = (date: Date) => {
    const dateString = date.toISOString();
    setSelectedDate(dateString);
    router.dismiss();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <TouchableOpacity onPress={() => onSave(currentDate)}>
              <Text style={styles.doneButton}>Done</Text>
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.quickButtons}>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => onSave(new Date())}
        >
          <Ionicons name="today-outline" size={20} color={DATE_COLORS.today} />
          <Text style={styles.quickButtonText}>Today</Text>
          <Text style={styles.quickButtonDate}>
            {format(new Date(), "EEE")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => onSave(addDays(new Date(), 1))}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={DATE_COLORS.tomorrow}
          />
          <Text style={styles.quickButtonText}>Tomorrow</Text>
          <Text style={styles.quickButtonDate}>
            {format(addDays(new Date(), 1), "EEE")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => onSave(nextSaturday(new Date()))}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={DATE_COLORS.weekend}
          />
          <Text style={styles.quickButtonText}>This Weekend</Text>
          <Text style={styles.quickButtonDate}>
            {format(nextSaturday(new Date()), "EEE")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.quickButton}
          onPress={() => onSave(addWeeks(new Date(), 1))}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={DATE_COLORS.other}
          />
          <Text style={styles.quickButtonText}>Next Week</Text>
          <Text style={styles.quickButtonDate}>
            {format(addWeeks(new Date(), 1), "EEE")}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.selectDateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Ionicons name="calendar" size={20} color={Colors.primary} />
        <Text style={styles.selectDateText}>Select a Date</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={currentDate}
          mode={"date"}
          display="calendar"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) onSave(date);
          }}
        />
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  doneButton: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: 18,
  },
  quickButtons: {
    width: "100%", // Ensure it spans the full width
    flexDirection: "column", // Stack items vertically
    alignItems: "center", // Center align children
    paddingVertical: 20, // Add some padding inside
    borderBottomWidth: StyleSheet.hairlineWidth, // Optional
    borderColor: Colors.lightBorder, // Optional
    backgroundColor: "#fff", // Make sure the background is visible
  },
  quickButton: {
    flexDirection: "row", // Align icon and text in a row
    alignItems: "center", // Center vertically
    justifyContent: "space-between", // Space out items
    width: "90%", // Make it responsive
    padding: 12, // Add padding for better click area
    marginBottom: 10, // Add space between buttons
    borderWidth: 1, // Optional: for debugging visibility
    borderColor: Colors.lightBorder, // Optional
    borderRadius: 6, // Rounded corners
  },
  quickButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  quickButtonDate: {
    fontSize: 16,
    color: Colors.dark,
  },
  selectDateButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectDateText: {
    fontSize: 16,
    color: Colors.primary,
  },
});
