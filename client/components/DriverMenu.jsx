import React, { useState } from "react";
import {
  Feather,
  FontAwesome,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleSheet, View, TouchableOpacity, Text, Image } from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { Link, useNavigation } from "expo-router";

const DriverMenu = () => {
  const navigation = useNavigation();
  const DrawerContent = () => {
    const menus = [
      {
        id: 1,
        title: <Text style={styles.menuTitle}>Home</Text>,
        icon: <Feather name="home" size={22} color={colors.darkBlue} />,
        route: "/driverOnline",
      },
      {
        id: 2,
        title: <Text style={styles.menuTitle}>Booking History</Text>,
        icon: <Entypo name="back-in-time" size={22} color={colors.darkBlue} />,
        route: "/booking/list/BookingList",
      },
      {
        id: 3,
        title: <Text style={styles.menuTitle}>Vehicle Documents</Text>,
        icon: (
          <MaterialCommunityIcons
            name="file-document"
            size={22}
            color={colors.darkBlue}
          />
        ),
        route: "/drivers/documents",
      },
      {
        id: 4,
        title: <Text style={styles.menuTitle}>Wallet</Text>,
        icon: (
          <MaterialCommunityIcons
            name="wallet"
            size={22}
            color={colors.darkBlue}
          />
        ),
        route: "/wallet/Wallet",
      },
      {
        id: 5,
        title: <Text style={styles.menuTitle}>How It Works</Text>,
        icon: (
          <AntDesign name="questioncircleo" size={22} color={colors.darkBlue} />
        ),
        route: "",
      },
      {
        id: 6,
        title: <Text style={styles.menuTitle}>Contact Us</Text>,
        icon: <FontAwesome name="phone" size={22} color={colors.darkBlue} />,
        route: "contantUs/ContactUs",
      },
    ];
    return (
      <View style={styles.drawerMainContainer}>
        <View style={styles.drawerContainer}>
          <View style={styles.drawerProfileContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={require("@assets/profile-picture/profile.png")}
                alt="Profile Image"
                style={styles.profileImage}
              ></Image>
              <Link href={"profile/Profile"}>
                <Text style={styles.editText}>Edit</Text>
              </Link>
            </View>
            <View style={styles.profileDetailsContainer}>
              <View style={styles.nameAndSettingContainer}>
                <Text style={styles.userNameText}>Sam Jerry Sans</Text>
                <Link href={""}>
                  <TouchableOpacity style={styles.settingContainer}>
                    <Ionicons
                      name="settings"
                      size={20}
                      color={colors.skyBlue}
                    />
                  </TouchableOpacity>
                </Link>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.levelText}>Basic Level</Text>
                <View style={styles.ratingContainer}>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <FontAwesome
                      key={index}
                      name="star"
                      size={15}
                      color="orange"
                    />
                  ))}
                </View>
                <Text style={styles.ratingText}>Rating 5.0</Text>
              </View>
            </View>
          </View>
          <View style={styles.drawerMenuMainContainer}>
            {menus?.map((menu) => {
              return (
                <View key={menu?.id}>
                  <Link style={styles.menuItemContainer} href={menu?.route}>
                    <View style={styles.icon}>{menu?.icon}</View>
                    <View>{menu?.title}</View>
                  </Link>
                </View>
              );
            })}
            <TouchableOpacity
              style={styles.logoutBtn}
              onPress={() => navigation.navigate("auth/signUp/SignUp")}
            >
              <MaterialIcons
                name="logout"
                size={22}
                color={colors.white}
                style={{ transform: [{ scaleX: -1 }] }}
              />
              <Text style={styles.logoutBtnText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  return (
    <View style={styles.menu}>
      <View style={styles.menuBtnConatiner}>
        {!isDrawerOpen ? (
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.lightGreen }]}
            onPress={toggleDrawer}
          >
            <Ionicons name="menu-sharp" size={wp(6)} color="white" />
          </TouchableOpacity>
        ) : null}
        {isDrawerOpen && <DrawerContent />}
        {!isDrawerOpen ? (
          <TouchableOpacity
            style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
          >
            <Ionicons
              name="md-notifications-sharp"
              size={wp(6)}
              color="white"
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default DriverMenu;

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: hp(8),
    left: 0,
    height: hp(10),
    width: wp(100),
    zIndex: 1,
    paddingHorizontal: wp(4),
  },
  menuBtnConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  menuItem: {
    paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    borderRadius: 50,
    backgroundColor: colors.lightGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  drawerMainContainer: {
    width: wp(100),
    height: hp(100),
    backgroundColor: "transparent",
    position: "relative",
  },
  drawerContainer: {
    width: wp(90),
    height: hp(100),
    backgroundColor: colors.white,
    position: "absolute",
    bottom: 0,
    right: 50,
  },
  drawerProfileContainer: {
    height: hp(20),
    width: wp(90),
    backgroundColor: colors.skyBlue,
    flexDirection: "row",
    position: "relative",
  },
  profileContainer: {
    width: wp(26.2),
    height: hp(14.4),
    position: "absolute",
    left: wp(3.8),
    top: hp(2.8),
    bottom: hp(2.8),
    alignItems: "center",
    gap: hp(1.2),
    paddingVertical: hp(1),
  },
  profileDetailsContainer: {
    paddingVertical: hp(2),
    width: wp(56.2),
    height: hp(14.4),
    position: "absolute",
    right: wp(3.8),
    top: hp(2.8),
    bottom: hp(2.8),
  },
  nameAndSettingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: wp(2),
  },
  userNameText: {
    fontSize: hp(2.1),
  },
  profileImage: {
    borderRadius: 50,
    width: wp(20),
    height: hp(10),
  },
  editText: {
    fontSize: hp(1.7),
  },
  settingContainer: {
    width: wp(7),
    height: hp(3.5),
    backgroundColor: colors.darkBlue,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  detailsContainer: {
    paddingHorizontal: hp(1),
    gap: hp(0.3),
  },
  levelText: {
    fontSize: hp(1.8),
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: wp(1.5),
  },
  ratingText: {
    fontSize: hp(1.3),
  },
  drawerMenuMainContainer: {
    gap: hp(6),
    paddingVertical: hp(3.9),
    paddingHorizontal: wp(4),
  },
  icon: {
    paddingRight: wp(3.82),
  },
  menuTitle: {
    fontSize: hp(2),
    fontWeight: "500",
  },
  logoutBtnContainer: {
    width: wp(90),
  },
  logoutBtn: {
    width: wp(55),
    height: hp(5),
    flexDirection: "row",
    gap: wp(1),
    backgroundColor: colors.darkBlue,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutBtnText: {
    color: colors.white,
    fontSize: hp(2.2),
  },
});
