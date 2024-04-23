import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Alert,
} from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { Ionicons } from "@expo/vector-icons";
import MapView from "@components/MapView";
import CustomBottomSheet from "@components/BottomSheet";
import { useRouter } from "expo-router";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { useDriverContext } from "@context/driver/useDriverContext";
import { CustomButtonLoader } from "../../../../../components/CustomButtonLoader";
import { ScrollView } from "react-native-gesture-handler";

const CompleteRide = () => {
  const router = useRouter();
  const { socketInstance } = useSocketContext();
  const { ride, booking, dispatch } = useDriverContext();
  const [loading, setLoading] = useState(false);

  const onRideComplete = () => {
    setLoading(true);
    const data = {
      id: booking?.id,
    };

    socketInstance.on("ride-complete-error", (response) => {
      setLoading(false);
      Alert.alert(response?.message);
    });

    socketInstance.on("ride-complete-success", (response) => {
      setLoading(false);
      Alert.alert(response?.message);
      dispatch({
        type: "SET_BOOKING",
        payload: {
          booking: response?.data?.booking,
        },
      });
    });

    socketInstance.emit("ride-complete", data);

    router.push("/drivers/booking/cashCollected");
  };

  return (
    <>
      <CustomBottomSheet snapPoints={[20, 200]} backdrop={MapView} index={1}>
        <View style={styles.detailContainer}>
          <View style={styles.info}>
            <Text style={styles.infoHeading}>1 min away</Text>
            <Text style={styles.infoParagraph}>
              Dropping Off {ride?.clientName}
            </Text>
          </View>

          <View style={styles.actionContainer}>
            <CustomButtonLoader
              text="Complete Ride"
              backgroundColor="red"
              width={wp(70)}
              borderRadius={50}
              isLoading={loading}
              onPress={onRideComplete}
            />
          </View>
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default CompleteRide;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "3%",
  },
  passengerImage: {
    height: hp(9),
    width: wp(18),
    borderRadius: 50,
  },
  queCon: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "4%",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    marginHorizontal: 5,
  },
  actionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: wp(5),
  },
  CloseBtn: {
    backgroundColor: colors.white,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    paddingHorizontal: hp(5),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightGreen,
    borderWidth: 1,
  },
  RateBtn: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: hp(5),
    marginLeft: wp(3),
  },
  RateBtnText: {
    color: colors.white,
    fontSize: wp(3),
  },
  CloseBtnText: {
    color: colors.lightGreen,
    fontSize: wp(3),
  },
  detailContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "100%",
  },
  onlineBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(-3),
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
  onlineBtnIcon: {
    marginTop: hp(0.2),
  },

  actionBtn: {
    backgroundColor: "red",
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
  info: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "3%",
  },
  infoHeading: {
    fontSize: wp(5),
    fontFamily: "Poppins-Bold",
  },
  infoParagraph: {
    fontSize: wp(4),
    fontFamily: "Poppins-Medium",
    color: colors.textGray,
  },
  modalRatingView: {
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: wp(2),
    justifyContent: "center",
    zIndex: 1000,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    width: wp(96),
  },
  ModalactionContainer: {
    marginVertical: "4%",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  rideCommint: {
    marginVertical: "2%",
    borderRadius: 20,
    width: "80%",
  },
  commitTextInput: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingLeft: 30,
    textAlign: "auto",
    width: "100%",
    borderWidth: 1,
    borderColor: colors.textGray,
    borderRadius: 20,
    paddingLeft: "6%",
    paddingTop: "6%",
  },
});
