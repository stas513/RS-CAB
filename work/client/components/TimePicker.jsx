import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "react-native-vector-icons";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { useBookingContext } from "@context/booking/useBookingContext";

const TimePicker = ({ userIntrected, setUserIntrected }) => {
  const { updateBookingDetails, bookingDetails } = useBookingContext();
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    if (selectedTime) {

        setTime(selectedTime);
        setUserIntrected(true);
        setShowTimePicker(false);
    } else {
      const currentTime = new Date();
      setTime(currentTime);
      setShowTimePicker(false);
    }
  };
  const formattedTime = `${String(time.getHours()).padStart(2, "0")}:${String(
    time.getMinutes()
  ).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}`;
  useEffect(() => {
    updateBookingDetails({
      ...bookingDetails,
      bookingTime: formattedTime,
    });
  }, [time]);
  const toggleTimePicker = () => {
    setShowTimePicker(!showTimePicker);
  };

  return (
    <>
      <View style={styles.Main}>
        {showTimePicker && (
          <DateTimePicker
            key="time-picker"
            value={time}
            mode="time"
            is24Hour={true}
            display="clock"
            onChange={handleTimeChange}
          />
        )}
        <Text style={styles.OutPutText}>{formattedTime}</Text>
        <TouchableOpacity onPress={toggleTimePicker}>
          <FontAwesome name="clock-o" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default TimePicker;

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
    borderRadius: 10,
  },
  OutPutText: {
    fontSize: hp(1.8),
  },
  modalView: {
    justifyContent: "center",
    height: hp(20),
    width: wp(80),
    paddingVertical: hp(7),
    marginTop: wp(5),
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1000,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
