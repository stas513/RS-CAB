import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { hp, wp } from "@utils/index";
import { colors } from "@utils/theme";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import MapView from "@components/MapView";
import { useNavigation, useRouter } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import AdressesContainer from "@components/AdressesContainer";
import { ScrollView } from "react-native-gesture-handler";
import { useBookingContext } from "@context/booking/useBookingContext";

function SetLoactionOnMap() {
  const { bookingDetails, updateBookingDetails, setRoute } =
    useBookingContext();

  const navigateToPickup = () => {
    setRoute("passengers/booking/searchLocationMap/PickLocationOnMap");
    navigation.push("passengers/booking/searchLocationMap/PickLocationOnMap");
  };
  const navigation = useRouter();
  const locations = [
    {
      area: "Village Street",
      address: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
    {
      area: "Airport",
      address: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
    {
      area: "Richal House Village",
      address: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
    {
      area: "John House Village",
      address: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. ",
    },
  ];
  return (
    <>
      <CustomBottomSheet snapPoints={[80, 600]} backdrop={MapView} index={1}>
          <View style={styles.ScreenContModal}>
            <Text style={styles.locationHeading}>
              Where are you going today ?
            </Text>

            <AdressesContainer stopage={true} />
            <View style={styles.addressCont}>
              {/* <ScrollView showsVerticalScrollIndicator={false} > */}
              {locations.map((loaction, ind) => (
                <TouchableOpacity style={styles.list} key={ind}>
                  <Text style={styles.locationDetailHeading}>
                    {loaction.area}
                  </Text>
                  <Text style={styles.locationDetailParagraph}>
                    {loaction.address}
                  </Text>
                </TouchableOpacity>
              ))}
              {/* </ScrollView> */}
            </View>
            <TouchableOpacity
              style={[styles.actionBtnMod1]}
              onPress={navigateToPickup}
            >
              <FontAwesome5 name="map-pin" size={20} color="white" />
              <Text style={[styles.actBtnText, styles.AsgoBtnText]}>
                Set Location On The Map
              </Text>
            </TouchableOpacity>
          </View>
      </CustomBottomSheet>
    </>
  );
}

export default SetLoactionOnMap;
const styles = StyleSheet.create({
  addTextInp: {
    width: "100%",
    backgroundColor: colors.white,
    position: "relative",
    borderRadius: 10,
    paddingHorizontal: "2%",
    paddingVertical: "2%",
  },
  locationHeading: {
    marginTop: 20,
    marginBottom: 10,
  },

  actBtnText: {
    fontSize: hp(2),
    fontFamily: "Poppins-Medium",
    color: colors.white,
    marginLeft: "3%",
  },
  addTextInpIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  Container: {
    width: "100%",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  addTextInpCont: {
    width: "100%",
  },

  addTextInpIcon: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  stopageRemoveIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  stopageBtnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  stopageBtn: {
    backgroundColor: colors.lightGreen,
  },
  actionBtn: {
    width: wp(28),
    borderRadius: 30,
    paddingVertical: hp(1.5),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  stopageBtnText: {
    color: "white",
  },
  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    fontWeight: "bold",
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
    paddingLeft: 30,
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
    backgroundColor: colors.skyBlue,
    paddingHorizontal: "3%",
    height: 600,
    // justifyContent:"space-around",
  },
  addressCont: {
    // height: "50%",
    paddingHorizontal: "1%",
    // marginVertical:"20%",
    // backgroundColor:'blue'
  },
  actionBtnMod1: {
    backgroundColor: colors.darkBlue,
    width: "100%",
    borderRadius: 10,
    paddingVertical: "4%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 30,
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
    // marginLeft:"4%"
  },
  locationDetailHeading: {
    fontSize: hp(1.9),
    fontFamily: "Poppins-Medium",
  },
  locationDetailParagraph: {
    fontSize: hp(1.4),
    fontFamily: "Poppins-Medium",
    color: colors.textDarkGrey,
    marginBottom: 20,
  },
  list: {
    paddingHorizontal: wp(3),
  },
  actbtnCon: {
    width: "100%",
  },
});
