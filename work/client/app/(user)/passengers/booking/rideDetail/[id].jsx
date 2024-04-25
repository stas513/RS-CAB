import { ImageBackground, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import CustomBottomSheet from "@components/BottomSheet";
import MapView from "@components/MapView";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { fetchBookingDetailById, fetchRequestDetailById } from "@utils/appApis";
import { ProfileNullImage } from "@components/ProfileNullImage";
import { ScrollView } from "react-native-gesture-handler";
import { fetchImageFromBackend } from "@utils/appApis";

const rideDetail = () => {
  const { id } = useLocalSearchParams();
  const [booking, setBooking] = useState({});
  const [request, setRequest] = useState({});
  const [driverImage, setDriverImage] = useState("");

  const fetchData = async () => {
    try {
      const bookingData = await fetchBookingDetailById(id);
      const requestData = await fetchRequestDetailById(bookingData.cartId);

      setBooking(bookingData);
      setRequest(requestData);
      fetchImages();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchImages = async () => {
    const imageResponse = booking?.driverInfo?.profileImage
      ? await fetchImageFromBackend(booking?.driverInfo?.profileImage)
      : null;
    setDriverImage(imageResponse);
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <CustomBottomSheet snapPoints={[100, 500]} backdrop={MapView} index={1}>
      <ImageBackground
        style={styles.container}
        source={require("@assets/background/user-detail-background.png")}
      >
        <View style={styles.mainContainer}>
          <View style={styles.driverDetail}>
            <View style={styles.driverInfoConatiner}>
              <View>
                {driverImage ? (
                  <Image
                    style={styles.driverImage}
                    source={{ uri: driverImage }}
                    alt="Driver Image"
                  />
                ) : (
                  <ProfileNullImage />
                )}
                <Image source={driverImage} />
              </View>
              <View style={styles.driverInfo}>
                <Text style={styles.driverName}>
                  {booking?.driverInfo?.userInfo?.name}
                </Text>
                <View style={styles.driverTags}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Apple Pay</Text>
                  </View>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>Discount</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.driverRideDetail}>
              <Text style={styles.driverPrice}>$ {booking?.totalBill}</Text>
              <Text style={styles.driverDistance}>
                {(booking?.totalDistance* 1.609344).toFixed(2)} KM
              </Text>
              <Text style={styles.driverCarInfo}>
                {booking?.driverInfo?.car?.make}
              </Text>
            </View>
          </View>
          <View style={styles.locations}>
            <View>
              <View style={styles.locationHead}>
                <View>
                  <Text style={styles.locationType}>Pick up</Text>
                </View>
              </View>
              <Text style={styles.locationTitle}>
                {request?.startFrom?.name}
              </Text>
            </View>
            <View>
              <View style={styles.location}>
                <View style={styles.locationHead}>
                  <Text style={styles.locationType}>Drop Off</Text>
                </View>
                <View style={styles.locationTitleContainer}>
                  <Text style={styles.locationTitle}>
                    {request?.destination?.name}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.detailContainer}>
            <Text style={styles.noteHeading}>Noted</Text>
            <Text style={styles.noteParagraph}>
              The Printing And TypeSetting Industry. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Sint perferendis est, accusamus
              illum corporis explicabo exercitationem veritatis provident error
              fuga?
            </Text>
            <Text style={styles.fareHeading}>Trip Fare</Text>
            <Text style={styles.fareParagraph}>Online Pay</Text>
            <Text style={styles.fareParagraph}>Discount</Text>
            <Text style={styles.fareParagraph}>Paid Amount</Text>
          </View>
        </View>
      </ImageBackground>
    </CustomBottomSheet>
  );
};

export default rideDetail;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  mainContainer: {
    marginTop: "3%",
    paddingHorizontal: "4%",
  },
  driverDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  driverInfoConatiner: {
    flexDirection: "row",
  },

  driverImage: {
    height: hp(7),
    width: wp(14),
    borderRadius: 50,
  },
  driverInfo: {
    padding: wp(1),
  },
  driverName: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Medium",
  },
  driverTags: {
    flexDirection: "row",
    marginTop: hp(0.5),
  },
  tag: {
    paddingHorizontal: wp(1),
    paddingVertical: hp(0.3),
    backgroundColor: colors.lightGreen,
    marginLeft: wp(1),
    borderRadius: 3,
  },

  tagText: {
    fontSize: wp(2),
    color: colors.white,
    fontFamily: "Poppins-Medium",
  },

  driverRideDetail: {
    flexDirection: "column",
    justifyContent: "flex-end",
  },

  driverPrice: {
    textAlign: "right",
    fontSize: wp(3.5),
    lineHeight: hp(2),
    fontFamily: "Poppins-Bold",
  },

  driverDistance: {
    textAlign: "right",
    fontSize: wp(2.5),
    fontWeight: "500",
    lineHeight: hp(2),
    fontFamily: "Poppins-Medium",
  },

  driverCarInfo: {
    textAlign: "right",
    fontSize: wp(3),
    lineHeight: hp(2),
    fontFamily: "Poppins-Bold",
  },

  locations: {
    marginTop: hp(1),
  },

  locationHead: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: hp(3),
  },

  locationType: {
    fontSize: wp(3),
    fontFamily: "Poppins-Medium",
    color: colors.textGray,
  },

  locationTitle: {
    borderBottomColor: colors.textGray,
    borderBottomWidth: 1,
    fontSize: wp(3),
    paddingBottom: hp(0.5),
    paddingTop: hp(0.5),
    fontFamily: "Poppins-Medium",
  },
  detailContainer: {
    marginTop: hp(5),
  },
  noteHeading: {
    fontSize: wp(3),

    fontFamily: "Poppins-Medium",
    color: colors.textGray,
  },
  noteParagraph: {
    fontSize: wp(3),

    lineHeight: hp(3),
    fontFamily: "Poppins-Medium",
  },
  fareHeading: {
    marginTop: hp(3),
    fontSize: wp(3),
    fontFamily: "Poppins-Medium",
    color: colors.textGray,
  },
  fareParagraph: {
    fontSize: wp(3),
    fontFamily: "Poppins-Medium",
    lineHeight: hp(3),
  },
  contactBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(5),
  },
  contactBtn: {
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    borderRadius: 5,
    backgroundColor: colors.darkBlue,
    paddingVertical: hp(1),
    width: wp(30),
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
    color: colors.white,
  },
});
