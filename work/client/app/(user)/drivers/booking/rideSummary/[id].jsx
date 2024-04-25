import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import MapView from "@components/MapView";
import GetHelpCoolaps from "@components/GetHelpCollaps";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import CustomBottomSheet from "@components/BottomSheet";
import { ErrorBoundary, useLocalSearchParams } from "expo-router";
import {
  fetchBookingDetailById,
  fetchRequestDetailById,
} from "../../../../../utils/appApis";
import { useState } from "react";


const RideSummary = () => {
  const { id } = useLocalSearchParams();
  const [booking, setBooking] = useState({});
  const [request, setRequest] = useState({});

  const fetchData = async () => {
    try {
      const bookingData = await fetchBookingDetailById(id);
      const requestData = await fetchRequestDetailById(bookingData.cartId);

      setBooking(bookingData);
      setRequest(requestData);
    } catch (err) {
      console.log(ErrorBoundary);
    }
  };

  useEffect(() => {
    if (id) {
    fetchData();
    }
  }, [id]);

  return (
    <View style={styles.container}>
      <CustomBottomSheet snapPoints={[100, 600]} backdrop={MapView} index={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <View style={styles.TopSummery}>
              <View>
                <Text
                  style={{ textAlign: "center", color: colors.textDarkGrey }}
                >
                  Earning
                </Text>
                <Text style={{ textAlign: "center" }}>{booking?.totalBill}$</Text>
              </View>
              <View>
                <Text style={styles.textCenterGray}>Total Distance</Text>
                <Text style={styles.textCenterBlack}>{(booking?.totalDistance* 1.609344).toFixed(2)}KM</Text>
              </View>
              <View>
                <Text
                  style={{ textAlign: "center", color: colors.textDarkGrey }}
                >
                  Ride Time
                </Text>
                <Text style={{ textAlign: "center" }}>15min 50s</Text>
              </View>
            </View>
            <View style={styles.Address}>
              <View>
                <Text style={{ textAlign: "left", color: colors.textDarkGrey }}>
                  Pick Up
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    borderBottomWidth: 1,
                    borderBottomColor: colors.textDarkGrey,
                  }}
                >
                  {request?.startFrom?.name}
                </Text>
              </View>
              <View>
                <Text style={{ textAlign: "left", color: colors.textDarkGrey,marginTop:50 }}>
                  Drop Off
                </Text>
                <Text
                  style={{
                    textAlign: "left",
                    borderBottomWidth: 1,
                    borderBottomColor: colors.textDarkGrey,
                  }}
                >
                 {request?.destination?.name}

                </Text>
              </View>
            </View>
            <View style={styles.EarningBreakDown}>
              <View>
                <Text>Earning Break Down</Text>
              </View>
                <View style={styles.Base}>
                <Text>Totals</Text>
                <Text>${booking?.totalBill}</Text>
              </View>
            </View>
          </View>
          <View style={styles.MainConGetHelp}>
            <View style={styles.GetHelp}>
              <Text style={styles.GetHelpText}>Get Help</Text>
              <View style={styles.getHelpQa}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <GetHelpCoolaps />
                </ScrollView>
              </View>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity style={styles.chatBtn}>
                <Ionicons name="call" size={24} color="black" />
                <Text style={styles.ChatBtnText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatBtn}>
                <Ionicons name="chatbox" size={24} color="black" />
                <Text style={styles.ChatBtnText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </CustomBottomSheet>
    </View>
  );
};

export default RideSummary;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: "100%",
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    height: hp(70),
    marginHorizontal: wp(5),
  },
  TopSummery: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    height: hp(8),
  },
  Address: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    flexDirection: "column",
    height: hp(17),
  },
  EarningBreakDown: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  MainConGetHelp: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
    backgroundColor: "#EBEAEF",
  },
  GetHelp: {
    marginHorizontal: wp(5),
    marginVertical: "4%",
  },

  Base: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",

    // backgroundColor:"black",
  },
  textCenterGray: {
    textAlign: "center",
    color: colors.textDarkGrey,
  },
  textCenterBlack: {
    textAlign: "center",
    color: colors.black,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  queCon: {
    // marginTop: hp(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  CloseBtn: {
    backgroundColor: "white",
    borderRadius: wp(50),
    borderColor: colors.lightGreen,
    borderWidth: 1,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  RateBtn: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(50),
    // paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },

  passengerImage: {
    height: hp(9),
    width: wp(18),
    borderRadius: 50,
  },

  actionContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: wp(5),
    width: "100%",
    marginVertical: "4%",
  },
  CloseBtn: {
    backgroundColor: colors.white,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    paddingHorizontal: hp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  chatBtn: {
    borderRadius: wp(50),
    paddingVertical: hp(2),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: hp(5),
    marginLeft: wp(3),
    borderColor: colors.black,
    borderWidth: 1,
  },
  ChatBtnText: {
    color: colors.black,
    fontSize: wp(4),
    marginHorizontal: wp(2),
    fontWeight: "bold",
  },
  GetHelpText: {
    color: colors.black,
    fontSize: wp(9),
    fontWeight: "bold",
  },
  CloseBtnText: {
    color: colors.lightGreen,
    fontSize: wp(3),
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    marginHorizontal: 5,
  },
  getHelpQa: {
    marginTop: hp(3),
    justifyContent: "flex-start",
    height: hp(40),
    gap: hp(4),
  },
});
