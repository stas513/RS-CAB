import React from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";

const ProfileNullImage = () => {
  return (
    <View style={styles.container}>
      <SimpleLineIcons name="user" size={24} color="black" />
    </View>
  );
};
const CarNullImage = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="car-sport-outline" size={24} color="black" />
    </View>
  );
};

export { ProfileNullImage, CarNullImage };
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(211, 211, 211)",
    height: 55,
    width: 55,
    borderRadius: 50,
  },
});
