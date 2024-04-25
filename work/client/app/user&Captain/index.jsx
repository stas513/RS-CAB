import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { hp, wp } from "@utils";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useUserContext } from "../../context/userContext/useUserContext";

const UserOrCaptain = () => {
  const navigation = useRouter();
  const { setMode } = useUserContext();

  const onSelectMode = (mode) => {
    setMode(mode);
    navigation.push("/auth/signIn");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("@assets/logo/logo.png")} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.paraText}>consectetur adipiscing elit, sed do</Text>
        <Text style={styles.paraText}>eiusmod tempor incididunt ut</Text>
        <Text style={styles.paraText}>labore et</Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          onPress={() => onSelectMode("driver")}
          style={styles.captainBtn}
        >
          <Text style={[styles.genBtnText, styles.captainBtnText]}>
            As a captain
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectMode("user")}
          style={styles.userBtn}
        >
          <Text style={[styles.genBtnText, styles.userBtnText]}>As a user</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserOrCaptain;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 69, 191, 0.1)",
    alignItems: "center",
  },
  logoContainer: {
    marginTop: hp(20),
    alignItems: "center",
  },
  logo: {
    width: wp(60),
    height: hp(30),
  },
  textContainer: {
    alignItems: "center",
    width: "70%",
    marginTop: hp(8.27),
  },
  btnContainer: {
    marginTop: hp(3.13),
  },
  captainBtn: {
    paddingHorizontal: wp(27),
    height: hp(7),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },

  genBtnText: {
    fontSize: hp(2.5),
  },
  userBtn: {
    marginTop: hp(1.1),
    paddingHorizontal: wp(27),
    height: hp(7),
    backgroundColor: "#88C507",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  userBtnText: {
    color: "#FFFFFF",
  },
  paraText: {
    fontSize: hp(2.3),
  },
});
