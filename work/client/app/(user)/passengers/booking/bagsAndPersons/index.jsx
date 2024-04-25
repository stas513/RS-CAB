import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import MapView from "@components/MapView";
import CustomModal from "@components/Modal";
import { useRouter } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import FixedAddressComponent from "@components/FixedAdressComponent";
import { CustomButton } from "@components/CustomButton";
import CarouselComponent from "@components/CarCarousel";
import { useBookingContext } from "@context/booking/useBookingContext";
import { usePassengerContext } from "@context/passenger/usePassengerContext";
import { FetchFare } from "../../../../../utils/appApis/index";
import { CustomButtonLoader } from "../../../../../components/CustomButtonLoader";
import { useUserContext } from "@context/userContext/useUserContext";

const rideModes = {
  fixed: "FIXED",
  adjustable: "ADJUSTABLE",
};

function AddBagsAndPersons() {
  const navigation = useRouter();
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [rideMode, setRideMode] = useState(rideModes.fixed);
  const [openModal, setOpenModal] = useState(false);
  const [budget, setBudget] = useState(0);
  const { createBooking, isLoading,isRideCancelling,cancelRide } = usePassengerContext();
  const { user } = useUserContext();
  const { bookingDetails, rideDistanceDetails } = useBookingContext();
  const { distance, time } = rideDistanceDetails;
  const [sugFare, setSugFare] = useState(0);
  const pickUpDescription =
    bookingDetails && bookingDetails.startAddress
      ? bookingDetails.startAddress.name
      : "";
  const dropOffDescription =
    bookingDetails && bookingDetails.destinationAddress
      ? bookingDetails.destinationAddress.name
      : "";

  const { numberOfBags, numberOfPersons, bookingTime, bookingDate } = bookingDetails;

  const onSubmit = () => {
    const data = {
      ...bookingDetails,
      requestType: rideMode,
      budget: sugFare,
      totalBill: sugFare,
      userId: user.id,
      passengerId: user?.passenger?.id,
      clientName: user?.name || "Dumy Name",
      clientEmail: user?.email,
      clientPhone: user?.phoneNumber,
      packageId: selectedCarId,
      totalDistance: distance,
    };
    delete data.numberOfBags;
    delete data.numberOfPersons;

    try {
      if (rideMode === rideModes.fixed) {
        createBooking(data, rideModes);
      } else {
        setOpenModal(!openModal);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onBidBookingSubmit = async (amount) => {
    setOpenModal(false);
    setBudget(0);
    const data = {
      ...bookingDetails,
      requestType: rideMode,
      budget: amount,
      totalBill: amount,
      userId: user.id,
      passengerId: user?.passenger?.id,
      clientName: user?.name || "Dumy Name",
      clientEmail: user?.email,
      clientPhone: user?.phoneNumber,
      packageId: selectedCarId,
      totalDistance: distance,
    };
    delete data.numberOfBags;
    delete data.numberOfPersons;

    try {
      await createBooking(data, rideModes);
      navigation.push("/passengers/booking/availableDrivers");
    } catch (err) {
      // (err);
    }
  };

  const FareSuggestion = async () => {
    if (selectedCarId && distance && time) {
      try {
        const fareData = {
          packageId: selectedCarId,
          distance: parseFloat(distance),
          time: parseFloat(time),
        };

        const fareResult = await FetchFare(fareData);
        const price = fareResult.price;
        setSugFare(price);
      } catch (error) {
        console.error("Error fetching fare:", error);
      }
    }
  };

  const handleCarSelect = (carId) => {
    setSelectedCarId(carId);
  };

  useEffect(() => {
    FareSuggestion();
  }, [selectedCarId]);

  function formatDateToDayMonthYear(dateString) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }
  return (
    <>
      <CustomModal
        visible={openModal}
        setVisible={setOpenModal}
        position="bottom"
      >
        <View style={[styles.SecondModalView, styles.generalModalView]}>
          <Text style={{ fontSize: hp(3) }}>Offer You Fare For The Trip</Text>
          <Text>specify a reasonable fare</Text>
          <TextInput
            keyboardType="number-pad"
            placeholder="0.00"
            style={styles.textInputBookNow}
            value={budget}
            onChangeText={setBudget}
          />
          <TouchableOpacity
            onPress={() => {
              onBidBookingSubmit(sugFare);
            }}
            style={[styles.Asgo, styles.actionBtn]}
          >
            <Text style={[styles.actBtnText, styles.AsgoBtnText]}>
              {"Accept For    " + "\u20AC " + sugFare}
            </Text>
          </TouchableOpacity>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => onBidBookingSubmit(budget)}
              style={[styles.Amobtn]}
            >
              <Text style={[styles.actBtnText, styles.BookNow]}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet
        snapPoints={[140, 520, 600]}
        index={1}
        backdrop={MapView}
      >
        <View style={styles.ScreenCont}>
          <View style={styles.ScreenContChilds}>
            <FixedAddressComponent
              data={[pickUpDescription, dropOffDescription]}
            />
            <View style={styles.dateTimeMain}>
              <View style={styles.bookingDateTime}>
                <Text style={styles.bookingDateTimeHeading}>Booking Date</Text>
                <Text style={styles.bookingDateTimeText}>{bookingDate}</Text>
              </View>
              <View style={styles.bookingDateTime}>
                <Text style={styles.bookingDateTimeHeading}>Booking Time</Text>
                <Text style={styles.bookingDateTimeText}>{bookingTime}</Text>
              </View>
            </View>
            <View
              style={[styles.dateTimeMain, { marginTop: 30, marginBottom: 20 }]}
            >
              <View style={styles.bookingDateTime}>
                <Text style={styles.bookingDateTimeHeading}>No Of Persons</Text>
                <Text style={styles.bookingDateTimeText}>
                  {numberOfPersons}
                </Text>
              </View>
              <View style={styles.bookingDateTime}>
                <Text style={styles.bookingDateTimeHeading}>No Of Bags</Text>
                <Text style={styles.bookingDateTimeText}>{numberOfBags}</Text>
              </View>
            </View>
            <CarouselComponent onCarSelect={handleCarSelect} />
            <View style={styles.Act1Con}>
              <CustomButton
                text="Fare Adjustable"
                style={
                  rideMode === rideModes.adjustable ? "" : styles.activebtnAdj
                }
                color={
                  rideMode === rideModes.adjustable
                    ? colors.white
                    : colors.darkBlue
                }
                onPress={() => setRideMode(rideModes.adjustable)}
              />
              <CustomButton
                text={`£ ${sugFare} Fixed Price`}
                backgroundColor={colors.lightGreen}
                onPress={() => setRideMode(rideModes.fixed)}
                style={
                  rideMode === rideModes.fixed ? "" : styles.activebtnfixed
                }
                color={
                  rideMode === rideModes.fixed
                    ? colors.white
                    : colors.lightGreen
                }
              />
            </View>

            <View style={styles.FindActBtnCon}>
              <CustomButtonLoader
                text="Find A Driver"
                backgroundColor={colors.lightGreen}
                width="68%"
                borderRadius={50}
                isLoading={isLoading} // Pass the loading state as isLoading
                onPress={onSubmit}
              />

            </View>

            <View style={styles.FindActBtnCon}>
            <CustomButtonLoader
                text="Cancel Driver"
                backgroundColor={colors.red}
                width="68%"
                borderRadius={50}
                isLoading={isRideCancelling} // Pass the loading state as isLoading
                onPress={cancelRide}
              />

            </View>
          </View>
        </View>
      </CustomBottomSheet>
    </>
  );
}

export default AddBagsAndPersons;

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

  bookingDateTimeHeading: {
    fontSize: hp(2.2),
  },
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
    // marginVertical: hp(1),
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
  bookingPersonsHeading: {
    fontSize: hp(2),
  },
  bookingBags: {
    justifyContent: "center",
    alignItems: "center",
  },
  bookingBagsHeading: {
    fontSize: hp(2),
  },
  bookingBagsText: {
    fontSize: hp(2),
    color: "#36454F",
  },
  bookingPersonsText: {
    fontSize: hp(2),
    color: "#36454F",
  },
  Act1Con: {
    marginVertical: "2%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  FindActBtnCon: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "3%",
  },
  QtyCon: {
    justifyContent: "center",
    marginVertical: 15,
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
    width: wp(100),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
  textInputBookNow: {
    backgroundColor: colors.white,
    width: "45%",
    paddingVertical: hp(1),
    borderRadius: 50,

    textAlign: "center",
  },
  Asgo: {
    backgroundColor: colors.darkBlue,
    textAlign: "center",
  },
  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    color: colors.white,
  },
  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    color: colors.white,
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: hp(1),
    width: "100%",
  },
  Amobtn: {
    backgroundColor: colors.lightGreen,
    width: wp(80),
    borderRadius: 50,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  actBtnText: {
    fontSize: hp(2.3),
    marginHorizontal: wp(2),
    color: colors.white,
  },
  actionBtn: {
    padding: 15,
    borderRadius: 10,
  },
  activebtnAdj: {
    borderWidth: 1,
    borderColor: colors.darkBlue,
    backgroundColor: "transparent",
  },
  activebtnfixed: {
    borderWidth: 1,
    borderColor: colors.lightGreen,
    backgroundColor: "transparent",
  },
});
