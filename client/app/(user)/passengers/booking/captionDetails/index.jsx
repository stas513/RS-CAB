import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import CustomBottomSheet from "@components/BottomSheet";
import MapView from "@components/MapView";
import {
  Fontisto,
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import CustomModal from "@components/Modal";
import { useRouter } from "expo-router";
import FixedAddressComponent from "@components/FixedAdressComponent";
import { usePassengerContext } from "@context/passenger/usePassengerContext";
import {
  CarNullImage,
  ProfileNullImage,
} from "../../../../../components/ProfileNullImage";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { fetchImageFromBackend } from "@utils/appApis";
import { ScrollView } from "react-native-gesture-handler";

function YourCaptainDetail() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [rideDetailmodalVisible, setRideDetailmodalVisible] = useState(false);
  const [rateRidemodalVisible, setRateRidemodalVisible] = useState(false);
  const [customTipmodalVisible, setCustomTipmodalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [amount, setAmount] = useState("00.00");
  const { isArrivedAtPickup, booking, ride, dispatch, isRideCompleted } =
    usePassengerContext();
  const [profileImage, setProfileImage] = useState(null);
  const [carImage, setCarImage] = useState(null);
  const { socketInstance, reconnect } = useSocketContext();
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    if (booking?.driverInfo?.car?.carImage) {
      try {
        const carImageData = await fetchImageFromBackend(
          booking.driverInfo.car?.carImage
        );
        setCarImage(carImageData);
      } catch (carImageError) {
        console.error("Error fetching car image:", carImageError);
      }
    }

    if (booking?.driverInfo?.profileImage) {
      try {
        const profileImageData = await fetchImageFromBackend(
          booking.driverInfo.profileImage
        );
        setProfileImage(profileImageData);
      } catch (profileImageError) {
        console.error("Error fetching profile image:", profileImageError);
      }
    }

    setLoading(false);
  };

  const handleAddAmount = () => {
    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue)) {
      setAmount((numericValue + 1).toFixed(2));
    }
  };

  const handleSubtractAmount = () => {
    const numericValue = parseFloat(amount);
    if (!isNaN(numericValue) && numericValue > 0) {
      setAmount((numericValue - 1).toFixed(2));
    }
  };

  const handleAmountChange = (text) => {
    const numericValue = parseFloat(text);

    if (!isNaN(numericValue)) {
      let formattedAmount = numericValue.toFixed(2);
      if (numericValue < 10) {
        formattedAmount = `0${formattedAmount}`;
      }
      setAmount(formattedAmount);
    } else {
      setAmount("00.00");
    }
  };

  const OpenRideDetail = () => {
    setModalVisible(false);
    setRideDetailmodalVisible(true);
    dispatch({
      type: "ARRIVED_AT_PICKUP",
      payload: {
        isArrivedAtPickup: false,
      },
    });
  };

  const OpenTipAndCloseRate = () => {
    setRateRidemodalVisible(false);
    setCustomTipmodalVisible(true);
  };

  const SubmitFeedBack = () => {
    const data = {
      id: booking.id,
      passengerRating: parseFloat(rating),
      passengerReview: review,
    };
    socketInstance.emit("give-review-passenger", data);

    socketInstance.on("give-review-passenger-error", (error) => {
      console.log(error);
    });
    dispatch({
      type: "SET_RIDECOMPLETED",
      payload: {
        isRideCompleted: false,
      },
    });
    setRateRidemodalVisible(false);
    reconnect();
    router.push("passengers/home");
  };

  useEffect(() => {
    if (isArrivedAtPickup) {
      setModalVisible(true);
    }
  }, [isArrivedAtPickup]);

  useEffect(() => {
    fetchImages();
    dispatch({
      type: "ARRIVED_AT_PICKUP",
      payload: {
        isArrivedAtPickup: false,
      },
    });
  }, []);

  useEffect(() => {
    if (isRideCompleted) {
      setRideDetailmodalVisible(false);
      setRateRidemodalVisible(isRideCompleted);
    }
  }, [isRideCompleted]);

  return (
    <>
      <CustomModal
        setVisible={setModalVisible}
        visible={modalVisible}
        position="center"
      >
        <View style={[styles.modalView, styles.generalModalView]}>
          <Fontisto name="smiley" size={30} color={colors.darkBlue} />
          <Text style={{ fontSize: hp(3) }}>Your trip is arrived</Text>
          <View
            style={{
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: hp(2), textAlign: "center" }}>
              {booking?.driverInfo?.bio} Has Been Arived At Your Location
            </Text>
          </View>
          <View style={styles.RideStart}>
            <TouchableOpacity
              onPress={OpenRideDetail}
              style={[styles.StartActBtn, styles.OK]}
            >
              <Text style={[{ color: colors.white }]}>Okay, Let's Ride</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomModal
        setVisible={setRideDetailmodalVisible}
        visible={rideDetailmodalVisible}
        position="bottom"
      >
        <View style={[styles.detailModalView, styles.generalModalView]}>
          <Text style={{ fontSize: hp(3), marginVertical: "2%" }}>
            Trip Details
          </Text>

          <View>
            <FixedAddressComponent
              data={[ride?.startFrom?.name, ride?.destination?.name]}
            />
          </View>
          <View style={styles.sumDriverDet}>
            <View style={styles.DriverCardImgDiv}>
              <View style={styles.sumDriverimgDiv}>
                {booking?.driverInfo?.profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.DriverImg}
                  />
                ) : (
                  <ProfileNullImage />
                )}
              </View>
              <View style={styles.detModdriverRating}>
                <Text>
                  <FontAwesome name={"star"} size={14} color={"gold"} />
                  {booking?.driverInfo?.ratings}
                </Text>
              </View>
            </View>
            <View style={styles.SumCarDet1}>
              <Text style={styles.driverNameText}>
                {booking?.driverInfo?.bio}
              </Text>
              <Text style={styles.CarMakeText}>
                {booking?.driverInfo?.car?.color +
                  "-" +
                  booking?.driverInfo?.car?.make +
                  "-" +
                  booking?.driverInfo?.car?.model}
              </Text>
            </View>
            <View style={styles.SumCarDet2}>
              <Text style={styles.CarMakeText}>
                {booking?.driverInfo?.car?.numberPlate}
              </Text>
            </View>
          </View>
        </View>
      </CustomModal>
      <CustomModal
        position="bottom"
        setVisible={setRateRidemodalVisible}
        visible={rateRidemodalVisible}
      >
        <View style={styles.Rating2modalView}>
          <View style={styles.infoContainer}>
            {booking?.driverInfo.profileImage ? (
              <Image source={profileImage} style={styles.passengerImage} />
            ) : (
              <ProfileNullImage />
            )}
          </View>
          <View style={[styles.queCon, { marginVertical: hp(1) }]}>
            <Text style={styles.infoTitle}>
              Rate your experience with {booking?.driverInfo?.bio} ?
            </Text>
          </View>
          <View style={[styles.ratingContainer, { marginVertical: hp(1) }]}>
            {[1, 2, 3, 4, 5].map((starNumber) => (
              <TouchableOpacity
                key={starNumber}
                style={styles.star}
                onPress={() => setRating(starNumber)}
              >
                <FontAwesome
                  name={starNumber <= rating ? "star" : "star-o"}
                  size={32}
                  color={starNumber <= rating ? "gold" : "gold"}
                />
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            onPress={OpenTipAndCloseRate}
            style={styles.customTip}
          >
            <Text style={styles.customTipText}>Add the tip to the driver</Text>
          </TouchableOpacity>
          <View style={styles.rideCommint}>
            <TextInput
              placeholder="Write your commit"
              textAlignVertical="top"
              value={review}
              onChangeText={(value) => setReview(value)}
              style={[styles.commitTextInput]}
              multiline={true}
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity onPress={SubmitFeedBack} style={styles.DoneBtn}>
            <Text style={styles.principlesBtnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </CustomModal>
      <CustomModal
        setVisible={setCustomTipmodalVisible}
        visible={customTipmodalVisible}
        position="bottom"
      >
        <View style={[styles.modalView, styles.customTripContainer]}>
          <View style={styles.queCon}>
            <Text style={styles.cusTipText}>Add a custom tip</Text>
          </View>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
              onPress={handleAddAmount}
            >
              <Ionicons name="add" size={36} color="white" />
            </TouchableOpacity>
            <TextInput
              style={[styles.input, styles.infoAmount]}
              keyboardType="number-pad"
              value={amount.toString()}
              onChangeText={handleAmountChange}
            />
            <TouchableOpacity
              style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
              onPress={handleSubtractAmount}
            >
              <AntDesign name="minus" size={36} color="white" />
            </TouchableOpacity>
          </View>
          <View style={[styles.actionContainerModal]}>
            <TouchableOpacity
              onPress={() => {
                setCustomTipmodalVisible(!customTipmodalVisible);
                router.push("passengers/home");
              }}
              style={styles.actionBtn}
            >
              <Text style={styles.actionBtnText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet backdrop={MapView} snapPoints={[200, 600]}>
          <View style={styles.ScreenCont}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior="padding"
              enabled
              keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
            >
              <View style={styles.ScreenContChilds}>
                <View style={styles.Container}>
                  <View style={styles.TextCon}>
                    <Text style={{ fontSize: hp(2.5) }}>
                      Your captain is on the way
                    </Text>
                    <Text style={{ fontSize: hp(1.5) }}>
                      Meet your driver at the pick-up spot
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.PromoCon}>
                    <Text
                      style={{
                        fontSize: hp(3),
                        textAlign: "center",
                        color: colors?.white,
                      }}
                    >
                      5
                    </Text>
                    <Text
                      style={{
                        fontSize: hp(1),
                        textAlign: "center",
                        color: colors?.white,
                      }}
                    >
                      min
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.driverChat}>
                  <TouchableOpacity style={styles.driverChatIcon}>
                    <Ionicons
                      name="md-call"
                      size={24}
                      color={colors.lightGreen}
                    />
                  </TouchableOpacity>
                  <View style={styles.DriverCardImgDiv}>
                    <View style={styles.DriverimgDiv}>
                      {booking?.driverInfo.profileImage ? (
                        <Image source={{uri:profileImage}} style={styles.DriverImg} />
                      ) : (
                        <ProfileNullImage />
                      )}
                    </View>
                    <View style={styles.CarimgDiv}>
                      {booking?.driverInfo?.car.carImage ? (
                        <Image
                          source={{ uri: carImage }}
                          style={styles.CarImg}
                        />
                      ) : (
                        <CarNullImage />
                      )}
                    </View>
                    <View style={styles.driverRating}>
                      <Text>
                        <FontAwesome name={"star"} size={14} color={"gold"} />
                        {booking?.driverInfo?.ratings}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => router.push("chat/driverChat/DriverChat")}
                    style={styles.driverChatIcon}
                  >
                    <Ionicons
                      name="chatbubble-ellipses"
                      size={24}
                      color={colors.lightGreen}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.driverNameText}>
                  {booking?.driverInfo?.bio}
                </Text>
                <View style={styles.driverCarDet}>
                  <Text style={styles.CarMakeText}>
                    {booking?.driverInfo?.car?.make +
                      " " +
                      booking?.driverInfo?.car?.model}
                  </Text>
                  <Text style={styles.CarMakeText}>
                    {booking?.driverInfo?.car?.numberPlate}
                  </Text>
                </View>
                <FixedAddressComponent
                  data={[ride.destination.name, ride.startFrom.name]}
                />
                <View style={styles.carDetails}>
                  <View style={styles.carDetailsImg}>
                    {booking?.driverInfo?.car?.carImage ? (
                      <Image source={{uri:carImage}} />
                    ) : (
                      <CarNullImage />
                    )}
                  </View>
                  <View style={styles.carDetailsCat}>
                    <Text style={{ fontSize: hp(2.5) }}>
                      {ride.packageInfo.name}
                    </Text>
                    <Text style={{ fontSize: hp(1.5) }}>
                      {(ride.totalDistance * 1.609344).toFixed(2) + " km"}
                    </Text>
                  </View>
                  <View style={styles.carDetailsfare}>
                    <Text>{"\u20AC " + ride.totalBill}</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.botAction}>
                  <Entypo name="share" size={22} color={colors.lightGreen} />
                  <Text style={styles.botActionTex}> Share ride details</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </View>
      </CustomBottomSheet>
    </>
  );
}

