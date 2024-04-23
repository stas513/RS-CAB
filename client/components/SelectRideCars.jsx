import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import Car1 from "@assets/UserFlow/Cars/Car1.png";
import Car2 from "@assets/UserFlow/Cars/Car2.png";
import Car3 from "@assets/UserFlow/Cars/Car3.png";

function SelectRideCars() {
  const [selectedCarId, setSelectedCarId] = useState(null);
  const carTypes = [
    {
      category: "Ride Mini",
      image: Car1,
      id: 1,
    },
    {
      category: "Ride",
      image: Car2,
      id: 2,
    },
    {
      category: "Ride AC",
      image: Car3,
      id: 3,
    },
  ];
  const handleCarSelect = (id) => {
    setSelectedCarId(id);
  };

  return (
    <View style={styles.Container}>
      <Text>Select Ride</Text>
      <View style={styles.cartypesCont}>
        {carTypes.map((type, index) => (
          <TouchableOpacity key={type.id} onPress={() => handleCarSelect(type.id)}>
            <View    style={[
                styles.cartypesContchild,
                selectedCarId === type.id && { backgroundColor: colors.darkBlue }, // Apply blue background to selected car
              ]}>
              <Image source={type.image} style={styles.carTypeImage} />
              <Text style={[

                selectedCarId === type.id && {
                  color:colors.white,
                },
              ]}>{type.category}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default SelectRideCars;

const styles = StyleSheet.create({
  Container: {
    height: hp(8),
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: hp(1),
    marginVertical:hp(2)
  },
  cartypesCont: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    marginTop:"2%"
  },
  cartypesContchild: {
    height: "100%",
    width: wp(28),
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  carTypeImage: {
    height: "70%",
    width: wp(20),
    borderRadius: 10,
    resizeMode: "contain",
  },
});
