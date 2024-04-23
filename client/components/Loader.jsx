import React from "react";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const CustomLoader = ({ isLoading, textContent }) => {
  return (
    <View style={styles.container}>
      <Spinner
        visible={isLoading}
        textContent={textContent}
        textStyle={{ color: "#FFF" }}
        animation="slide"
        size={"small"}
        customIndicatorStyle={styles.spinner}
      />
    </View>
  );
};

export default CustomLoader;
