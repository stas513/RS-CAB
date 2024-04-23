// SplashScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Splash01 from "../splash/Splash01";
import Splash02 from "../splash/Splash02";
import Splash03 from "../splash/Splash03";

const SplashStep = ({ screen: ScreenComponent }) => (
  <View style={styles.slide}>
    <ScreenComponent />
  </View>
);

const SplashScreen = () => {
  const steps = [Splash01, Splash02, Splash03];

  return (
    <Swiper loop={false}>
      {steps.map((screen, index) => (
        <SplashStep key={index} screen={screen} />
      ))}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SplashScreen;
