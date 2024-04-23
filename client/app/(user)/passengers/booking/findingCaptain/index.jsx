import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import MapView from "@components/MapView";
import AdressesContainer from "@components/AdressesContainer";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomModal from "@components/Modal";
import { useNavigation, useRouter } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import Car1 from "@assets/UserFlow/Cars/Car1.png";
import FixedAddressComponent from "@components/FixedAdressComponent";
import { ScrollView } from "react-native-gesture-handler";

const BarLoader = ({
  duration = 2000,
  height = 5,
  color = colors.lightGreen,
}) => {
  const animatedValue = new Animated.Value(0);

  const moveBar = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => moveBar());
  };

  useEffect(() => {
    moveBar();
  }, []);

  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.loaderContainer}>
      <Animated.View
        style={[
          styles.loaderBar,
          {
            width,
            height,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
};

function FindingCaptain() {
  const navigation = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [feedBackmodalVisible, setFeedBackModalVisible] = useState(false);
  const [selectedFeedbackIndex, setSelectedFeedbackIndex] = useState(null);

  const handleFeedbackSelection = (ind) => {
    setSelectedFeedbackIndex(ind);
  };

  const FeedBackModalSubmit = () => {
    setFeedBackModalVisible(false), setModalVisible(false);
  };

  const cancelReson = [
    {
      id: 1,
      que: "infeffcient route",
    },
    {
      id: 2,
      que: "booked by mistake",
    },
    {
      id: 3,
      que: "change a pin",
    },
    {
      id: 4,
      que: "other",
    },
  ];
  useEffect(() => {
    const navigationTimeout = setTimeout(() => {
      navigation.replace("passengers/booking/captionDetails");
    }, 5000);
    return () => clearTimeout(navigationTimeout);
  }, [navigation]);
  return (
    <>
      <CustomModal
        setVisible={setModalVisible}
        visible={modalVisible}
        position="center"
      >
        <View style={[styles.modalView, styles.generalModalView]}>
          <Ionicons
            name="ios-close-circle-outline"
            size={40}
            color={colors.red}
          />
          <Text style={{ fontSize: hp(3) }}>Cancel The Trip</Text>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: hp(2) }}>
              You can charged of 1.20 after cancelling this trip
            </Text>
          </View>
          <View style={styles.RideCancelAct}>
            <TouchableOpacity
              onPress={() => setModalVisible(!modalVisible)}
              style={[styles.cancelActBtn, styles.dont]}
            >
              <Text style={[{ color: colors.black }]}>Don't Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFeedBackModalVisible(!feedBackmodalVisible)}
              style={[styles.cancelActBtn, styles.yes]}
            >
              <Text style={[{ color: colors.white }]}>Yes Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomModal
        setVisible={setFeedBackModalVisible}
        visible={feedBackmodalVisible}
        position="bottom"
      >
        <View style={[styles.FaqmodalView, styles.generalModalView]}>
          <View
            style={{
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: hp(3), textAlign: "center" }}>
              Share the reason for cancelling the ride
            </Text>
          </View>
          <View style={styles.feedBackFaqCont}>
            {cancelReson.map((reson, ind) => (
              <TouchableOpacity
                key={ind}
                style={[
                  styles.feedBackFaq,
                  {
                    backgroundColor:
                      selectedFeedbackIndex === ind
                        ? colors.lightGreen
                        : "white",
                  },
                ]}
                onPress={() => handleFeedbackSelection(ind)}
              >
                <Text style={{ fontSize: hp(2.3), color: colors.textGrey }}>
                  {reson.que}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.RideCancelAct}>
            <TouchableOpacity
              onPress={FeedBackModalSubmit}
              style={[styles.cancelActBtn, styles.sendFeedAct]}
            >
              <Text style={[{ color: colors.white }]}>Submit Feed Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet snapPoints={[100, 570]} backdrop={MapView}>
          <View style={styles.ScreenCont}>
            <View style={styles.ScreenContChilds}>
              <Text style={{ marginTop: 5, fontWeight: "700" }}>
                Finding Your Captain
              </Text>
              <View style={styles.DriverCardProgress}>
                <BarLoader
                  duration={2000}
                  height={5}
                  color={colors.lightGreen}
                />
              </View>
              <FixedAddressComponent
                data={[
                  "82 Canterbury Road",
                  " 44 Bootham Crescent",
                  " 2 Park Place",
                ]}
              />

              <View style={styles.dateTimeMain}>
                <View style={styles.bookingDateTime}>
                  <Text style={styles.bookingDateTimeHeading}>
                    Booking Date
                  </Text>
                  <Text style={styles.bookingDateTimeText}>
                    Tue, 18 Jun 2023
                  </Text>
                </View>
                <View style={styles.bookingDateTime}>
                  <Text style={styles.bookingDateTimeHeading}>
                    Booking Time
                  </Text>
                  <Text style={styles.bookingDateTimeText}>11:00 AM</Text>
                </View>
              </View>
              <View style={styles.bookingPersonsAndBags}>
                <View style={styles.bookingPersons}>
                  <Text style={styles.bookingPersonsHeading}>Persons</Text>
                  <Text style={styles.bookingPersonsText}>1</Text>
                </View>
                <View style={styles.bookingBags}>
                  <Text style={styles.bookingBagsHeading}>Bags</Text>
                  <Text style={styles.bookingBagsText}>05</Text>
                </View>
              </View>
              <View style={styles.carDetails}>
                <View style={styles.carDetailsImg}>
                  <Image source={Car1} />
                </View>
                <View style={styles.carDetailsCat}>
                  <Text style={{ fontSize: hp(2.5) }}>Economy</Text>
                  <Text style={{ fontSize: hp(1.5) }}>0.2km</Text>
                </View>
                <View style={styles.carDetailsfare}>
                  <Text>{"\u20AC " + " 05.00"}</Text>
                  <Text style={{ fontSize: hp(1.5) }}>5.min</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.botAction}>
                <AntDesign
                  name="questioncircleo"
                  size={28}
                  color={colors.lightGreen}
                />
                <Text style={styles.botActionTex}>Need Our Help?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botAction}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Ionicons
                  name="ios-close-circle-outline"
                  size={34}
                  color={colors.red}
                />
                <Text style={styles.botActionTex}>Cancel Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
      </CustomBottomSheet>
    </>
  );
}

