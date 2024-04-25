import React, { useEffect, useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import { colors } from "@utils/theme";
import { hp, wp } from "@utils";
import { ProgressBar } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";
import { usePassengerContext } from "@context/passenger/usePassengerContext";
import { useSocketContext } from "@context/sockets/useSocketContext";
import MapView from "@components/MapView";
import { fetchImageFromBackend } from "@utils/appApis";
import {
  CarNullImage,
  ProfileNullImage,
} from "../../../../../components/ProfileNullImage";
import CustomBottomSheet from "@components/BottomSheet";
import { ScrollView } from "react-native-gesture-handler";

const RenderDriverBid = ({ item }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [carImage, setCarImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { socketInstance } = useSocketContext();
  const navigation = useRouter();
  const { rideBids, onDeclineBid } = usePassengerContext();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const fetchImages = async () => {
    if (item?.driverInfo?.profileImage) {
      setLoading(true);
      const data = await fetchImageFromBackend(item?.driverInfo?.profileImage);
      setProfileImage(data);
      setLoading(false);
    }

    if (item?.driverInfo?.car?.carImage) {
      setLoading(true);
      const data = await fetchImageFromBackend(item?.driverInfo?.car?.carImage);
      setCarImage(data);
      setLoading(false);
    }

    setLoading(false);
  };
  const onAcceptDriver = (id) => {
    const data = {
      id,
    };

    setIsSubmiting(true);
    socketInstance.on("accept-bid-error", (response) => {
      setIsSubmiting(false);
      Alert.alert(response.message);
    });

    socketInstance.on("accept-bid-successfully", (response) => {
      setIsSubmiting(false);
      Alert.alert(response.message);
    });

    socketInstance.emit("accept-bid", data);
  };

  const onDeclineDriver = (id) => {
    onDeclineBid(id);

    socketInstance.emit("reject-bid", { id });

    socketInstance.on("reject-bid-error", (response) => {
      Alert.alert(response.message);
    });

    socketInstance.on("reject-bid-successfully", (response) => {
      Alert.alert(response.message);
    });
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Animatable.View animation="slideInDown" duration={800}>
      <View style={styles.DriverCard}>
        <View style={styles.DriverCardTop}>
          <View style={styles.DriverCardTopChild}>
            <View style={styles.DriverCardImgDiv}>
              <View style={styles.DriverimgDiv}>
                {item?.driverInfo?.profileImage ? (
                  <Image
                    source={{ uri: profileImage }}
                    style={styles.DriverImg}
                  />
                ) : (
                  <ProfileNullImage />
                )}
              </View>
              <View style={styles.Carimg}>
                {item?.driverInfo?.car?.carImage ? (
                  <Image source={{ uri: carImage }} />
                ) : (
                  <CarNullImage />
                )}
              </View>
              <View style={styles.driverRating}>
                <Text>
                  <FontAwesome name={"star"} size={14} color={"gold"} />
                  {item?.driverInfo?.ratings}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.driverNameText}>
                {item?.driverInfo?.userInfo?.name}
              </Text>
              <Text style={styles.CarMakeText}>
                {item?.driverInfo?.car?.make}
              </Text>
            </View>
          </View>
          <View style={styles.DriverCardSecChild}>
            <Text style={styles.carnumText}>
              {item?.driverInfo?.car?.numberPlate}
            </Text>
          </View>
          <View style={styles.DriverCardThirdChild}>
            <Text style={styles.FareText}>{"\u20AC " + item?.bidAmount}</Text>
          </View>
        </View>
        <View style={styles.DriverCardProgress}>
          <ProgressBar
            progress={item.Progress}
            color={colors.lightGreen}
            width="100%"
            borderRadius={10}
            paddingVertical={100}
          />
        </View>
        <View style={styles.DriverCardActions}>
          <TouchableOpacity
            style={[styles.declineBtn, styles.cardAction]}
            onPress={() => onDeclineDriver(item.id)}
          >
            <Text style={styles.cardActionBtn}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onAcceptDriver(item.id)}
            style={[styles.AccepteBtn, styles.cardAction]}
            disabled={isSubmiting}
          >
            {isSubmiting ? (
              <ActivityIndicator />
            ) : (
              <Text style={styles.cardActionBtn}>Accept</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

const AvailableDriversContainer = () => {
  const { rideBids } = usePassengerContext();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView style={{ flex: 1 }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            position: "absolute",
            top: 80,
            left: 16,
            right: 16,
            height: "100%",
          }}
          contentContainerStyle={{ paddingBottom: hp(33) }}
        >
          {rideBids?.map((item) => {
            return <RenderDriverBid item={item} />;
          })}
        </ScrollView>
      </View>
    </>
  );
};

const AvailableDrivers = () => {
  const { ride, dispatch } = usePassengerContext();
  const [newPrice, setNewPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const { socketInstance } = useSocketContext();

  const onPriceUpdate = () => {
    setLoading(true);
    socketInstance.emit("update-ride-price", { id: ride?.id, newPrice });
    socketInstance.once("update-ride-price-successfully", (response) => {
      Alert.alert(response.message);
      dispatch({
        type: "SET_RIDE",
        payload: {
          ride: response.data,
        },
      });
      setLoading(false);
    });
    socketInstance.once("update-ride-price-error", (data) => {
      Alert.alert(data.message);
      setLoading(false);
    });
  };

  return (
    <CustomBottomSheet
      snapPoints={[70, 200]}
      index={1}
      backdrop={AvailableDriversContainer}
    >
      <View style={styles.updatePriceContainer}>
        <Text>Update Bid Price</Text>
        <TextInput
          keyboardType="number-pad"
          placeholder="0.00"
          value={newPrice}
          onChangeText={(value) => setNewPrice(value)}
          style={styles.textInputUpdatePrice}
        />
        <TouchableOpacity
          style={[styles.Asgo, styles.actionBtn]}
          onPress={onPriceUpdate}
          disabled={loading}
        >
          {loading && <ActivityIndicator size="small" color="#000" />}
          <Text style={[styles.actBtnText, styles.AsgoBtnText]}>
            Update Price
          </Text>
        </TouchableOpacity>
      </View>
    </CustomBottomSheet>
  );
};

export default AvailableDrivers;

const styles = StyleSheet.create({
  DriverCard: {
    backgroundColor: colors.white,
    height: hp(29),
    width: wp(90),
    borderRadius: 20,
    marginVertical: "1%",
  },
  DriverCardTop: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "65%",
  },
  DriverCardTopChild: {
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: "100%",
    width: "48%",
    paddingHorizontal: hp(2),
  },
  declineBtn: {
    backgroundColor: colors.red,
  },
  AccepteBtn: {
    backgroundColor: colors.lightGreen,
  },
  cardAction: {
    paddingHorizontal: hp(4),
    paddingVertical: hp(1),
    borderRadius: 50,
  },
  cardActionBtn: {
    color: colors.white,
  },
  DriverCardImgDiv: {
    position: "relative",
    backgroundColor: "white",
    height: "60%",
    width: "100%",
  },
  DriverimgDiv: {
    position: "absolute",
    top: 10,
    left: 0,
    zIndex: 2,
  },
  DriverImg: {
    height: hp(8),
    width: hp(8),
  },
  Carimg: {
    position: "absolute",
    top: 20,
    left: 30,
    zIndex: 1,
  },
  driverRating: {
    position: "absolute",
    top: 60,
    left: 20,
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
  driverNameText: { color: colors.black, fontSize: hp(2.4) },
  FareText: { color: colors.black, fontSize: hp(3) },
  CarMakeText: { color: colors.textDarkGrey, fontSize: hp(1.4) },
  DriverCardSecChild: {
    justifyContent: "flex-end",

    height: "100%",
    width: "23%",
  },
  DriverCardThirdChild: {
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "75%",
    width: "27%",
    paddingHorizontal: wp(2.5),
  },
  carnumText: {
    fontSize: hp(2.5),
  },
  DriverCardProgress: {
    justifyContent: "center",
    alignItems: "flex-end",

    width: "100%",
    height: "10%",
  },
  DriverCardActions: {
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    height: "20%",
  },
  textInputUpdatePrice: {
    paddingVertical: hp(1),
    borderRadius: 20,

    textAlign: "center",
    width: "40%",
    backgroundColor: colors.white,
  },
  Asgo: {
    backgroundColor: colors.lightGreen,
    textAlign: "center",
  },
  actionBtn: {
    paddingVertical: 15,
    borderRadius: 30,
    paddingHorizontal: 40,
  },
  actBtnText: {
    fontSize: hp(2.3),
    marginHorizontal: wp(2),
    color: colors.white,
  },
  updatePriceContainer: {
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
    backgroundColor: colors.skyBlue,
    height: "100%",
    paddingVertical: hp(1),
  },
});
