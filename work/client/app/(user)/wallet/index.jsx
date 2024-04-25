import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import MainLayout from "@layout/MainLayout";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";

const Wallet = () => {
  const earings = [
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Online Pay",
      topic: "Topup",
      price: "09.50",
      transfer: "09.50",
      balance: "09.50",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Paid Via Wallet",
      topic: "Topup",
      price: "09.50",
      transfer: "09.50",
      balance: "09.50",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Apple Pay",
      topic: "Earning",
      price: "09.50",
      transfer: "09.50",
      balance: "09.50",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Apple Pay",
      topic: "Earning",
      price: "09.50",
      transfer: "09.50",
      balance: "09.50",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Google Pay",
      topic: "Commision",
      price: "09.50",
      transfer: "*20.00",
      balance: "20.00",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Google Pay",
      topic: "Commision",
      price: "09.50",
      transfer: "*20.00",
      balance: "20.00",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Google Pay",
      topic: "Commision",
      price: "09.50",
      transfer: "*20.00",
      balance: "20.00",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Google Pay",
      topic: "Commision",
      price: "09.50",
      transfer: "*20.00",
      balance: "20.00",
    },
    {
      dateTime: "Mon Jun 18 At 11.54",
      wayOfPayment: "Google Pay",
      topic: "Commision",
      price: "09.50",
      transfer: "*20.00",
      balance: "20.00",
    },
  ];
  return (
      <View style={styles.walletMainContainer}>
        <View style={styles.walletContainer}>
          <Text style={styles.walletText}>Wallet</Text>
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Balance</Text>
            <Text style={styles.balanceAmount}>$ 250.00</Text>
          </View>
        </View>
        <View style={styles.walletOptionsContainer}>
          <TouchableOpacity style={styles.referralsBtn}>
            <Text style={styles.referralsText}>Referrals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topupBtn}>
            <Text style={styles.topupText}>Topup</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.earningListContainer}>
          <View style={styles.earningListHeaderContainer}>
            <Text style={styles.earningListHeading}>Topic</Text>
            <Text style={styles.earningListHeading}>Price</Text>
            <Text style={styles.earningListHeading}>Transfer</Text>
            <Text style={styles.earningListHeading}>Balance</Text>
          </View>
          <View style={{maxHeight:hp(43)}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {earings?.map((earing, index) => {
              return (
                <View key={index} style={styles.earningsList}>
                  <View style={styles.earningListHeader}>
                    <Text style={styles.earningListHeaderText}>
                      {earing?.dateTime}
                    </Text>
                    <Text style={styles.earningListHeaderText}>
                      {earing?.wayOfPayment}
                    </Text>
                  </View>
                  <View style={styles.earningDetails}>
                    <Text style={styles.earningDetailsText}>
                      {earing?.topic}
                    </Text>
                    <Text style={styles.earningDetailsText}>
                      {earing?.price}
                    </Text>
                    <Text style={styles.earningDetailsText}>
                      {earing?.transfer}
                    </Text>
                    <Text style={styles.earningDetailsText}>
                      {earing?.balance}
                    </Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
        </View>
      </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  walletMainContainer: {
    height: hp(75),
    width: wp(100),
    marginTop: hp(13),
  },
  walletContainer: {
    height: hp(15),
    backgroundColor: colors.white,
    paddingVertical: hp(1.5),
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  walletText: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: colors.darkBlue,
  },
  balanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp(90),
  },
  balanceText: {
    fontSize: hp(3),
    fontWeight: "600",
  },
  balanceAmount: {
    fontSize: hp(3),
    fontWeight: "600",
  },
  walletOptionsContainer: {
    height: hp(7.5),
    width: wp(100),
    backgroundColor: colors.lightGreen,
    marginTop: hp(1.7),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4.7),
  },
  referralsBtn: {
    width: wp(26),
    height: hp(4.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.darkBlue,
    borderRadius: wp(50),
  },
  referralsText: {
    fontSize: hp(1.3),
    color: colors.white,
    fontWeight:"700",
  },
  topupBtn: {
    width: wp(21.5),
    height: hp(4.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.red,
    borderRadius: wp(50),
  },
  topupText: {
    fontSize: hp(1.3),
    color: colors.white,
    fontWeight:"700",
  },
  earningListContainer: {
    marginTop: hp(4),
  },
  earningListHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4.7),
    marginBottom: hp(1.5),
  },
  earningListHeading: {
    color: colors.darkBlue,
    fontWeight: "500",
    textAlign:"left",
    width:wp(25)
  },
  earningsList: {
    marginBottom: hp(3.3),
  },
  earningListHeader: {
    paddingHorizontal: wp(4.7),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  earningListHeaderText: {
    fontSize: hp(1.25),
    color: colors?.textGrey,
  },
  earningDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: wp(4.7),
    backgroundColor: colors?.white,
    marginTop: hp(0.5),
    width: wp(100),
    height: hp(3.4),
  },
  earningDetailsText: {
    fontSize: hp(1.5),
    color: colors?.textGrey,
    textAlign:"left",
    width:wp(25)
  },
});
