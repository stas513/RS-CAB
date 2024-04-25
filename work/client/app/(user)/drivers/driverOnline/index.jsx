import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import CustomModal from "@components/Modal";
import { TextInput } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import * as Animatable from "react-native-animatable";
import MapView from "@components/MapView";
import { useDriverContext } from "@context/driver/useDriverContext";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { CustomButtonLoader } from "@components/CustomButtonLoader";
import { ProfileNullImage } from "@components/ProfileNullImage";
import { useUserContext } from "@context/userContext/useUserContext";
import { fetchImageFromBackend } from "@utils/appApis";
import checkTime from "../../../../utils/checkTime";

const RenderRequest = ({ request }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isBidSubmiting, setIsBidSubmiting] = useState(false);
  const { user } = useUserContext();
  const router = useRouter();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { socketInstance,reconnect } = useSocketContext();
  const { onDeclineRequest, dispatch } = useDriverContext();
  const distanceKM = (request?.totalDistance * 1.609344).toFixed(2);

  const fetchImages = async () => {
    if (request?.passengerInfo?.profileImage) {
      setLoading(true);
      const data = await fetchImageFromBackend(
        request?.passengerInfo?.profileImage
      );
      setProfileImage(data);
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleDeclineRequest = (id) => {
    onDeclineRequest(id);
  };

  const handleAcceptRequest = (id) => {
    setIsSubmiting(true);
    const data = {
      requestId: id,
      driverId: user?.driver?.id,
    };

    socketInstance.emit("accept-fixed-request", data);

    socketInstance.on("accept-fixed-request-successfully", (response) => {
      setIsSubmiting(false);
      Alert.alert(response.message);
      const isFuture = checkTime(
        response?.data?.booking?.bookingDate,
        response?.data?.booking?.bookingTime
      );
      if (!isFuture) {
        router.push("/drivers/booking/arrivedAtPickup");
        dispatch({
          type: "SET_BOOKING",
          payload: {
            booking: response.data.booking,
          },
        });

        dispatch({
          type: "SET_RIDE",
          payload: {
            ride: response.data.ride,
          },
        });
        return;

      } else {
        Alert.alert("Your Ride is Booked");
        reconnect();
        router.push("drivers/driverOffline")
      }
    });

    socketInstance.on("accept-fixed-request-error", (response) => {
      setIsSubmiting(false);
      Alert.alert(response.message);
    });
  };

  const handleBidOnRequest = (id, amount) => {
    setIsBidSubmiting(true);
    if (!amount) {
      Alert.alert("Amount Must Not Be 0");
      return;
    }
    const data = {
      requestId: id,
      driverId: user?.driver?.id,
      bidAmount: Number(amount),
    };

    socketInstance.on("bid-placed", (data) => {
      Alert.alert(data.message);
      setIsBidSubmiting(false);
    });

    socketInstance.on("bid-accepted-driver", (response) => {
      try {
        const isFuture = checkTime(
          response?.data?.booking?.bookingDate,
          response?.data?.booking?.bookingTime
        );

        if (!isFuture) {
          Alert.alert(response.message);
          router.push("/drivers/booking/arrivedAtPickup");
          dispatch({
            type: "SET_BOOKING",
            payload: {
              booking: response.data.booking,
            },
          });

          dispatch({
            type: "SET_RIDE",
            payload: {
              ride: response.data.ride,
            },
          });
          return;
        } else {
          Alert.alert("Your Ride is Booked");
          reconnect();
          router.push("drivers/driverOffline")
        }
      } catch (err) {
        console.log(err);
      }
    });

    socketInstance.on("bid-rejected-driver", (data) => {
      Alert.alert(data.message);
    });

    socketInstance.on("place-bid-error", (data) => {
      Alert.alert(data.message);
      setIsBidSubmiting(false);
    });

    socketInstance.emit("place-bid", data);
  };

  const onBidAmountSelected = (amount) => {
    handleBidOnRequest(request.id, amount);
    setModalVisible(false);
    setBidAmount(0);
  };

  return (
    <>
      {request.requestType === "ADJUSTABLE" ? (
        <CustomModal setVisible={setModalVisible} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <Text style={styles.SuggFareTopHead}>
                  Offer You Fare For The Trip
                </Text>
              </View>
              <View style={styles.FareTextInput}>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Recommended Fare"
                  value={bidAmount}
                  onChangeText={setBidAmount}
                />
              </View>

              <View style={styles.SuggestedFare}>
                <Pressable
                  onPress={() => onBidAmountSelected(request.budget)}
                  style={styles.AcceForOthers}
                >
                  <Text style={styles.AcceFortext}>{request.budget}</Text>
                </Pressable>
              </View>
              <View>
                <Pressable
                  onPress={() => onBidAmountSelected(bidAmount)}
                  style={styles.AcceForMian}
                >
                  <Text style={styles.AcceFortext}>Go with my price</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </CustomModal>
      ) : null}

      <Animatable.View animation="slideInDown" duration={800}>
        <View style={styles.requestCardContainer} key={request?.id}>
          <View style={styles.requestCard}>
            <View style={styles.passengerDetail}>
              <View style={styles.passengerInfoConatiner}>
                <View style={styles.passengerImageConatiner}>
                  {request?.passengerInfo?.profileImage ? (
                    <Image
                      source={{uri:profileImage}}
                      style={styles.passengerImage}
                    />
                  ) : (
                    <ProfileNullImage />
                  )}
                </View>
                <View style={styles.passengerInfo}>
                  <Text style={styles.passengerName}>
                    {request?.clientName}
                  </Text>
                </View>
              </View>
              <View style={styles.passengerRideDetail}>
                <Text style={styles.passengerPrice}>$ {request?.budget}</Text>
                <Text style={styles.passengerDistance}>
                  {distanceKM + " KM "}
                </Text>
                <Text style={styles.passengerIsFixed}>
                  {request?.requestType}
                </Text>
              </View>
            </View>
            <View style={styles.locationsAndBidConatiner}>
              <View style={styles.locations}>
                <View style={styles.location}>
                  <View style={styles.locationHead}>
                    <View>
                      <Text style={styles.locationType}>Pick up</Text>
                    </View>
                    <View>
                      <Text style={styles.locationDuration}>
                        {request?.vehicleType}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.locationTitle}>
                    {request?.startFrom?.name}
                  </Text>
                </View>
                <View style={styles.location}>
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
              <View style={styles.bidButtonContainer}>
                {request?.requestType == "ADJUSTABLE" ? (
                  <Pressable
                    onPress={() => setModalVisible(true)}
                    style={styles.bidButton}
                  >
                    {isBidSubmiting ? (
                      <ActivityIndicator color={"white"} />
                    ) : (
                      <Text style={styles.actionButtonText}>
                        Bid Your Price
                      </Text>
                    )}
                  </Pressable>
                ) : (
                  <View style={styles.acceptDeclineBtnsContainer}>
                    <CustomButtonLoader
                      text="Accept"
                      backgroundColor={colors.darkBlue}
                      borderRadius={50}
                      isLoading={isSubmiting}
                      onPress={() => handleAcceptRequest(request.id)}
                    />
                    <Pressable
                      onPress={() => handleDeclineRequest(request.id)}
                      style={styles.declineButton}
                    >
                      <Text style={styles.actionButtonText}>Decline</Text>
                    </Pressable>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </Animatable.View>
    </>
  );
};

const DriverOnline = () => {
  const { requests, onDeclineRequest, dispatch } = useDriverContext();
  const [acceptloading, setAcceptLoading] = useState(false);

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            position: "absolute",
            top: 80,
            height: "100%",
            width: wp(100),
          }}
          contentContainerStyle={{
            paddingBottom: hp(33),
            alignItems: "center",
          }}
        >
          {requests?.map((request) => {
            return (
              <RenderRequest request={request} acceptloading={acceptloading} />
            );
          })}
        </ScrollView>
      </View>
    </>
  );
};

