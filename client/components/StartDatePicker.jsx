import React, { useState, useContext, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { FontAwesome } from "react-native-vector-icons";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { useBookingContext } from "@context/booking/useBookingContext";
import CustomModal from "@components/Modal";

const StartDatePicker = ({ userIntrected, setUserIntrected }) => {
  const { updateBookingDetails, bookingDetails } = useBookingContext();
  const [startDate, setStartDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleStartDateChange = (event, selectedDate) => {
    if (selectedDate) {
        setStartDate(selectedDate);
        setUserIntrected(true);
        setShowStartDatePicker(false);
    } else {
      const currentDate = new Date();
      setStartDate(currentDate);
      setShowStartDatePicker(false);
    }
  };
  const formattedStartDate = startDate.toISOString();
  // Add the time zone offset manually
  const formattedStartDateWithOffset = `${formattedStartDate.substring(
    0,
    formattedStartDate.length - 1
  )}+05:00`;

  useEffect(() => {
    updateBookingDetails({
      ...bookingDetails,
      bookingDate: formattedStartDateWithOffset,
    });
  }, [startDate]);
  const DateForDisplay = startDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const toggleStartDatePicker = () => {
    setShowStartDatePicker((prev) => !prev);
  };
  return (
    <>
      <CustomModal setVisible={setModalVisible} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.queCon}>
              <Text
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.infoTitle}
              >
                Please Select A Valid Date
              </Text>
            </View>
          </View>
        </View>
      </CustomModal>
      <View style={styles.Main}>
        {showStartDatePicker && (
          <DateTimePicker
            key="start-date-picker"
            value={startDate}
            mode="date"
            display="calendar"
            onChange={handleStartDateChange}
          />
        )}
        <Text style={styles.OutPutText}>{DateForDisplay}</Text>
        <TouchableOpacity onPress={toggleStartDatePicker}>
          <FontAwesome name="calendar" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default StartDatePicker;

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
