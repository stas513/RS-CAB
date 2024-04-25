import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import MainLayout from "@layout/MainLayout";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";

const Profile = () => {
  return (
    <MainLayout>
      <View style={styles.profileMainContainer}>
        <View style={styles.profileHeadingContainer}>
          <Text style={styles.profileText}>Profile</Text>
        </View>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePicture}
            source={require("@assets/profile-picture/profile.png")}
          />
          <TouchableOpacity>
            <Text style={styles.profilePictureChangeText}>
              Profile Picture Change
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.profileDetailContainer}>
          <View style={styles.profileDetail}>
            <Text style={styles.detailTile}>Name</Text>
            <Text style={styles.detailTile}>Email</Text>
            <Text style={styles.detailTile}>Password</Text>
            <Text style={styles.detailTile}>Phone No</Text>
            <Text style={styles.detailTile}>Tel No</Text>
            <Text style={styles.detailTile}>Location</Text>
            <Text style={styles.detailTile}>City</Text>
            <Text style={styles.detailTile}>Vehicles</Text>
          </View>
          <View style={styles.profileDetail}>
            <Text style={styles.detailInfo}>Sam Jerry Sans</Text>
            <Text style={styles.detailInfo}>Samlorum@lorumispum</Text>
            <Text style={styles.detailInfo}>**********</Text>
            <Text style={styles.detailInfo}>000 000 000</Text>
            <Text style={styles.detailInfo}>000 000 000</Text>
            <Text style={styles.detailInfo}>Lorem ipsum</Text>
            <Text style={styles.detailInfo}>Uk.London</Text>
            <Text style={styles.detailInfo}>Basic Level</Text>
          </View>
        </View>
      </View>
    </MainLayout>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileMainContainer: {
    width: wp(100),
  },
  profileHeadingContainer: {
    alignItems: "center",
    marginTop: hp(1.7),
  },
  profileText: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: colors.darkBlue,
  },
  profileContainer: {
    width: wp(100),
    alignItems: "center",
  },
  profilePicture: {
    width: wp(26.552),
    height: hp(13.476),
    marginTop: hp(3.58),
  },
  profilePictureChangeText: {
    fontSize: hp(2),
    marginTop: hp(2.55),
  },
  profileDetailContainer: {
    width: wp(100),
    paddingHorizontal: wp(5),
    marginTop: hp(5.4),
    gap: hp(4),
    flexDirection: "row",
  },
  profileDetail: {
    alignContent: "space-between",
    gap: hp(2.8),
  },
  detailTile: {
    color: colors?.darkBlue,
    fontWeight: "500",
  },
  detailInfo: {},
});
