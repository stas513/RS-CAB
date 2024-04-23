import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { colors } from "@utils/theme";
import { useUserContext } from "@context/userContext/useUserContext";

function HomeScreensTopMenu() {
  const {user} = useUserContext()
  return (
    <View style={styles.Container}>
      <Text style={styles.greetingsText}>
        Hey! Good Day
        <Text style={{ color: colors.black, fontWeight: "bold" }}> {user?.name}</Text>
      </Text>
    </View>
  );
}

export default HomeScreensTopMenu;

const styles = StyleSheet.create({
  Container: {
    paddingVertical: 5,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  greetingsText: {
    marginBottom: 8,
  },
});
