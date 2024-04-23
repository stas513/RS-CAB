import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "@utils";
import { useRouter } from "expo-router";

const Splash03 = () => {
  const navigation = useRouter();
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("@assets/images/splashScreenImages/splash03.png")}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.trackRide}> Track Your Ride</Text>
        <Text style={styles.text}>consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et</Text>
      </View>
      <View style={styles.getStartedBtnContainer}>
        <TouchableOpacity
          onPress={() => navigation.push("/passengers/booking/currentLocation")}
          style={styles.getStartedBtn}
        >
          <Text style={styles.getStartedText}>GET STARTED</Text>
          <Text style={styles.arrowIcon}>
            <Ionicons name="ios-arrow-forward" size={15} color="#378D00" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Splash03;

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
    width: wp(100),
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
    textAlign: "center"
  },
  trackRide: {
    fontWeight: "500",
    fontSize: 24,
    color: "#0045BF",
  },
  getStartedBtnContainer: {
    marginTop: hp(4),
  },
  getStartedBtn: {
    paddingHorizontal: hp(1.5),
    width: wp(48),
    height: hp(5),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 50,
    flexDirection: "row",
  },
  getStartedText: {
    fontSize: 14,
    fontWeight: "500",
  },
  arrowIcon: {
    fontSize: 10,
  },
});
