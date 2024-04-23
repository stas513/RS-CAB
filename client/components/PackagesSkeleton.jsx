import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { colors } from "../utils/theme";

function PackagesSkeleton() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.black} />
      <ActivityIndicator size="large" color={colors.black} />
      <ActivityIndicator size="large" color={colors.black} />
    </View>
  );
}

export default PackagesSkeleton;
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
});
