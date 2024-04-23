import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Pressable, Image, Alert } from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import MapView from "@components/MapView";
import { useRouter } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import { ScrollView } from "react-native-gesture-handler";

import {
  Ionicons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { useDriverContext } from "@context/driver/useDriverContext";
import { CustomButtonLoader } from "../../../../../components/CustomButtonLoader";
import { ProfileNullImage } from "../../../../../components/ProfileNullImage";

const ArrivedAtPickup = () => {
  const router = useRouter();
  const { socketInstance } = useSocketContext();
  const { ride, booking } = useDriverContext();
  const [loading, setLoading] = useState(false);
  const [userProfileImage, setUserProfileImage] = useState(null);

  const fetchImages = async () => {
    if (booking?.passengerInfo?.profileImage) {
      setLoading(true);
      const data = await fetchImageFromBackend(
        booking?.passengerInfo?.profileImage
      );
      setUserProfileImage(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const onArrivedPickup = () => {
    setLoading(true);
    socketInstance.emit("arrived-at-pickup", { requestId: ride.id });

    socketInstance.on("arrived-at-pickup-error", (data) => {
      setLoading(false);
      Alert.alert(data.message);
    });

    socketInstance.on("arrived-at-pickup-success", (data) => {
      setLoading(false);
      Alert.alert(data.message);
      router.push("/drivers/booking/rideStart");
    });

  };

  return (
    <>
      <CustomBottomSheet snapPoints={[150, 550]} backdrop={MapView} index={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.detailContainer}>
            <View style={styles.passengerInfoConatiner}>
              <View style={styles.passengerImageConatiner}>
                {booking?.passengerInfo?.profileImage ? (
                  <Image
                    source={{uri:userProfileImage}}
                    style={styles.passengerImage}
                  />
                ) : (
                  <ProfileNullImage />
                )}
              </View>
              <View style={styles.passengerInfo}>
                <Text style={styles.passengerName}>
                  {booking?.passengerInfo?.userInfo.name}
                </Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={wp(4)} color="gold" />
                  <Text style={styles.ratingText}>
                    {booking?.passengerInfo?.ratings}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.contactBtnContainer}>
              <Pressable style={styles.contactBtn}>
                <FontAwesome5 name="phone-alt" size={wp(7)} color="black" />
                <Text style={styles.contactBtnText}>Call </Text>
              </Pressable>
              <Pressable style={styles.contactBtn}>
                <AntDesign name="message1" size={wp(7)} color="black" />
                <Text style={styles.contactBtnText}>Message</Text>
              </Pressable>
            </View>
            <View style={styles.arrivedBtnContainer}>
              <CustomButtonLoader
                text="Arrived At Pickup Point"
                backgroundColor={colors.darkBlue}
                width="68%"
                borderRadius={50}
                isLoading={loading} // Pass the loading state as isLoading
                onPress={onArrivedPickup}
              />
            </View>
            <View style={styles.locations}>
              <Text style={styles.locationHeading}>Ride Details</Text>
              <View style={styles.pickuplocation}>
                <View style={styles.locationHead}>
                  <View>
                    <Text style={styles.locationType}>Pick up</Text>
                  </View>
                </View>
                <Text style={styles.locationTitle}>
                  {ride?.startFrom?.name}
                </Text>
              </View>
              <View>
                <View style={styles.dropofflocation}>
                  <View style={styles.locationHead}>
                    <Text style={styles.locationType}>Drop Off</Text>
                  </View>
                  <View style={styles.locationTitleContainer}>
                    <Text style={styles.locationTitle}>
                      {ride?.destination?.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.actionBtnContainer}>
              <Pressable
                style={styles.stopBtn}
                onPress={() => {
                  router.push("/drivers/driverOnline");
                }}
              >
                <Text style={styles.stopBtnText}>Stop New Ride Request</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </CustomBottomSheet>
    </>
  );
};

export default ArrivedAtPickup;

const styles = StyleSheet.create({
  detailContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    marginTop: hp(-1),
    paddingVertical: hp(5),
  },
  passengerInfoConatiner: {
    flexDirection: "row",
    marginLeft: wp(3),
  },

  passengerImage: {
    height: hp(7),
    width: wp(14),
    borderRadius: 50,
  },
  passengerInfo: {
    padding: wp(1),
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: wp(1),
  },
  passengerName: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Medium",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  ratingText: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Medium",
    marginLeft: wp(1),
  },
  contactBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(3),
    marginVertical: wp(10),
  },
  contactBtn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    borderRadius: 5,
    backgroundColor: "#f0f2f0",
    paddingVertical: hp(0.8),
    width: "43%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  contactBtnText: {
    fontSize: wp(4),
    fontFamily: "Poppins-Medium",
    color: "black",
  },
  arrivedBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  arrivedBtn: {
    backgroundColor: colors.darkBlue,
    borderRadius: 25,
    paddingHorizontal: wp(10),
    paddingVertical: hp(1.5),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  arrivedBtnText: {
    color: colors.white,
    fontFamily: "Poppins-Medium",
  },
  locations: {
    marginTop: hp(3),
  },
  locationHeading: {
    fontFamily: "Poppins-Medium",
    textTransform: "capitalize",
    fontSize: wp(4),
    marginLeft: wp(4),
  },
  pickuplocation: {
    paddingHorizontal: wp(4),
    backgroundColor: "#f0f2f0",
  },

  dropofflocation: {
    paddingHorizontal: wp(4),
  },
  locationHead: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: hp(1.5),
  },

  locationType: {
    fontSize: wp(3),
    fontFamily: "Poppins-Medium",
    color: colors.textGray,
  },

  locationTitle: {
    borderBottomColor: colors.textGray,
    fontSize: wp(3),
    paddingBottom: hp(0.5),
    paddingTop: hp(0.5),
    fontFamily: "Poppins-Medium",
  },

  actionBtnContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: hp(6),
    gap: 30,
  },
  stopBtn: {
    backgroundColor: colors.darkGreen,
    borderRadius: 20,
    width: "60%",
    paddingVertical: "3%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  stopBtnText: {
    color: colors.white,
    fontSize: wp(4),
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: "red",
    borderStyle: "solid",
    borderRadius: 20,
    width: wp(60),
    paddingVertical: hp(1),
  },
  cancelBtnText: {
    color: "red",
    fontSize: wp(3.5),
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
});
