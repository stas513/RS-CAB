import { StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { useNavigation } from "expo-router";
import { Text } from "react-native";

const MainLayout = ({ children, headerText }) => {
  const navigation = useNavigation();
  return (
    <>
      <View style={styles.mainContainer}>
        {/* <View style={styles.header}>
          <View style={styles.backNavigationBtn}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Entypo name="arrow-bold-left" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
          {headerText ? (
            <Text style={styles.headerText}>{headerText}</Text>
          ) : null}
          <View style={styles.notificationBtn}>
            <TouchableOpacity>
              <Ionicons name="notifications" size={20} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View> */}
        {children}
      </View>
    </>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(5),
    paddingVertical: hp(8),
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backNavigationBtn: {
    backgroundColor: colors.lightGreen,
    width: wp(10),
    height: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBtn: {
    backgroundColor: colors.darkBlue,
    width: wp(10),
    height: wp(10),
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: colors.darkBlue,
  },
});
