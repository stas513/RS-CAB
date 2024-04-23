import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from "react-native";
import { hp, wp } from "@utils/index";
import { color, colors } from "@utils/theme";
import { Feather, FontAwesome } from "@expo/vector-icons";

import Driver3 from "@assets/UserFlow/Drivers/Driver3.png";
import Car1 from "@assets/UserFlow/Cars/Car1.png";
import { Ionicons } from "@expo/vector-icons";

function UpcommingBookings() {
  return (
    <View style={styles.Container}>
      <TouchableOpacity style={styles.topBtn}>
        <Feather name="clock" size={24} color={colors.white} />
        <Text style={{marginLeft:wp(1),color:colors.white}}>Ride In 15 Min</Text>
      </TouchableOpacity>
      <View style={styles.ConChild2}>
        <View style={styles.sumDriverDet}>
          <View style={styles.DriverCardImgDiv}>
            <View style={styles.sumDriverimgDiv}>
              <Image source={Driver3} style={styles.DriverImg} />
            </View>
            <View style={styles.detModdriverRating}>
              <Text>
                <FontAwesome name={"star"} size={14} color={"gold"} />
                4.4
              </Text>
            </View>
          </View>
          <View style={styles.SumCarDet1}>
            <Text style={styles.driverNameText}>Sam Jerry Sans</Text>
          </View>
        </View>
        <Text >Today 4:10-4:20 Pm</Text>
        <Text style={{color:colors.textGrey,marginVertical:hp(1)}}>Economy</Text>
        <View style={styles.Container}>
          <View style={styles.addTextInpCont}>
            <View style={styles.addTextInp}>
              <TextInput
                style={styles.addTextInpText}
                placeholder="Chose pick up point"
              />
              <Ionicons
                style={styles.addTextInpIcon}
                name="ios-locate-sharp"
                size={24}
                color="#0045BF"
              />
            </View>
            <View style={styles.addTextInp}>
              <TextInput
                style={styles.addTextInpText}
                placeholder="Chose pick up point"
              />
              <Ionicons
                style={styles.addTextInpIcon}
                name="location"
                size={24}
                color="#88C507"
              />
            </View>
          </View>
        </View>
        <View style={styles.carDetails}>
          <View style={styles.carDetailsImg}>
            <Image source={Car1} />
          </View>
          <View style={styles.carDetailsCat}>
            <Text style={{ fontSize: hp(2.5) }}>Economy</Text>
            <Text style={{ fontSize: hp(1.5) }}>0.2km</Text>
          </View>
          <View style={styles.carDetailsfare}>
            <Text>{"\u20AC " + " 05.00"}</Text>
            <Text style={{ fontSize: hp(1.5) }}>5.min</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default UpcommingBookings;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: colors.white,
  },
  ConChild2: {
    paddingHorizontal: wp(4),
  },
  topBtn: {
    backgroundColor: colors.lightGreen,
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    paddingVertical: hp(1),
  },
  sumDriverDet: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(2),
  },
  DriverImg: {
    height: hp(8),
    width: hp(8),
  },
  detModdriverRating: {
    // position: "relative",
    bottom: 12,
    right: 0,
    zIndex: 3,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 10,
  },
  carDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    borderRadius: 10,
    paddingVertical: hp(2),
    // marginVertical: hp(1),
  },
  carDetailsCat: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carDetailsImg: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carDetailsfare: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    // paddingRight: wp(3),
    // backgroundColor:"black"
  },
  // Container: {
  //   marginVertical: hp(1),
  //   height: hp(18),
  //   width: "100%",
  //   justifyContent: "space-around",
  //   alignItems: "flex-start",
  // },
  addTextInpCont: {
    width: "100%",
    height: hp(16),
    justifyContent: "space-around",
    alignItems: "center",
  },
  addTextInp: {
    width: "100%",
    backgroundColor: "#F0F0F0",
    position: "relative",
    borderRadius: 10,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1.3),
  },
  addTextInpText: {
    paddingLeft: 30,
  },
  addTextInpIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
});
