import React, { useState, useContext } from "react";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import {
  View,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Text,
} from "react-native";
import { UserContext } from "../context/userContext";
import { useBookingContext } from "@context/booking/useBookingContext";

function PersonAndBags() {
  const [numberOfPersons, setNumberOfPersons] = useState(1);
  const [numberOfBags, setNumberOfBags] = useState(0);
  const { bookingDetails, updateBookingDetails } = useBookingContext();

  const handleAddPersons = () => {
    if (numberOfPersons < 4) {
      setNumberOfPersons(numberOfPersons + 1);
      updateBookingDetails({
        ...bookingDetails,
        numberOfPersons: numberOfPersons + 1,
      });
    }
  };

  const handleSubtractPersons = () => {
    if (numberOfPersons > 1) {
      setNumberOfPersons(numberOfPersons - 1);
      updateBookingDetails({
        ...bookingDetails,
        numberOfPersons: numberOfPersons - 1,
      });
    }
  };

  const handleAddBags = () => {
    setNumberOfBags(numberOfBags + 1);
    updateBookingDetails({
      ...bookingDetails,
      numberOfBags: numberOfBags + 1,
    });
  };

  const handleSubtractBags = () => {
    if (numberOfBags > 0) {
      setNumberOfBags(numberOfBags - 1);
      updateBookingDetails({
        ...bookingDetails,
        numberOfBags: numberOfBags - 1,
      });
    }
  };
  return (
    <View style={styles.Main}>
      <View style={styles.qtnMain}>
        <Text>No Of Person</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
            onPress={handleAddPersons}
          >
            <Ionicons name="add" size={15} color="white" />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.infoAmount]}
            keyboardType="number-pad"
            value={numberOfPersons.toString()}
            onChangeText={(text) => {
              const numericValue = parseFloat(text);
              if (!isNaN(numericValue)) {
                setNumberOfPersons(numericValue);
              }
            }}
          />
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
            onPress={handleSubtractPersons}
          >
            <AntDesign name="minus" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.qtnMain}>
        <Text>No of bags</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
            onPress={handleAddBags}
          >
            <Ionicons name="add" size={15} color="white" />
          </TouchableOpacity>
          <TextInput
            style={[styles.input, styles.infoAmount]}
            keyboardType="number-pad"
            value={numberOfBags.toString()}
            onChangeText={(text) => {
              const numericValue = parseFloat(text);
              if (!isNaN(numericValue)) {
                setNumberOfBags(numericValue);
              }
            }}
          />
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
            onPress={handleSubtractBags}
          >
            <AntDesign name="minus" size={15} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PersonAndBags;

const styles = StyleSheet.create({
  Main: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  qtnMain: {
    width: "38%",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: "3%",
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    paddingVertical: "5%",
    borderRadius: 10,
  },
  menuItem: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 50,
    backgroundColor: colors.lightGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
