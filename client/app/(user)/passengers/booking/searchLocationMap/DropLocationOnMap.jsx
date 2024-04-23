import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import { useBookingContext } from "@context/booking/useBookingContext";
import MapViewDragable from "@components/MapView2";
import { ScrollView } from "react-native-gesture-handler";

function DropLocationOnMap() {
  const navigation = useRouter();
  const [address, setAddress] = useState("");
  const { bookingDetails, updateBookingDetails } = useBookingContext();
  const [isAddressEditable, setAddressEditable] = useState(false);
  useEffect(() => {
    const initialAddress =
      bookingDetails.destinationAddress &&
      bookingDetails.destinationAddress.name
        ? bookingDetails.destinationAddress.name
        : "";
    setAddress(initialAddress);
  }, [bookingDetails.destinationAddress]);
  useEffect(() => {
    const initialAddress =
      bookingDetails.dropOff && bookingDetails.dropOff.results
        ? bookingDetails.dropOff.results[0].formatted_address
        : "";
    setAddress(initialAddress);
  }, [bookingDetails.dropOff]);

  const saveDropOffAndnavigate = () => {
    updateBookingDetails({ ...bookingDetails, dropOff: address });
    navigation.push("passengers/booking/createBooking");
  };
  return (
    <>
      <CustomBottomSheet
        snapPoints={[50, 200]}
        backdrop={MapViewDragable}
        index={1}
      >

        <View style={styles.mapInpCon}>
          <Text style={styles.headingText}>Set drop-off location on map</Text>
          <View style={styles.addTextInpCont}>
            <View style={styles.addTextInp}>
              <TextInput
                style={styles.addTextInpText}
                placeholder="Choose drop-off point"
                editable={isAddressEditable}
                value={address}
                selection={{ start: 0, end: 0 }}
              />
              <Ionicons
                style={styles.addTextInpIcon}
                name="ios-locate-sharp"
                size={24}
                color="#0045BF"
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={saveDropOffAndnavigate}
            style={[styles.actionBtnMod2]}
          >
            <FontAwesome5 name="map-pin" size={20} color="white" />
            <Text style={[styles.actBtnText]}>Drop Me Here</Text>
          </TouchableOpacity>
        </View>
      </CustomBottomSheet>
    </>
  );
}

export default DropLocationOnMap;
const styles = StyleSheet.create({
  mapInpCon: {
    flex: 1,
    width: "100%",
    paddingHorizontal: "3%",
    backgroundColor: colors.skyBlue,
    justifyContent: "space-around",
  },
  headingText: {
    textAlign: "left",
    fontSize: hp(2.7),
  },
  addTextInp: {
    width: "100%",
    backgroundColor: colors.white,
    position: "relative",
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },

  actionBtnMod2: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    borderRadius: 10,
    paddingVertical: "4%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    // paddingVertical:10
  },
  actBtnText: {
    fontSize: hp(2),
    fontFamily: "Poppins-Medium",
    color: colors.white,
    marginLeft: "3%",
  },
  addTextInpText: {
    paddingLeft: "10%",
    color: colors.black,
  },
  addTextInpIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
