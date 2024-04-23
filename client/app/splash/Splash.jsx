import {
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import React from "react";

const Splash = () => {
  return (
    <View style={styles.bgImageContainer}>
      <ImageBackground
        source={require("@assets/background/splash.png")}
        style={styles.bgImage}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  bgImageContainer: {
    width: "100%",
    height: "100%",
  },
  bgImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  }
});
