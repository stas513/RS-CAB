import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { colors } from "../utils/theme";

export const CustomButton = ({
  text,
  onPress,
  backgroundColor = colors.darkBlue,
  color = colors.white,
  width = "48%",
  borderRadius = 10,
  style
}) => {
  const buttonStyle = {
    backgroundColor,
    width,
    borderRadius,
    ...styles.buttonStyle,
  };

  return (
    <TouchableOpacity style={{...buttonStyle,...style}} onPress={onPress}>
      <Text style={{ color }}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    paddingVertical: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
});
