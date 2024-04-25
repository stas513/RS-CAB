import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { hp, wp } from "@utils/index";
import { Ionicons } from "@expo/vector-icons";

function LoadingButton({ onPress, isLoading, children }) {
  return (
    <View style={styles.loadingBtnContainer}>
      <TouchableOpacity onPress={onPress} style={styles.loadingBtn} disabled={isLoading}>
        {isLoading && (
        <ActivityIndicator size="small" color="#000" /> )}
        <View style={{flexDirection:'row',alignItems: 'center'}}>

        <Text style={styles.loadingText}>{children}</Text>
        <Text>
          <Ionicons name="md-arrow-forward" size={15} color="#1F1F1F" />
        </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default LoadingButton;

const styles = StyleSheet.create({
  loadingBtnContainer: {
    marginTop: hp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  loadingBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap:10,
    backgroundColor: "#378D00",
    width: "100%",
    height: hp(6),
    borderRadius: 50,
  },
  loadingText: {
    marginRight: 3,
    fontSize: hp(2.4),
  },
  arrowIcon: {
    color: "#1F1F1F",
  },
});
