import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  ActivityIndicator,
} from "react-native";
import { colors } from "../utils/theme";

export const CustomButtonLoader = ({
  text,
  onPress,
  backgroundColor = colors.darkBlue,
  color = colors.white,
  width = "48%",
  borderRadius = 10,
  isLoading = false,
  style,
}) => {
  const buttonStyle = {
    backgroundColor,
    width,
    borderRadius,
    ...styles.buttonStyle,
  };

  return (
    <TouchableOpacity style={{ ...buttonStyle, ...style }} disabled={isLoading} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator color={color} />
      ) : (
        <Text style={{ color }}>{text}</Text>
      )}
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
