import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import CustomBottomSheet from "@components/BottomSheet";
import MapView from "@components/MapView";
import { useRouter } from "expo-router";
import { useSocketContext } from "@context/sockets/useSocketContext";
import { useUserContext } from "@context/userContext/useUserContext";
import { useState } from "react";
import {
  fetchImageFromBackend,
  updateDriverLocation,
} from "../../../../utils/appApis";
import { useEffect } from "react";
import { ProfileNullImage } from "../../../../components/ProfileNullImage";
import * as Location from "expo-location";
import getCurrentLocation from "@utils/currentLocation";
import CustomModal from "@components/Modal";
import { CustomButton } from "@components/CustomButton";
import { ScrollView } from "react-native-gesture-handler";

const DriverHome = () => {
  const router = useRouter();
  const { socketInstance } = useSocketContext();
  const { user, updateUserCurLocDetails } = useUserContext();
  const [image, setImage] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [goOnlineLoading, setGoOnlineLoading] = useState(false);

  const handleGoOnline = async () => {
    try {
      setGoOnlineLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setOpenModal(true);
        return;
      }
      let location = await getCurrentLocation();
      if (location) {
        updateUserCurLocDetails({
          cordinates: location,
        });

        await updateDriverLocation({
          id: user.driver.id,
          currentLatitude: `${location?.coords?.latitude}`,
          currentLongitude: `${location?.coords?.longitude}`,
        });
        const data = {
          id: user?.driver?.id,
        };
        socketInstance.emit("connect-driver", data);
        router.push("/drivers/driverOnline");
        setGoOnlineLoading(false);
        setLoading(true);
        setOpenModal(false);
        return;
      }
      setOpenModal(true);
    } catch (error) {
      setLoading(false);
      setOpenModal(false);
      Alert.alert(error.message);
      console.error("Error requesting location permission:", error);
    }
  };

  const fetchImages = async () => {
    const imageResponse = user?.driver?.profileImage
      ? await fetchImageFromBackend(user?.driver?.profileImage)
      : null;

    setImage(imageResponse);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <>
      <CustomModal visible={openModal} setVisible={setOpenModal}>
        <View style={[styles.SecondModalView, styles.generalModalView]}>
          <Text style={{ fontSize: hp(3) }}>
            For processed further we need to access your location
          </Text>
          <CustomButton
            text="Fetch Location"
            onPress={handleGoOnline}
            style={{
              textTransform: "capitalize",
              backgroundColor: colors.lightGreen,
              color: colors.white,
            }}
          />
        </View>
      </CustomModal>

      <CustomBottomSheet backdrop={MapView} snapPoints={[100, 400]} index={1}>
        <View style={styles.driverDetailContainer}>
          <View style={styles.onlineBtnContainer}>
            <TouchableOpacity onPress={handleGoOnline} disabled={goOnlineLoading} style={styles.onlineBtn}>
              {goOnlineLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <>
                  <Text style={styles.onlineBtnText}>GO Online</Text>
                  <AntDesign
                    style={styles.onlineBtnIcon}
                    name="arrowright"
                    size={22}
                    color="#FFFFFF"
                  />
                </>
              )}
            </TouchableOpacity>
          </View>
          <Text style={styles.driverDetailHeading}>
            Go Online To Start Accepting Rides.
          </Text>
          <View style={styles.driverBio}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: hp(1.5),
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  gap: wp(2),
                  alignItems: "center",
                }}
              >
                {image ? (
                  <Image
                    style={styles.bioImage}
                    source={{uri: image}}
                    alt="Driver Image"
                  />
                ) : (
                  <ProfileNullImage />
                )}
                <View>
                  <Text
                    style={{
                      fontSize: wp(3.5),
                      color: colors.textGray,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    {user?.name}
                  </Text>
                  <Text
                    style={{
                      fontSize: wp(3),
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Basic Level
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: wp(4),
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: wp(5),
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  $ 350.00
                </Text>
                <Text
                  style={{
                    fontSize: wp(3),
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Earned
                </Text>
              </View>
            </View>
            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Feather name="clock" size={wp(10)} color={colors.darkBlue} />
                <Text
                  style={{
                    fontSize: wp(5),

                    fontFamily: "Poppins-Medium",
                  }}
                >
                  10.2
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.5),

                    color: colors.textGray,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Hours Online
                </Text>
              </View>
              <View style={styles.card}>
                <AntDesign
                  name="dashboard"
                  size={wp(10)}
                  color={colors.darkBlue}
                />
                <Text
                  style={{
                    fontSize: wp(5),

                    fontFamily: "Poppins-Medium",
                  }}
                >
                  30 Km
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.5),

                    color: colors.textGray,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Total Distance
                </Text>
              </View>
              <View style={styles.card}>
                <FontAwesome5
                  name="clipboard-list"
                  size={wp(10)}
                  color={colors.darkBlue}
                />
                <Text
                  style={{
                    fontSize: wp(5),
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  20
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.5),

                    color: colors.textGray,
                    fontFamily: "Poppins-Medium",
                  }}
                >
                  Total Rides
                </Text>
              </View>
            </View>
          </View>
        </View>
      </CustomBottomSheet>
    </>
  );
};

export default DriverHome;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.skyBlue,
    height: "100%",
  },
  onlineBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: hp(0.7),
  },
  onlineBtn: {
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
  onlineBtnText: {
    fontSize: wp(4),
    color: colors.white,
    fontFamily: "Poppins-Medium",
  },
  onlineBtnIcon: {
    marginTop: hp(0.2),
  },
  driverDetailContainer: {
    paddingHorizontal: wp(5),
  },

  driverDetailHeading: {
    marginTop: hp(5),
    textAlign: "center",
    fontSize: wp(3.5),
    color: colors.textGray,
    fontFamily: "Poppins-Medium",
  },

  driverBio: {
    marginTop: hp(3),
  },

  bioImage: {
    borderRadius: 50,
    width: wp(15),
    height: hp(7.5),
  },

  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: hp(4),
  },

  card: {
    flexDirection: "column",
    alignItems: "center",
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
});
