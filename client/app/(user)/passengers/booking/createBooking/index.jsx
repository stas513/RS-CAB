import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import TimePicker from "@components/TimePicker";
import { CustomButton } from "@components/CustomButton";
import MapView from "@components/MapView";
import FixedAddressComponent from "@components/FixedAdressComponent";
import CustomBottomSheet from "@components/BottomSheet";
import { useRouter } from "expo-router";
import StartDatePicker from "@components/StartDatePicker";
import PersonAndBags from "@components/PersonAndBags";
import { useBookingContext } from "@context/booking/useBookingContext";
import CustomModal from "@components/Modal";
import { ScrollView } from "react-native-gesture-handler";

function SheduledBooking() {
  const navigation = useRouter();
  const [userIntrected, setUserIntrected] = useState(false);
  const { bookingDetails, updateBookingDetails } = useBookingContext();
  const [modalVisible, setModalVisible] = useState(false);

  const pickUpDescription =
    bookingDetails && bookingDetails.startAddress
      ? bookingDetails.startAddress.name
      : "";
  const dropOffDescription =
    bookingDetails && bookingDetails.destinationAddress
      ? bookingDetails.destinationAddress.name
      : "";

  const handlePressNextButton = () => {
    if (!userIntrected) {
      setModalVisible(true);
    } else if (!bookingDetails.bookingDate || !bookingDetails.bookingTime) {
      Alert.alert("please select date and time");
    } else {
      navigation.push("passengers/booking/bagsAndPersons");
    }
  };

  const handleBookForNow = () => {
    const currentDate = new Date();
    const formattedStartDate = currentDate.toISOString();
    const formattedStartDateWithOffset = `${formattedStartDate.substring(
      0,
      formattedStartDate.length - 1
    )}+05:00`;

    // Format the current time
    const formattedTime = `${String(currentDate.getHours()).padStart(
      2,
      "0"
    )}:${String(currentDate.getMinutes()).padStart(2, "0")}:${String(
      currentDate.getSeconds()
    ).padStart(2, "0")}`;

    updateBookingDetails({
      ...bookingDetails,
      bookingDate: formattedStartDateWithOffset,
      bookingTime: formattedTime,
    });

    setModalVisible(false);
    setUserIntrected(true);

    // Continue to the next screen.
    navigation.push("passengers/booking/bagsAndPersons");
  };

  return (
    <>
      <CustomModal setVisible={setModalVisible} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.queCon}>
              <Text>
                You are not selected any date or time your ride will book for
                now
              </Text>
            </View>
            <CustomButton
              text="Yes Book For Now"
              backgroundColor={colors.blue}
              onPress={handleBookForNow}
            />
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet snapPoints={[130, 400]} backdrop={MapView} index={1}>
          <View style={styles.ContentCont}>
            <View>
              <ScrollView>
                <FixedAddressComponent
                  data={[pickUpDescription, dropOffDescription]}
                />
              </ScrollView>
            </View>

            <View style={styles.dateAndTimeCon}>
              <View style={styles.DateCont}>
                <Text style={styles.pickerNameText}>Start Date</Text>
                <StartDatePicker
                  userIntrected={userIntrected}
                  setUserIntrected={setUserIntrected}
                />
              </View>
              <View style={styles.TimeCont}>
                <Text style={styles.pickerNameText}>Start Time</Text>
                <TimePicker
                  userIntrected={userIntrected}
                  setUserIntrected={setUserIntrected}
                />
              </View>
            </View>
            <View style={styles.QtyCon}>
              <PersonAndBags />
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginVertical: "2%",
              }}
            >
              <CustomButton
                text="Next"
                backgroundColor={colors.blue}
                onPress={handlePressNextButton}
              />
            </View>
          </View>
      </CustomBottomSheet>
    </>
  );
}

export default SheduledBooking;

const styles = StyleSheet.create({
  ContentCont: {
    paddingHorizontal: "5%",
    flex: 1,
    backgroundColor: colors.skyBlue,
  },
  dateAndTimeCon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor:"black"
  },
  DateCont: {
    marginVertical: "2%",
    width: "49%",
  },
  TimeCont: {
    marginVertical: "2%",
    width: "49%",
  },
  QtyCon: {
    justifyContent: "center",
    marginVertical: "2%",
  },
  Act1Con: {
    marginVertical: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  carDetails: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: hp(2),
  },
  carDetailsCat: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carDetailsImg: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carDetailsfare: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  pickerCont: {
    backgroundColor: colors.white,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
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
  pickerNameText: {
    color: colors.textDarkGrey,
    fontSize: hp(2),
    marginBottom: "2%",
  },
  actionBtn: {
    backgroundColor: colors.lightGreen,
    width: "70%",
    borderRadius: 50,
    paddingVertical: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: hp(2.3),
  },

  FindActBtnCon: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "3%",
  },
  QtyCon: {
    justifyContent: "center",
    marginVertical: 15,
  },
  modalView: {
    justifyContent: "ceneter",
    alignItems: "center",

    width: wp(80),
    paddingVertical: hp(3),
    marginTop: wp(5),
    backgroundColor: "white",
    borderRadius: 10,
    zIndex: 1000,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  queCon: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "10%",
    marginBottom: "10%",
  },
});
