import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { hp, wp } from "@utils";

const Splash02 = () => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@assets/images/splashScreenImages/splash02.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.confirmRide}>Confirm Your Driver</Text>
        <Text style={styles.text}>
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash02;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 69, 191, 0.1)",
    alignItems: "center",
  },
  imageContainer: {
    marginTop: hp(19),
    alignItems: "center",
  },
  image: {
    width: wp(60),
    height: hp(30),
  },
  textContainer: {
    alignItems: "center",
    width: "70%",
    marginTop: hp(8),
  },
  text: {
    // marginTop: hp(2),
    fontSize:18,
    textAlign: "center",
    },
  confirmRide:{
    fontWeight: "500",
    fontSize: 24,
    color:"#0045BF"
  }
});
