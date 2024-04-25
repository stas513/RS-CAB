import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Pressable,
  Alert,

} from "react-native";
import { useRouter } from "expo-router";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { FontAwesome5, AntDesign, Ionicons } from "@expo/vector-icons";
import MapView from "@components/MapView";
import PassengerImage from "@assets/passengerdumy.png";
import CustomBottomSheet from "@components/BottomSheet";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { useDriverContext } from "@context/driver/useDriverContext";
import { CustomButtonLoader } from "../../../../../components/CustomButtonLoader";
import { ProfileNullImage } from "../../../../../components/ProfileNullImage";
import { fetchImageFromBackend } from "@utils/appApis";
import { ScrollView } from "react-native-gesture-handler";

const RideStart = () => {
  const router = useRouter();
  const { socketInstance } = useSocketContext();
  const { ride, booking, dispatch } = useDriverContext();
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
  const onRideStart = () => {
    setLoading(true);
    const data = {
      id: booking?.id,
    };

    socketInstance.on("ride-start-error", (response) => {
      setLoading(false);
      Alert.alert(response?.message);
    });

    socketInstance.on("ride-start-success", (response) => {
      setLoading(false);
      Alert.alert(response?.message);

      dispatch({
        type: "SET_BOOKING",
        payload: {
          booking: response?.data?.booking,
        },
      });
    });

    socketInstance.emit("ride-start", data);

    router.push("/drivers/booking/completeRide");
  };

  return (
    <>
      <CustomBottomSheet snapPoints={[100, 300]} backdrop={MapView} index={1}>
        <View style={styles.detailContainer}>
          <View style={styles.onlineBtnContainer}>
            <TouchableOpacity style={styles.onlineBtn}>
              <Text style={styles.onlineBtnText}>05.00</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.info}>
            <View style={styles.contactContainer}>
              <Pressable style={styles.contactBtn}>
                <FontAwesome5
                  name="phone-alt"
                  size={wp(6)}
                  color={colors.lightGreen}
                />
                <Text style={styles.contactBtnText}>Call </Text>
              </Pressable>
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
                  <Text style={styles.passengerName}>{ride?.clientName}</Text>
                  <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={wp(4)} color="gold" />
                    <Text style={styles.ratingText}>
                      {ride?.passengerInfo?.ratings}
                    </Text>
                  </View>
                </View>
              </View>
              <Pressable style={styles.contactBtn}>
                <AntDesign
                  name="message1"
                  size={wp(6)}
                  color={colors.lightGreen}
                />
                <Text style={styles.contactBtnText}>Message</Text>
              </Pressable>
            </View>
            <View style={styles.actionContainer}>
              <CustomButtonLoader
                text="Start the Ride"
                backgroundColor={colors.lightGreen}
                width="68%"
                borderRadius={50}
                isLoading={loading} // Pass the loading state as isLoading
                onPress={onRideStart}
              />

              {/* <Pressable onPress={onRideStart} style={styles.actionBtn}>
                <View style={styles.actionBtnIcon}>
                  <Ionicons
                    name="arrow-forward"
                    size={24}
                    color={colors.lightGreen}
                  />
                </View>
                <Text style={styles.actionBtnText}>Start the Ride</Text>
              </Pressable> */}
            </View>
          </View>
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default RideStart;

const styles = StyleSheet.create({
  onlineBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(1),
  },
  onlineBtn: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: wp(13),
    paddingVertical: hp(1),
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  onlineBtnText: {
    fontSize: wp(4),
    color: colors.white,
    fontFamily: "Poppins-Medium",
  },

  contactContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: wp(10),
  },
  contactBtn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    width: wp(20),
  },

  contactBtnText: {
    fontSize: wp(3),
    fontFamily: "Poppins-Medium",
    color: "black",
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
  actionContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  actionBtn: {
    backgroundColor: colors.lightGreen,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    width: wp(70),
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  actionBtnIcon: {
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.5),
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  actionBtnText: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Bold",
    textAlign: "center",
    width: wp(50),
    color: colors.white,
  },
});
