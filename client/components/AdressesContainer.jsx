import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { useBookingContext } from "@context/booking/useBookingContext";

import LocationAutocomplete from "./AutoCompleteLocations";

function AdressesContainer({ stopage = false }) {
  const [stopages, setStopages] = useState([]);

  const { updateBookingDetails, bookingDetails } = useBookingContext();

  const handlePickupSelect = (data) => {
    updateBookingDetails({
      ...bookingDetails,
      startAddress: data,
    });
  };

  const handleDropOffSelect = (data) => {
    updateBookingDetails({
      ...bookingDetails,
      destinationAddress: data,
    });
  };

  const PickupIcon = (
    <Ionicons
      style={styles.addTextInpIcon}
      name="ios-locate-sharp"
      size={24}
      color="#0045BF"
    />
  );
  const DropOffIcon = (
    <Ionicons
      style={styles.addTextInpIcon}
      name="location"
      size={24}
      color="#88C507"
    />
  );

  const onDeleteStopage = (id) =>
    setStopages((prev) => [...prev.filter((_) => _.id !== id)]);

  const onChangeStopage = (id, value) => {
    setStopages((prev) =>
      prev.map((stopage) =>
        stopage.id === id ? { ...stopage, value } : stopage
      )
    );
  };

  return (
    <View style={styles.Container}>
      <View style={styles.addTextInpCont}>
        <LocationAutocomplete
          placeholder="Select Pickup Point"
          onSelect={handlePickupSelect}
          renderLeftIcon={PickupIcon}
          icon={PickupIcon}
        />
        <LocationAutocomplete
          placeholder="Select DropOff Point"
          onSelect={handleDropOffSelect}
          renderLeftIcon={PickupIcon}
          icon={DropOffIcon}
        />
        {/* <GooglePlacesInput
          placeholder="Select Pickup Point"
          onSelect={handlePickupSelect}
          renderLeftIcon={PickupIcon}
        />
        <GooglePlacesInput
          placeholder="Select Drop Off "
          onSelect={handleDropOffSelect}
          renderLeftIcon={DropOffIcon}
        /> */}

        {stopages.length ? (
          <Text style={{ marginBottom: 15 }}>Stopages</Text>
        ) : null}

        {stopages.map((stopage) => (
          <View style={styles.addTextInp}>
            <TextInput
              style={styles.addTextInpText}
              placeholder="Choose stopage point"
              value={stopage.value}
              onChangeText={(text) => onChangeStopage(stopage.id, text)}
            />

            <Ionicons
              style={styles.addTextInpIcon}
              name="location"
              size={24}
              color="#88C507"
            />
            <Entypo
              style={styles.stopageRemoveIcon}
              name="circle-with-minus"
              size={24}
              color="red"
              onPress={() => onDeleteStopage(stopage.id)}
            />
          </View>
        ))}
        {stopage ? (
          <View style={styles.stopageBtnContainer}>
            <TouchableOpacity
              onPress={() =>
                setStopages((prev) => [
                  ...prev,
                  { id: Math.random(), value: "" },
                ])
              }
              style={[styles.stopageBtn, styles.actionBtn]}
            >
              <FontAwesome5 name="plus" size={18} color="white" />
              <Text style={[styles.actBtnText, styles.stopageBtnText]}>
                Stopage
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    </View>
  );
}

export default AdressesContainer;
const styles = StyleSheet.create({
  Container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-start",
    // backgroundColor:"black"
  },
  addTextInpCont: {
    width: "100%",
  },
  addTextInp: {
    width: "100%",
    backgroundColor: colors.white,
    position: "relative",
    borderRadius: 10,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1.3),
    marginVertical: hp(1),
  },
  addTextInpText: {
    paddingLeft: 30,
  },
  addTextInpIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  stopageRemoveIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  stopageBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stopageBtn: {
    backgroundColor: colors.lightGreen,
  },
  actionBtn: {
    width: wp(28),
    borderRadius: 30,
    paddingVertical: hp(1.5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stopageBtnText: {
    color: "white",
  },
  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    fontWeight: "bold",
  },
});
