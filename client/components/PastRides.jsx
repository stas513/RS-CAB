import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Text, View, TouchableOpacity, Image } from "react-native";
import MapView from "./MapView";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import { Link, useRouter } from "expo-router";
import { fetchImageFromBackend } from "@utils/appApis";

const PastRideCard = ({ booking }) => {
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    if (booking.driverInfo.profileImage) {
      setLoading(true);
      const data = await fetchImageFromBackend(booking.driverInfo.profileImage);
      setImage(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        router.push(`passengers/booking/rideDetail/${booking?.id}`);
      }}
      key={booking?.id}
      style={styles.pastRideContainer}
    >
      <View style={{ height: hp(13.7) }}>
        <MapView height={hp(13.7)} />
      </View>
      <View style={styles.PastRideDetCon}>
        <View style={styles.riderImage}>
          <Image
            source={{
              uri: image,
            }}
          />
        </View>
        <View style={styles.pastRideBottom}>
          <View style={styles.pastbotSecChild1}>
            <Text>{booking.dateAndTime}</Text>
            <Text style={[styles.textGray]}>
              {booking?.driverInfo?.car?.model +
                "       " +
                booking?.driverInfo?.car?.numberPlate}
            </Text>
          </View>
          <View style={styles.pastbotSecChil}>
            <View style={styles.pastbotSecChil1}>
              <Text style={{ marginRight: 10 }}>${booking.totalBill} </Text>
              <Text style={styles.textGray}>{(booking.totalDistance* 1.609344).toFixed(2)} KM </Text>
            </View>
            <View style={styles.pastbotSecChil2}>
              <Link
                href={""}
                style={{ color: colors.darkBlue, marginRight: 10 }}
              >
                Service
              </Link>
              <Link href={""}>{booking?.cartInfo?.packageInfo?.name}</Link>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

function PastRides({ filteredBookings }) {
  return (
    <View style={styles.mainContainer}>
      {filteredBookings.map((booking) => (
        <PastRideCard booking={booking} />
      ))}
    </View>
  );
}

export default PastRides;
const styles = StyleSheet.create({
  mainContainer: {},
  pastRideContainer: {
    marginHorizontal: wp(1),
    marginVertical: hp(1),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    backgroundColor: colors.skyBlue,
  },
  PastRideDetCon: {
    height: hp(13),
    backgroundColor: colors.skyBlue,
    position: "relative",
  },
  riderImage: {
    position: "absolute",
    bottom: 80,
    right: 8,
  },
  pastRideBottom: {
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: wp(2),
    height: "100%",
  },
  pastbotSecChil: {
    borderTopWidth: 1,
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
  },
  pastbotSecChil1: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  pastbotSecChil2: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  pastbotSecChild1: {
    justifyContent: "space-around",
    height: "50%",
  },
  textGray: {
    color: colors.textGrey,
  },
});
