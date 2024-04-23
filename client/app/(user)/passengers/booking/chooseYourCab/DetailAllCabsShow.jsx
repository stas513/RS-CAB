import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import MapView from "@components/MapView";
import Car1 from "@assets/UserFlow/Cars/Car1.png";
import Car2 from "@assets/UserFlow/Cars/Car2.png";
import Car3 from "@assets/UserFlow/Cars/Car3.png";
import Car4 from "@assets/UserFlow/Cars//Car4.png";
import Cash from "@assets/UserFlow/Icons/Cash.png";
import DiscountPromo from "@assets/UserFlow/Icons/DiscountPromo.png";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import CustomModal from "@components/Modal";
import BookYourCabAction from "@components/BookYourCabAction";
import {  useRouter } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";

function DetailAllCabsShow() {
  const navigation = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModalVisible, setSecondModalVisible] = useState(false);
  const [promoModalVisible, setPromoModalVisible] = useState(false);
  const [EnterPromoModalVisible, setEnterPromoModalVisible] = useState(false);
  const carDetails = [
    {
      category: "Economy",
      image: Car1,
      id: 1,
      km: "0.2km",
      fare: "05.50",
      time: "8.min",
    },
    {
      category: "Standard",
      image: Car2,
      id: 2,
      km: "0.2km",
      fare: "07.00",
      time: "8.min",
    },
    {
      category: "Standard Ac",
      image: Car3,
      id: 3,
      km: "0.2km",
      fare: "09.50",
      time: "8.min",
    },
    {
      category: "Premium",
      image: Car4,
      id: 4,
      km: "0.2km",
      fare: "05.50",
      time: "8.min",
    },
    {
      category: "Standard",
      image: Car2,
      id: 5,
      km: "0.2km",
      fare: "05.50",
      time: "8.min",
    },
    {
      category: "Standard Ac",
      image: Car3,
      id: 6,
      km: "0.2km",
      fare: "05.50",
      time: "8.min",
    },
    {
      category: "Premium",
      image: Car4,
      id: 7,
      km: "0.2km",
      fare: "05.50",
      time: "8.min",
    },
  ];
  const openSecondModalAndCloseFirst = () => {
    setModalVisible(false);
    setSecondModalVisible(true);
  };
  const openPromoModalAndClose = () => {
    setSecondModalVisible(false);
    setPromoModalVisible(true);
  };
  const OpenEnterPromoModal = () => {
    setEnterPromoModalVisible(true);
  };
  const CloseEnterPromoAndPromoModal = () => {
    setEnterPromoModalVisible(false);
    setPromoModalVisible(false);
    setModalVisible(true);
  };
  return (
    <>
      <CustomModal
        setVisible={setModalVisible}
        visible={modalVisible}
        position="bottom"
      >
        <View style={[styles.modalView, styles.generalModalView]}>
          <View style={styles.pay$dis}>
            <View style={styles.Cash}>
              <View>
                <Image source={Cash} />
              </View>
              <View>
                <Text>Cash</Text>
                <Text>02.50 credit</Text>
              </View>
            </View>
            <View style={styles.Discount}>
              <TouchableOpacity onPress={openPromoModalAndClose}>
                <Image source={DiscountPromo} />
                <Text>Discount</Text>
              </TouchableOpacity>
            </View>
          </View>
          <BookYourCabAction />
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={openSecondModalAndCloseFirst}
              style={[styles.actionBtn, styles.Amobtn]}
            >
              <Text style={[styles.actBtnText, styles.BookNow]}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>

      <CustomModal
        visible={secondModalVisible}
        setVisible={setSecondModalVisible}
        position="bottom"
      >
        <View style={[styles.SecondModalView, styles.generalModalView]}>
          <Text style={{ fontSize: hp(3) }}>Offer You Fare For The Trip</Text>
          <Text>specify a reasonable fare</Text>
          <TextInput
            keyboardType="number-pad"
            style={styles.textInputBookNow}
          />
          <TouchableOpacity style={[styles.Asgo, styles.actionBtn]}>
            <Text style={[styles.actBtnText, styles.AsgoBtnText]}>
              {"Accept For    " + "\u20AC " + "05.50"}
            </Text>
          </TouchableOpacity>
          <View style={styles.actionContainer}>
            <TouchableOpacity
              onPress={() => setSecondModalVisible(!secondModalVisible)}
              style={[styles.Amobtn]}
            >
              <Text style={[styles.actBtnText, styles.BookNow]}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomModal
        visible={promoModalVisible}
        setVisible={setPromoModalVisible}
        position="bottom"
      >
        <View style={[styles.PromoModalView, styles.generalModalView]}>
          <View style={styles.promodiscountdiv}>
            <Text style={styles.DiscountText}>Discount</Text>
            <TouchableOpacity
              onPress={() => setPromoModalVisible(!promoModalVisible)}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={32}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.promoCodeText}>Promo Code</Text>
          <View style={styles.promoAction}>
            <TouchableOpacity
              onPress={OpenEnterPromoModal}
              style={[styles.addpromBtn]}
            >
              <AntDesign name="plus" size={24} color="black" />
              <Text style={[styles.addPromText]}>Add New Promo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomModal
        visible={EnterPromoModalVisible}
        setVisible={setEnterPromoModalVisible}
        position="bottom"
      >
        <View
          style={[
            styles.PromoModalView,
            styles.generalModalView,
            { height: hp(45) },
          ]}
        >
          <View style={[styles.promodiscountdiv]}>
            <Text style={styles.DiscountText}>Add Promo</Text>
            <TouchableOpacity
              onPress={() => setEnterPromoModalVisible(!EnterPromoModalVisible)}
            >
              <Ionicons
                name="ios-close-circle-outline"
                size={32}
                color={colors.darkBlue}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.promoCodeText}>Promo Code</Text>
          <View style={styles.promoAction}>
            <TextInput
              placeholder="Enter Promo Code"
              style={[styles.addpromBtn]}
            />
          </View>
          <View style={[styles.promoAction]}>
            <TouchableOpacity
              onPress={CloseEnterPromoAndPromoModal}
              style={[
                styles.activepromBtn,
                { backgroundColor: colors.lightGreen },
              ]}
            >
              <Text style={[styles.ActiveCodeText]}>Active Code</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CustomModal>
      <CustomBottomSheet snapPoints={[150, 600]} backdrop={MapView} index={1}>
          <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
            <View style={styles.carstypeCon}>
              <View style={styles.carstypeConChild}>
                <Text style={{ fontSize: hp(2.5) }}>Chose Your Cab</Text>
                {carDetails?.map((cars, ind) => (
                  <TouchableOpacity
                    key={ind}
                    onPress={() => {
                      navigation.push("passengers/booking/createBooking");8
                    }}
                  >
                    <View style={styles.carDetails}>
                      <View style={styles.carDetailsImg}>
                        <Image source={cars?.image} />
                      </View>
                      <View style={styles.carDetailsCat}>
                        <Text style={{ fontSize: hp(2.5) }}>
                          {cars?.category}
                        </Text>
                        <Text style={{ fontSize: hp(1.5) }}>{cars?.km}</Text>
                      </View>
                      <View style={styles.carDetailsfare}>
                        <Text>{"\u20AC " + cars?.fare}</Text>
                        <Text style={{ fontSize: hp(1.5) }}>{cars?.time}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
        </View>
          </ScrollView>
      </CustomBottomSheet>
    </>
  );
}

export default DetailAllCabsShow;

const styles = StyleSheet.create({
  Container: {
    height: "100%",
    width: "100%",
  },
  carstypeCon: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: colors.skyBlue,
  },
  carstypeConChild: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginHorizontal: wp(2),
    marginTop: 20,
  },
  carDetails: {
    width: "96%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingVertical: hp(2),
    marginVertical: hp(1),
  },
  carDetailsCat: {
    width: "50%",
  },
  carDetailsImg: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  carDetailsfare: {
    width: "20%",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: wp(3),
  },
  modalView: {
    backgroundColor: "white",
    paddingHorizontal: wp(2),
  },
  SecondModalView: {
    height: hp(40),
    backgroundColor: colors.skyBlue,
    paddingHorizontal: wp(2),
    justifyContent: "space-around",
    alignItems: "center",
  },
  PromoModalView: {
    height: hp(60),
    backgroundColor: colors.white,
    alignItems: "center",
    paddingHorizontal: wp(5),
    paddingVertical: hp(5),
    justifyContent: "flex-start",
    alignItems: "flex-start",
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
  Cash: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  pay$dis: {
    width: wp(96),
    height: hp(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Discount: {
    width: "30%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  actionBtn: {
    width: wp(50),
    borderRadius: 10,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
  },
  actBtnText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    color: colors.white,
  },
  addPromText: {
    fontSize: hp(2),
    marginHorizontal: wp(2),
    fontWeight: "bold",
    color: colors.black,
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
  addpromBtn: {
    width: "100%",
    borderRadius: 50,
    textAlign: "center",
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.53,
    shadowRadius: 13.97,

    elevation: 3,
    marginBottom: hp(2),
  },
  activepromBtn: {
    width: wp(70),
    borderRadius: 50,
    paddingVertical: hp(2),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightGreen,
  },
  promodiscountdiv: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: hp(2),
  },
  Asgo: {
    backgroundColor: colors.darkBlue,
    textAlign: "center",
  },

  textInputBookNow: {
    backgroundColor: colors.white,
    width: "80%",
    paddingVertical: hp(1),
    borderRadius: 50,
    paddingLeft: 30,
  },
  promoAction: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  DiscountText: {
    color: colors.darkBlue,
    fontSize: hp(3),
  },
  promoCodeText: {
    fontSize: hp(2),
    marginTop: hp(1),
    marginBottom: hp(3),
  },
  ActiveCodeText: {
    fontSize: hp(2),
    color: colors.white,
  },
});
