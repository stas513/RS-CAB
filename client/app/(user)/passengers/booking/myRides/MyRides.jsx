import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";

import PastRides from "@components/PastRides";
import UpcommingBookings from "@components/UpcommingBookings";
import MainLayout from "@layout/MainLayout";
const MyRiders = () => {
  const [activeTab, setActiveTab] = useState("Past");

  const tabs = [
    {
      id: 1,
      tabTitle: "Past",
      isTabActive: true,
    },
    {
      id: 2,
      tabTitle: "Upcoming",
      isTabActive: false,
    },
  ];

  const showBookings = (tab) => {
    if (tab === "Past") {
      setActiveTab("Past");
    } else {
      setActiveTab("Upcoming");
    }
  };
  useEffect(() => {
    showBookings("Active");
  }, []);
  return (
    <MainLayout headerText="My Rides">
      <View style={styles.bookingMainContainer}>
        <View style={styles.tabContainer}>
          {tabs?.map((tab, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => showBookings(tab?.tabTitle)}
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
        <View style={styles.Rides}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {activeTab === "Past" && <PastRides />}
            {activeTab === "Upcoming" && <UpcommingBookings />}
          </ScrollView>
        </View>
      </View>
    </MainLayout>
  );
};

export default MyRiders;

const styles = StyleSheet.create({
  bookingMainContainer: {
    width: wp(100),
    height: hp(100),
    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(2),
  },
  bookingHeadingContainer: {
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    alignItems: "center",
    marginTop: hp(1.5),
    marginBottom: hp(1.5),
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  bookingContainer: {
    height: hp(57),
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
