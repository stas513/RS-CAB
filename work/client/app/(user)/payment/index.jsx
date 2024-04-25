import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import Master from "@assets/UserFlow/Payments/Master.png";
import Cash from "@assets/UserFlow/Payments/Cash.png";
import Visa from "@assets/UserFlow/Payments/Visa.png";

import { FontAwesome5, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";

function Payment() {
  const navigation = useRouter();
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "paypal":
        return <FontAwesome5 name="paypal" size={30} color="black" />;
      case "credit-card":
        return <Feather name="credit-card" size={30} color="black" />;
      case "cc-apple-pay":
        return <FontAwesome5 name="cc-apple-pay" size={30} color="black" />;
      case "google-pay":
        return <FontAwesome5 name="google-pay" size={30} color="black" />;
      default:
    }
  };

  const paymentMethods = [
    {
      methodImg: Cash,
      method: "Cash",
      id: 1,
    },
    {
      methodImg: Master,
      method: "**** 1234",
      id: 2,
    },
    {
      methodImg: Visa,
      method: "**** 5689",
      id: 3,
    },
  ];
  const OtherpaymentMethods = [
    {
      icon: "paypal",
      method: "Paypal",
      id: 1,
    },
    {
      icon: "credit-card",
      method: "Credit/ Debit Card",
      id: 2,
    },
    {
      icon: "cc-apple-pay",
      method: "Apple Pay",
      id: 3,
    },
    {
      icon: "google-pay",
      method: "Google Pay",
      id: 4,
    },
  ];

  return (
    <View style={styles.Container}>
      <Text style={{ fontSize: hp(4), marginTop: hp(5) }}>Payments</Text>
      <Text style={{ fontSize: hp(2) }}>Saved Payment Methods</Text>
      {paymentMethods.map((options, ind) => (
        <TouchableOpacity
          onPress={() => navigation.push("passengers/booking/findingCaptain")}
          style={styles.OtherOptions}
          key={ind}
        >
          <View style={styles.optImagdiv}>
            <Image source={options.methodImg} style={styles.optionImg} />
          </View>
          <View>
            <Text style={styles.saveMethodText}>{options.method}</Text>
          </View>
        </TouchableOpacity>
      ))}
      <Text style={styles.OtherOptHead}>Add a new payments method</Text>
      {OtherpaymentMethods.map((options, ind) => (
        <TouchableOpacity style={styles.OtherOptions} key={ind}>
          <View style={styles.optImagdiv}>{renderIcon(options.icon)}</View>
          <View>
            <Text style={styles.otherMethodText}>{options.method}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export default Payment;

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    width: wp(100),
    backgroundColor: colors.skyBlue,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: wp(3),
  },
  OtherOptions: {
    flexDirection: "row",
    marginVertical: hp(1),
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  optImagdiv: {
    width: "20%",
  },
  optionImg: {
    height: 50,
    width: 50,
    resizeMode: "contain",
  },
  OtherOptHead: {
    marginVertical: hp(2),
    fontSize: hp(3),
  },
  otherMethodText: {
    color: colors.textGrey,
  },
  saveMethodText: {
    fontSize: hp(2.5),
  },
});
