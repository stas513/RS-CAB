import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { hp, wp } from "@utils";
import PassengerImage from "@assets/passengerdumy.png";
import { colors } from "@utils/theme";
import { Ionicons, AntDesign, FontAwesome } from "@expo/vector-icons";
import CustomModal from "@components/Modal";
import { useRouter } from "expo-router";
import { useDriverContext } from "@context/driver/useDriverContext";
import { ProfileNullImage } from "../../../../../components/ProfileNullImage";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { fetchImageFromBackend } from "@utils/appApis";

const CashCollect = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [amount, setAmount] = useState("0.00");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { ride, booking } = useDriverContext();
  const { socketInstance, reconnect } = useSocketContext();

  const fetchImages = async () => {
    if (ride?.passengerInfo?.profileImage) {
      setLoading(true);
      const data = await fetchImageFromBackend(item?.driverInfo?.profileImage);
      setProfileImage(data);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

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

  const handleDoneClick = () => {
    setModalVisible(!modalVisible);
    setRatingModalVisible(!ratingModalVisible);
  };

  const SubmitFeedBack = () => {
    const data = {
      id: booking.id,
      driverRating: parseFloat(rating),
      driverReview: review,
    };
    socketInstance.emit("give-review-driver", data);
    socketInstance.on("give-review-driver-error", (error) => {
      console.log(error);
    });
    setRatingModalVisible(false);
    reconnect();
    router.push("/drivers/driverOffline");
  };

  return (
    <>
      <CustomModal
        setVisible={setRatingModalVisible}
        visible={ratingModalVisible}
      >
        <View style={styles.centeredRatingView}>
          <View style={styles.modalRatingView}>
            <View style={styles.infoRatingContainer}>
              {ride?.passengerInfo?.profileImage ? (
                <Image source={{uri:profileImage}} style={styles.passengerImage} />
              ) : (
                <ProfileNullImage />
              )}
            </View>
            <View style={styles.queRatingCon}>
              <Text style={styles.infoRatingTitle}>
                rate your experience with {ride.clientName}
              </Text>
            </View>
            <View style={styles.ratingContainer}>
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
            <View style={styles.ModalactionContainer}>
              <TouchableOpacity
                style={styles.CloseBtn}
                onPress={() => setRatingModalVisible(false)}
              >
                <Text style={styles.CloseBtnText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={SubmitFeedBack} style={styles.RateBtn}>
                <Text style={styles.RateBtnText}>Rate Ride</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomModal>
      <CustomModal
        setVisible={setModalVisible}
        visible={modalVisible}
        position="bottom"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.queCon}>
              <Text style={styles.infoTitle}>How Much Cash You Recieved?</Text>
            </View>
            <View style={styles.inputContainer}>
              <TouchableOpacity
                style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
                onPress={handleAddAmount}
              >
                <Ionicons name="add" size={36} color="white" />
              </TouchableOpacity>
              <View style={styles.amountContainer}>
                <Text style={styles.infoAmount}>$</Text>
                <TextInput
                  style={[styles.input, styles.infoAmount]}
                  // placeholder="0"
                  keyboardType="number-pad"
                  value={amount.toString()}
                  onChangeText={handleAmountChange}
                />
              </View>
              <TouchableOpacity
                style={[styles.menuItem, { backgroundColor: colors.darkBlue }]}
                onPress={handleSubtractAmount}
              >
                <AntDesign name="minus" size={36} color="white" />
              </TouchableOpacity>
            </View>
            <View style={[styles.actionContainerModal]}>
              <TouchableOpacity
                onPress={handleDoneClick}
                style={styles.actionBtn}
              >
                <Text style={styles.actionBtnText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomModal>
      <ImageBackground
        style={styles.container}
        source={require("@assets/background/user-detail-background.png")}
      >
        <View
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
            height: hp(100),
          }}
        >
          <View style={styles.mainContainer}>
            <View style={styles.infoContainer}>
              {ride?.passengerInfo?.profileImage ? (
                <Image source={{uri:profileImage}} style={styles.passengerImage} />
              ) : (
                <ProfileNullImage />
              )}
              <Text style={styles.infoTitle}>
                Collect Cash From {ride.clientName}
              </Text>
              <Text style={styles.infoAmount}>$25.00</Text>
            </View>
            <View style={styles.actionContainer}>
              <View style={styles.alertContainer}>
                <View style={styles.warningIcon}>
                  <Ionicons
                    name={"information-outline"}
                    size={16}
                    color="#000000"
                    style={{ opacity: 0.3 }}
                  />
                </View>
                <Text style={styles.alertText}>
                  If rider dont't have change , ask them to pay in whole sums,
                  extra amount paid will be credited to rider's account
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.actionBtn}
              >
                <Text style={styles.actionBtnText}>Cash Collect</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </>
  );
};

export default CashCollect;

const styles = StyleSheet.create({
  container: {
    height: hp(150),
  },
  mainContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: hp(30),
  },
  amountContainer: {
    flexDirection: "row",
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
  infoTitle: {
    color: colors.textGray,
    fontSize: wp(5),
    marginTop: hp(1),
    fontFamily: "Poppins-Medium",
  },
  infoAmount: {
    color: "black",
    textAlign: "left",
    fontSize: wp(8),
    fontWeight: "800",
  },
  actionContainer: {
    paddingHorizontal: wp(10),
    marginTop: hp(18),
    gap: hp(5),
  },
  actionBtn: {
    backgroundColor: colors.lightGreen,
    borderRadius: wp(50),
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "4%",
  },
  actionBtnText: {
    color: colors.white,
  },

  alertContainer: {
    backgroundColor: "#fff3cd",
    paddingHorizontal: hp(4),
    paddingVertical: hp(2),
    height: hp(12.2),
    flexDirection: "row",
    gap: wp(3),
  },
  alertText: {
    fontSize: hp(1.5),
  },
  warningIcon: {
    borderRadius: wp(50),
    backgroundColor: "orange",
    height: hp(2.5),
    width: wp(5),
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    marginTop: wp(5),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: wp(10),
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
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: hp(2),
    gap: 15,
    // backgroundColor: "black",
  },
  queCon: {
    marginTop: hp(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  actionContainerModal: {
    paddingHorizontal: wp(35),
    width: wp(100),
    marginBottom: 5,
  },

  actionBtnText: {
    color: colors.white,
  },
  menuBtnConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  modalView: {
    marginTop: wp(5),
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginHorizontal: wp(10),
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
  centeredRatingView: {
    width: wp(96),
  },
  infoRatingContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: "3%",
  },
  queRatingCon: {
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
  rideCommint: {
    marginVertical: "2%",
    borderRadius: 20,
    width: "80%",
  },
  ModalactionContainer: {
    marginVertical: "4%",
    justifyContent: "space-around",
    flexDirection: "row",
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
  CloseBtnText: {
    color: colors.lightGreen,
    fontSize: wp(3),
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
});