export default YourCaptainDetail;

const styles = StyleSheet.create({
  ScreenCont: {
    flex: 1,
    backgroundColor: colors.skyBlue,
  },
  ScreenContChilds: {
    marginHorizontal: wp(4),
    marginVertical: wp(4),
    backgroundColor: colors.skyBlue,
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
  cusTipText: {
    fontSize: hp(2.6),
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
  Container: {
    height: hp(8),
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  TextCon: {
    gap: 13,
  },
  PromoCon: {
    width: "22%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    borderRadius: 10,
  },
  driverChat: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "20%",
    marginVertical: hp(1),
  },

  DriverCardImgDiv: {
    // position: "relative",
    height: "60%",
  },
  DriverimgDiv: {
    position: "relative",
    top: 0,
    // left: 0,
    right: 10,
    zIndex: 2,
  },
  sumDriverimgDiv: {
    position: "relative",
    bottom: 16,
    // left: 0,
    right: 10,
    zIndex: 2,
  },
  DriverImg: {
    height: hp(8),
    width: hp(8),
  },
  CarimgDiv: {
    position: "relative",
    bottom: 50,
    left: 30,
    zIndex: 1,
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  CarImg: {
    height: hp(8),
    width: hp(8),
    resizeMode: "contain",
  },
  driverRating: {
    position: "relative",
    bottom: 62,
    left: 12,
    zIndex: 3,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 10,
  },
  detModdriverRating: {
    position: "relative",
    bottom: 30,
    right: 10,
    zIndex: 3,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 10,
  },
  driverChatIcon: {
    padding: hp(2),
    backgroundColor: colors.white,
    borderRadius: 50,
  },
  driverNameText: {
    color: colors.black,
    fontSize: hp(2.4),
    textAlign: "center",
  },
  FareText: {
    color: colors.black,
    fontSize: hp(3),
  },
  CarMakeText: {
    color: colors.textDarkGrey,
    fontSize: hp(1.4),
    textAlign: "center",
  },
  driverCarDet: {
    marginHorizontal: wp(10),
    // width:"70%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  botAction: {
    marginVertical: hp(1),
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  botActionTex: {
    color: "gray",
    fontSize: hp(2.4),
  },
  modalView: {
    justifyContent: "space-around",
    alignItems: "center",
    width: wp(90),
    height: hp(30),
    backgroundColor: "#E5ECF9",
    borderRadius: 20,
    alignItems: "center",
    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(2),
  },
  customTripContainer: {
    width: "100%",
  },
  Rating2modalView: {
    alignItems: "center",
    width: wp(100),
    backgroundColor: "#E5ECF9",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: colors.skyBlue,
    paddingVertical: hp(2),
  },
  detailModalView: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: wp(100),
    height: hp(85),
    backgroundColor: "#E5ECF9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,

    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(3),
  },
  generalModalView: {
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
  RideStart: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  StartActBtn: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(12),
    borderRadius: 50,
    justifyContent: "space-around",
    alignItems: "center",
  },
  SummeryActBtn: {
    width: "100%",
    paddingVertical: hp(2),
    borderRadius: 5,
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: hp(2),
  },
  dont: {
    borderWidth: 1,
  },
  OK: {
    backgroundColor: colors.lightGreen,
  },
  sumDriverDet: {
    width: "100%",
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  SumCarDet1: {
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  fareDet: {
    marginVertical: hp(2),
  },
  fareDetailChild: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: hp(1),
  },
  fareDetailText: {
    color: colors.textGrey,
  },
  infoContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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
    marginTop: 30,
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
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: wp(5),
  },
  actionContainer2: {
    flexWrap: "wrap",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    // paddingHorizontal: wp(5),
  },
  CloseBtn: {
    // backgroundColor: colors.white,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    paddingHorizontal: hp(5),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.lightGreen,
    borderWidth: 1,
  },
  PrincBtn2: {
    // backgroundColor: colors.white,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.textGrey,
    borderWidth: 1,
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  TipsBtn2: {
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(2),
    marginVertical: hp(1),
  },
  DoneBtn: {
    width: wp(40),
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
    borderRadius: 50,
  },
  AddtipBtn: {
    width: wp(90),
    backgroundColor: colors.darkBlue,
    paddingVertical: hp(2),
    paddingHorizontal: hp(2),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    borderRadius: 10,
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
    fontSize: wp(4),
  },
  CloseBtnText: {
    color: colors.lightGreen,
    fontSize: wp(4),
  },
  principlesBtnText: {
    color: colors.black,
    fontSize: wp(4),
  },
  menuItem: {
    paddingHorizontal: wp(0.6),
    paddingVertical: hp(0.3),
    borderRadius: 50,
    backgroundColor: colors.lightGreen,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp(2),
    gap: 13,
  },
  infoAmount: {
    color: "black",
    textAlign: "center",
    fontSize: wp(8),
  },
  actionContainerModal: {
    paddingHorizontal: wp(35),

    width: wp(100),
    marginBottom: 5,
  },
  actionBtnText: {
    color: colors.white,
  },
  actionBtn: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
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
  RideCancelAct: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
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
  ReacedBtn: {
    backgroundColor: colors.lightGreen,
    width: "100%",
    borderRadius: 10,
    paddingVertical: "5%",
    marginVertical: "4%",
  },
  ReacedBtnText: {
    textAlign: "center",
    color: colors.white,
    fontSize: hp(2.4),
  },
  customTip: {
    backgroundColor: colors.darkBlue,
    width: "90%",
    justifyContent: "center",
    borderRadius: 10,
    padding: "5%",
    marginBottom: "1%",
  },
  customTipText: {
    color: colors.white,
    textAlign: "center",
    fontSize: hp(2.5),
  },
  ullImageDis: {
    backgroundColor: "blue",
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});
