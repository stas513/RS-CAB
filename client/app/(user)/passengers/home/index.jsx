import React, { useState, useContext, useEffect } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import MapView from "@components/MapView";
import AdressesContainer from "@components/AdressesContainer";
import HomeScreenActions from "@components/HomeScreenActions";
import HomeScreensTopMenu from "@components/HomeScreensTopMenu";
import CustomBottomSheet from "@components/BottomSheet";
import { ScrollView } from "react-native-gesture-handler";
import { useRouter } from "expo-router";
import { CustomButton } from "@components/CustomButton";
import { useBookingContext } from "@context/booking/useBookingContext";
import CustomModal from "@components/Modal";
import { ScrollView as GestureScrollView } from "react-native-gesture-handler";

function HomeScreen1() {
  const { isLoading, setIsLoading } = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useRouter();
  const { bookingDetails } = useBookingContext();

  const handleNextButtonPress = () => {
    if (
      bookingDetails.startAddress.length === 0 ||
      bookingDetails.destinationAddress.length === 0
    ) {
      // If either startAddress or destinationAddress is empty, show the modal
      setModalVisible(true);
    } else {
      // Both addresses are filled, navigate to the next step
      navigation.push("passengers/booking/createBooking");
    }
  };

  return (
    <>
      <CustomModal setVisible={setModalVisible} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.queCon}>
              <Text
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.infoTitle}
              >
                Pick up And Drop off are required Fileds
              </Text>
            </View>
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet backdrop={MapView} snapPoints={[100, 400]} index={1}>
          <View style={styles.ScreenCont}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={styles.ScreenContChilds}
            >
              <HomeScreensTopMenu />
              <Text style={{ marginBottom: 15 }}>
                Where are you going today ?
              </Text>
              <AdressesContainer />
              {/* <SelectRideCars /> */}
              <HomeScreenActions onPress={() => setModalVisible(true)} />
              <View style={styles.NextBtnCon}>
                <CustomButton
                  text="Next"
                  // backgroundColor={
                  //   canNavigate ? colors.blue : colors.textDarkGrey
                  // }
                  onPress={handleNextButtonPress}
                />
              </View>
            </ScrollView>
          </View>
      </CustomBottomSheet>
    </>
  );
}

export default HomeScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScreenCont: {
    Width: "100%",
    backgroundColor: colors.skyBlue,
    flex: 1,
  },
  ScreenContChilds: {
    marginHorizontal: wp(4),
    marginTop: hp(1),
    backgroundColor: colors.skyBlue,
  },
  NextBtnCon: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  NextBtn: {
    backgroundColor: colors.darkBlue,
    width: "50%",
    paddingHorizontal: "1%",
    paddingVertical: "3%",
    borderRadius: 10,
  },
  NextBtnText: {
    color: "white",
    textAlign: "center",
    // fontWeight :"bold",
    fontSize: hp(3),
  },
  modalView: {
    justifyContent: "center",
    height: hp(20),
    width: wp(80),
    paddingVertical: hp(7),
    marginTop: wp(5),
    backgroundColor: "white",
    borderRadius: 10,
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
});
