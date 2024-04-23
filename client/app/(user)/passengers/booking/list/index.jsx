import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import PastRides from "@components/PastRides";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { useUserContext } from "@context/userContext/useUserContext";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("PENDING");
  const { user } = useUserContext();
  const { socketInstance } = useSocketContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const data = {
      id: user?.passenger?.id,
      status: activeTab,
    };
    setLoading(true);
    socketInstance.once("fetch-passenger-bookings-success", (response) => {
      console.log(response)
      setBookings(response);
      setLoading(false);
    });
    socketInstance.once("fetch-passenger-bookings-error", (error) => {
      setLoading(false);
      Alert.alert(error.message);
    });
    socketInstance.emit("fetch-passenger-bookings", data);
  }, [activeTab]);

  const tabs = [
    {
      id: 1,
      tabTitle: "PENDING",
      isTabActive: true,
    },
    {
      id: 2,
      tabTitle: "COMPLETED",
      isTabActive: false,
    },
    {
      id: 3,
      tabTitle: "CANCELLED",
      isTabActive: false,
    },
  ];

  return (
    <>
      <View style={styles.bookingMainContainer}>
        <View style={styles.bookingHeadingContainer}>
          <Text style={styles.bookingText}>Booking</Text>
        </View>
        <View style={styles.tabContainer}>
          {tabs?.map((tab, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => setActiveTab(tab?.tabTitle)}
              >
                <Text
                  style={{
                    fontSize: hp(1.9),
                    color:
                      tab?.tabTitle == activeTab
                        ? colors.darkBlue
                        : colors.textGrey,
                    fontWeight: tab?.tabTitle == activeTab ? 600 : 500,
                  }}
                >
                  {tab?.tabTitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.bookingContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: wp(5), marginBottom: hp(5) }}
          >
            {loading ? (
              <View
                style={{
                  marginTop: hp(5),
                  justifyContent: "center",
                  flexDirection: "row",
                }}
              >
                <ActivityIndicator color={"black"} size={50} />
              </View>
            ) : (
              <PastRides filteredBookings={bookings} listType={"passenger"} />
            )}
          </ScrollView>
        </View>
      </View>
    </>
  );
};

export default BookingList;

const styles = StyleSheet.create({
  bookingMainContainer: {
    width: wp(100),
    paddingTop: hp(8),
    backgroundColor: colors.skyBlue,
  },
  bookingHeadingContainer: {
    alignItems: "center",
    marginTop: hp(1.7),
  },
  bookingText: {
    fontSize: hp(3.5),
    fontWeight: "600",
    color: colors.darkBlue,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    alignItems: "center",
    marginTop: hp(3.5),
    marginBottom: hp(3.5),
  },
  bookingContainer: {
    height: hp(80),
  },
  booking: {
    backgroundColor: colors?.white,
    height: hp(10),
    marginBottom: hp(1.8),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: hp(1.3),
    paddingHorizontal: wp(5),
  },
  bookingContentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(3.6),
  },
  riderAvatar: {
    width: wp(14),
    height: hp(7),
  },
  riderNameText: {
    fontSize: hp(1.8),
    color: colors?.textDarkGrey,
    fontWeight: "500",
  },
  bookingTagsContainer: {
    flexDirection: "row",
    gap: hp(0.4),
    marginTop: hp(1),
  },
  bookingTag: {
    padding: hp(0.5),
    paddingHorizontal: hp(1),
    backgroundColor: colors?.lightGreen,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: wp(1),
  },
  bookingTagText: {
    fontSize: hp(1.1),
    color: colors?.white,
  },
  bookingAmountText: {
    fontSize: hp(1.8),
    color: colors?.textDarkGrey,
    fontWeight: "500",
  },
});
