import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Button, View } from "react-native";

const TestDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View>
      <Button title="Show Date Picker" onPress={() => setShow(true)} />
      {show && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default TestDatePicker;