export default DriverOnline;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  offlineBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(1),
    zIndex: 1,
  },
  offlineBtn: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: wp(7),
    paddingVertical: hp(1.5),
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
  offlineBtnText: {
    fontSize: wp(4),
    color: colors.white,
    fontFamily: "Poppins-Medium",
  },
  offlineBtnIcon: {
    marginTop: hp(0.2),
  },

  // Request Styles
  requestsListContainer: {
    height: hp(95),
  },
  requestsList: {
    marginBottom: hp(30),
    marginTop: hp(2),
  },

  requestCardContainer: {
    marginBottom: hp(1),
    width: "100%",
  },
  requestCard: {
    backgroundColor: colors.skyBlue,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    marginBottom: hp(1),
    width: wp(92),
    borderRadius: 10,
  },
  passengerDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passengerInfoConatiner: {
    flexDirection: "row",
  },
  passengerImage: {
    height: hp(7),
    width: wp(14),
    borderRadius: 50,
  },
  passengerInfo: {
    padding: wp(1),
  },
  passengerName: {
    fontSize: wp(3.5),
    fontFamily: "Poppins-Medium",
  },
  passengerTags: {
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
  passengerRideDetail: {
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingRight: wp(5),
  },
  passengerPrice: {
    textAlign: "right",
    fontSize: wp(3.5),
    fontWeight: "bold",
    lineHeight: hp(2),
    fontFamily: "Poppins-Bold",
  },

  passengerDistance: {
    textAlign: "right",
    fontSize: wp(2.5),
    fontWeight: "500",
    lineHeight: hp(2),
    fontFamily: "Poppins-Medium",
  },
  passengerIsFixed: {
    textAlign: "right",
    fontStyle: "italic",
    fontSize: wp(2.5),
    lineHeight: hp(2),
    fontFamily: "Poppins-Medium",
  },
  locationsAndBidConatiner: {
    flexDirection: "row",
  },
  location: {
    maxWidth: wp(50),
  },
  locationHead: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    marginTop: hp(1),
  },
  locationType: {
    fontSize: wp(2.5),
    fontFamily: "Poppins-Medium",
  },
  locationDuration: {
    fontSize: wp(2.5),
    fontFamily: "Poppins-Bold",
  },
  locationTitle: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    fontSize: wp(3),
    paddingBottom: hp(0.5),
    paddingTop: hp(0.5),
    fontFamily: "Poppins-Medium",
  },
  bidButtonContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    width: "50%",
  },
  bidButton: {
    paddingHorizontal: wp(3.5),
    paddingVertical: hp(1),
    backgroundColor: colors.darkBlue,
    borderRadius: 20,
  },
  acceptButton: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    backgroundColor: colors.darkBlue,
    borderRadius: 20,
  },
  declineButton: {
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    backgroundColor: colors.red,
    borderRadius: 20,
  },
  actionButtonText: {
    color: colors.white,
    fontSize: wp(3),
    fontFamily: "Poppins-Medium",
  },
  acceptDeclineBtnsContainer: {
    flexDirection: "row",
    gap: 5,
  },
  modalView: {
    justifyContent: "space-around",
    height: hp(35),
    marginTop: wp(5),
    backgroundColor: "#E5ECF9",
    borderRadius: 20,
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
    paddingVertical: hp(2),
    width: wp(94),
  },
  SuggestedFare: {
    width: wp(94),
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },
  SuggFareTopHead: {
    color: colors.black,
    fontSize: hp(3),
    fontWeight: "bold",
  },
  AcceForMian: {
    backgroundColor: colors.darkGreen,
    paddingHorizontal: wp(10),
    paddingVertical: hp(2),
    borderRadius: hp(10),
  },
  AcceFortext: {
    color: colors.white,
    fontSize: hp(2),
  },
  AcceForOthers: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: wp(8),
    paddingVertical: hp(2),
    borderRadius: hp(10),
  },
  FareTextInput: {
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: hp(1),
    paddingHorizontal: hp(2),
  },
});