export default FindingCaptain;

const styles = StyleSheet.create({
  dateTime: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  dateTimeMain: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bookingDateTime: {
    justifyContent: "center",
  },
  bookingDateTimeText: {
    textAlign: "right",
  },

  bookingDateTimeHeading: {},
  ScreenCont: {
    Width: "100%",
    backgroundColor: colors.skyBlue,
    flex: 1,
  },
  ScreenContChilds: {
    marginHorizontal: wp(4),
    backgroundColor: colors.skyBlue,
  },
  DriverCardProgress: {
    justifyContent: "center",
    alignItems: "flex-end",

    width: "100%",
    height: "10%",
  },
  priceBtn: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  priceActionBtn: {
    borderRadius: 10,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  priceActionBtnAsGO: {
    backgroundColor: colors.darkBlue,
    width: wp(60),
  },
  priceActionBtnFixed: {
    backgroundColor: colors.lightGreen,
    width: wp(30),
  },
  actionBtnText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: hp(2.3),
  },
  selectedCar: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  carDetails: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",

    alignItems: "center",
    borderRadius: 10,
    paddingVertical: hp(2),
  },
  carDetailsCat: {
    width: "50%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carDetailsImg: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  carDetailsfare: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  botAction: {
    marginVertical: hp(2),
    height: hp(5),
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  botActionTex: {
    color: "gray",
    fontSize: hp(2.6),
  },
  modalView: {
    justifyContent: "space-around",
    alignItems: "center",
    width: wp(90),
    height: hp(35),
    backgroundColor: "#E5ECF9",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: wp(2),
  },
  FaqmodalView: {
    justifyContent: "space-around",
    alignItems: "center",
    width: wp(100),
    height: hp(70),
    backgroundColor: "#E5ECF9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(2),
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
  RideCancelAct: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
  },
  cancelActBtn: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    borderRadius: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  dont: {
    borderWidth: 1,
  },
  yes: {
    backgroundColor: colors.red,
  },
  feedBackFaq: {
    justifyContent: "center",
    alignItems: "center",
  },
  feedBackFaq: {
    borderWidth: 1,
    marginVertical: hp(1),
    paddingVertical: hp(2),
    width: wp(80),
    justifyContent: "center",
    alignItems: "center",
  },
  sendFeedAct: {
    backgroundColor: colors.red,
    width: wp(70),
  },

  loaderContainer: {
    height: 5,
    width: "100%",
  },
  loaderBar: {
    height: "100%",
    borderRadius: 5,
  },
  bookingPersonsAndBags: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  bookingBags: {
    justifyContent: "center",
    alignItems: "center",
  },

  bookingBagsText: {
    fontSize: hp(2),
    color: "#36454F",
  },
  bookingPersonsText: {
    fontSize: hp(2),
    color: "#36454F",
  },
});
