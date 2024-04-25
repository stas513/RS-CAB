import React from "react";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import { FontAwesome5, MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function HomeScreenActions() {
  const navigation = useRouter();

  return (
    <View style={styles.actionContainer}>
      <TouchableOpacity style={[styles.HomeBtn, styles.actionBtn]}>
        <FontAwesome5 name="home" size={18} color="white" />
        <Text style={[styles.actBtnText, styles.HomeBtnText]}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.actionBtn, styles.workbtn]}>
        <MaterialIcons name="work" size={18} color="black" />
        <Text style={[styles.actBtnText, styles.workBtnText]}>Work</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.rightBtn}
        onPress={() =>
          navigation.push(
            "/passengers/booking/searchLocationMap/SetLocationOnMap"
          )
        }
      >
        <AntDesign name="arrowright" size={18} color="#88C507" />
      </TouchableOpacity>
    </View>
  );
}

export default HomeScreenActions;

const styles = StyleSheet.create({
  actionContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginVertical: hp(3),
    width: "80%",
  },
  HomeBtn: {
    backgroundColor: colors.darkBlue,
  },
  workbtn: {
    borderWidth: 1,
  },
  actionBtn: {
    width: wp(28),
    borderRadius: 30,
    paddingVertical: hp(1.5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rightBtn: {
    width: wp(12),
    height: wp(12),
    borderRadius: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  workBtnText: {
    color: colors.textGrey,
  },
  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    fontWeight: "bold",
  },
  HomeBtnText: {
    color: colors.white,
  },
});
