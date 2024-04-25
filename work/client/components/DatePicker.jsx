import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "react-native-vector-icons";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";

const DatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setStartDate(selectedDate);
      setStartDate(new Date());
      setShowStartDatePicker(false);
    } else {
      setShowStartDatePicker(false);
    }
  };

  const handleEndDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setEndDate(selectedDate);
      setShowEndDatePicker(false);
    } else {
      setShowEndDatePicker(false);
    }
  };

  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  const toggleEndDatePicker = () => {
    setShowEndDatePicker(!showEndDatePicker);
  };

  const formattedStartDate = startDate.toLocaleDateString("en-GB");
  const formattedEndDate = endDate.toLocaleDateString("en-GB");

  return (
    <View style={styles.main}>
      <View style={styles.pickerCont}>
        <Text style={styles.pickerNameText}>Start Date</Text>
        {showStartDatePicker && (
          <DateTimePicker
            key="start-date-picker"
            value={startDate}
            mode="date"
            display="calendar"
            onChange={handleStartDateChange}
          />
        )}
        <Text>{formattedStartDate}</Text>
        <TouchableOpacity onPress={toggleStartDatePicker}>
          <FontAwesome name="calendar" size={18} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.pickerCont}>
        <Text style={styles.pickerNameText}>End Date</Text>
        {showEndDatePicker && (
          <DateTimePicker
            key="end-date-picker"
            value={endDate}
            mode="date"
            display="calendar"
            onChange={handleEndDateChange}
          />
        )}
        <Text>{formattedEndDate}</Text>
        <TouchableOpacity onPress={toggleEndDatePicker}>
          <FontAwesome name="calendar" size={18} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: "3%",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  pickerCont: {
    flexDirection: "row",
    width: "49%",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: "5%",
  },
  pickerNameText: {
    color: colors.textDarkGrey,
    fontSize: hp(1.8),
  },
});
