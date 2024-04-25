import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  I18nManager,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import MapViewDragable from "@components/MapView2";
import { Marker } from "react-native-maps";
import { useNavigation } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import { useBookingContext } from "@context/booking/useBookingContext";
import { ScrollView } from "react-native-gesture-handler";

function PickLocationOnMap() {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const { bookingDetails, updateBookingDetails, setRoute } =
    useBookingContext();
  const [isAddressEditable, setAddressEditable] = useState(false);
  useEffect(() => {
    const initialAddress =
      bookingDetails.startAddress && bookingDetails.startAddress.name
        ? bookingDetails.startAddress.name
        : "";
    setAddress(initialAddress);
  }, [bookingDetails.startAddress]);

  const savePickUpAndnavigate = () => {
    setRoute("searchLocationMap/DropLocationOnMap");
    navigation.navigate("searchLocationMap/DropLocationOnMap");
  };
  return (
    <>
      <CustomBottomSheet
        snapPoints={[50, 200]}
        backdrop={MapViewDragable}
        index={1}
      >
          <View style={styles.mapInpCon}>
            <Text style={styles.headingText}>Set pickup location on map</Text>
            <View style={styles.addTextInpCont}>
              <View style={styles.addTextInp}>
                <TextInput
                  style={styles.addTextInpText}
                  placeholder="Choose pick up point"
                  value={address}
                  editable={isAddressEditable}
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
              onPress={savePickUpAndnavigate}
              style={[styles.actionBtnMod2]}
            >
              <FontAwesome5 name="map-pin" size={20} color="white" />
              <Text style={[styles.actBtnText]}>Pick Me From Here</Text>
            </TouchableOpacity>
          </View>
      </CustomBottomSheet>
    </>
  );
}

export default PickLocationOnMap;
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
  },
  actBtnText: {
    fontSize: hp(2),
    fontFamily: "Poppins-Medium",
    color: colors.white,
    marginLeft: "3%",
  },
  addTextInpText: {
    // paddingLeft: 10,
    textAlign: "left",
    paddingLeft: 30,
    color: colors.black,
    // textAlign: I18nManager.isRTL ? "left" : "right",
  },
  addTextInpIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
