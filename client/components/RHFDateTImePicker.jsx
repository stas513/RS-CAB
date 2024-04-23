import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React,{useState} from "react";
import { Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "react-native-vector-icons";
import { colors } from "@utils/theme";
import { hp } from "@utils";

const RHFDateTimePicker = ({ style, name, control, placeholder, errors }) => {
  const defaultDate = new Date();
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const toggleStartDatePicker = () => {
    setShowStartDatePicker(!showStartDatePicker);
  };

  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur } }) => (
          <View style={styles.Main}>
            {showStartDatePicker?(
              <DateTimePicker
                key="start-date-picker"
                mode="date"
                value={value ? value : defaultDate}
                placeholderText={placeholder}
                display="calendar"
                onChange={(event, selectedDate) => {setShowStartDatePicker(false);onChange(selectedDate)}}
              />
            ):null}
            <Text style={styles.OutPutText}>{value?value?.toDateString():"Select a date"}</Text>
            <TouchableOpacity onPress={toggleStartDatePicker}>
              <FontAwesome name="calendar" size={24} color="black" />
            </TouchableOpacity>
          </View>
        )}
      />
      {!!errors[name] && (
        <Text style={{ color: colors.red, fontSize: hp(1.5) }}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  Main: {
    width: "100",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: "5%",
    paddingVertical: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    backgroundColor: colors.white,
    borderRadius: 5,

  },
  OutPutText: {
    fontSize: hp(1.8),
  },
});

export default RHFDateTimePicker;
