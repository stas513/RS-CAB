import {
  ActivityIndicator,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { hp, wp } from "@utils";
import { useRouter } from "expo-router";
import { useUserContext } from "@context/userContext/useUserContext";
import { useBookingContext } from "@context/booking/useBookingContext";
import * as Location from "expo-location";
import CustomModal from "@components/Modal";
import { CustomButton } from "@components/CustomButton";
import { colors } from "@utils/theme";
import getCurrentLocation from "@utils/currentLocation";

const CurrentLocation = () => {
  const navigation = useRouter();
  const { updateUserCurLocDetails } = useUserContext();
  const { updateBookingCurLocDetails } = useBookingContext();
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setOpenModal(true);
        return;
      }
      let location = await getCurrentLocation();
      if (location) {
        updateUserCurLocDetails({
          cordinates: location,
        });
        updateBookingCurLocDetails({
          cordinates: location,
        });
        setLoading(false);
        setOpenModal(false);
        navigation.push("passengers/home");
        return;
      }
      setLoading(false);
      setOpenModal(true);
    } catch (error) {
      setOpenModal(false);
      console.log(`Error requesting location permission:`, error);
      Alert.alert(`Error requesting location permission: ${error.message}`);
    }
  };

  return (
    <>
      <CustomModal visible={openModal} setVisible={setOpenModal}>
        <View style={[styles.SecondModalView, styles.generalModalView]}>
          <Text style={{ fontSize: hp(3) }}>
            for processed further we need to access your current location
          </Text>
          <CustomButton
            text="Fetch Location"
            onPress={getLocation}
            style={{
              textTransform: "capitalize",
              backgroundColor: colors.lightGreen,
              color: colors.white,
            }}
          />
        </View>
      </CustomModal>

      <ImageBackground
        style={styles.image}
        source={require("@assets/images/currentLocationImage/currentLocation.png")}
      >
        <SafeAreaView style={styles.mainContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.trackRide}>Hi, nice to meet you!</Text>
            <Text style={styles.text}>
              consectetur adipiscing elit, sed do eiusmod tempor incididunt
            </Text>
          </View>
          <View style={styles.currentLocationBtnContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#378D00" />
            ) : (
              <TouchableOpacity
                onPress={getLocation}
                style={styles.currentLocationBtn}
              >
                <Text style={styles.arrowIcon}>
                  <Ionicons name="md-rocket" size={16} color="#378D00" />
                </Text>
                <Text style={styles.getStartedText}>Start Application</Text>
              </TouchableOpacity>
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

export default CurrentLocation;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    marginVertical: hp(20),
  },
  textContainer: {
    marginTop: hp(42),
    alignItems: "center",
    width: "70%",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
  },
  trackRide: {
    fontWeight: "500",
    fontSize: 24,
    color: "#0045BF",
  },
  currentLocationBtnContainer: {
    alignItems: "center",
    marginTop: hp(4),
  },
  currentLocationBtn: {
    paddingHorizontal: hp(1.5),
    width: wp(57.2),
    height: hp(5),
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  getStartedText: {
    fontSize: 14,
    fontWeight: "500",
  },
  arrowIcon: {
    fontSize: 10,
    marginRight: wp(2),
  },
  SecondModalView: {
    height: hp(40),
    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(2),
    justifyContent: "space-around",
    alignItems: "center",
  },
  generalModalView: {
    marginTop: wp(5),
    zIndex: 1000,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
