import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import { Ionicons } from "@expo/vector-icons";

import MapView from "@components/MapView";
import SelectRideCars from "@components/SelectRideCars";
import AdressesContainer from "@components/AdressesContainer";
import HomeScreenActions from "@components/HomeScreenActions";
import HomeScreensTopMenu from "@components/HomeScreensTopMenu";
import CustomModal from "@components/Modal";
import MainLayout2 from "@layout/MainLayout2";
import { useNavigation } from "expo-router";
function HomeScreen1() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const locations = [
    {
      area: "Village Street",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "Airport",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "Richal House Village",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "John House Village",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "Village Street",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "Airport",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "Richal House Village",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
    {
      area: "John House Village",
      address:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, porro?",
    },
  ];
  return (
    <>
      <CustomModal
        setVisible={setModalVisible}
        visible={modalVisible}
        position="bottom"
      >
        <View style={[styles.modalView, styles.generalModalView]}>
          
          <View style={styles.ScreenContModal}>
            <View>
              <Text style={styles.locationHeading}>
                Where are you going today ?
              </Text>
              <AdressesContainer />
              <View style={styles.addressCont}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {locations.map((loaction, ind) => (
                    <View style={styles.list} key={ind}>
                      <Text style={styles.locationDetailHeading}>
                        {loaction.area}
                      </Text>
                      <Text style={styles.locationDetailParagraph}>
                        {loaction.address}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
              <TouchableOpacity
                style={[styles.actionBtnMod1]}
                onPress={() =>
                  navigation.navigate("searchLocationMap/PickLocationOnMap")
                }
              >
                <Text style={[styles.actBtnText, styles.AsgoBtnText]}>
                  <Ionicons name="md-pin-outline" size={20} color="white" />
                  Set Location On The Map
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomModal>
      <View style={styles.container}>
        <View style={styles.ScreenCont}>
          <View style={styles.ScreenContChilds}>
            <HomeScreensTopMenu />
            <SelectRideCars />
            <Text style={{ marginTop: 5 }}>Where are you going today ?</Text>
            <AdressesContainer />
            <HomeScreenActions
              visible={modalVisible}
              setVisible={setModalVisible}
            />
            <View style={styles.addTextInp}>
              <TextInput
                style={styles.addTextInpText}
                placeholder="$ Offer your fare"
              />
            </View>
            <View style={styles.FindBtn}>
              <TouchableOpacity
                style={styles.actionBtn}
                onPress={() =>
                  navigation.navigate("chooseYourCab/Availalbedrivers")
                }
              >
                <Text style={styles.actionBtnText}>Find A Driver</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

export default HomeScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ScreenCont: {
    height: "70%",
    Width: "100%",
    backgroundColor: colors.skyBlue,
  },
  ScreenContChilds: {
    marginHorizontal: wp(4),
    marginVertical: wp(4),
    backgroundColor: colors.skyBlue,
  },
  addTextInp: {
    width: "100%",
    backgroundColor: colors.white,
    position: "relative",
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),
  },
  addTextInpText: {
    paddingLeft: 8,
  },

  actionBtn: {
    backgroundColor: colors.lightGreen,
    width: wp(70),
    borderRadius: wp(50),
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: hp(2.3),
  },
  FindBtn: {
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: hp(80),
    width: wp(100),
    // marginTop: wp(5),
  },
  generalModalView: {
    backgroundColor: colors.skyBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // marginHorizontal: wp(10),
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

  PickUpmodalView: {
    height: "100%",
    width: wp(100),
    paddingHorizontal: wp(2),
    // marginTop: wp(5),
  },
  ScreenContModal: {
    paddingHorizontal: wp(2),
  },
  addressCont: {
    height: "47%",
    paddingHorizontal: wp(3),
  },
  actionBtnMod1: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    borderRadius: 10,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(3),
  },
  actionBtnMod2: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    borderRadius: 10,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(3),
  },

  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    fontFamily: "Poppins-Medium",
    color: colors.white,
  },
  locationDetailHeading: {
    fontSize: hp(1.9),
    fontFamily: "Poppins-Medium",
  },
  locationDetailParagraph: {
    fontSize: hp(1.4),
    fontFamily: "Poppins-Medium",
    color: colors.textDarkGrey,
  },
  list: {
    paddingHorizontal: wp(3),
  },
  actbtnCon: {
    width: "100%",
  },
});
