import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { hp, wp } from "@utils";
import { colors } from "@utils/theme";
import MapView from "@components/MapView";
import SelectRideCars from "@components/SelectRideCars";
import AdressesContainer from "@components/AdressesContainer";
import HomeScreensTopMenu2 from "@components/HomeScreensTopMenu2";
import BookYourCabAction from "@components/BookYourCabAction";
import { useNavigation } from "expo-router";
import CustomBottomSheet from "@components/BottomSheet";
import { ScrollView } from "react-native-gesture-handler";

function ChooseYourCab() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomBottomSheet snapPoints={[150, 500]} backdrop={MapView} index={1}>
          <View style={styles.ScreenCont}>
            <View style={styles.ScreenContChilds}>
              <HomeScreensTopMenu2 />
              <SelectRideCars />
              <AdressesContainer />
              <BookYourCabAction />
              <View style={styles.FindBtn}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("chooseYourCab/DetailAllCabsShow")
                  }
                  style={styles.actionBtn}
                >
                  <Text style={styles.actionBtnText}>Choose a cab</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </CustomBottomSheet>
      </ScrollView>
    </View>
  );
}

export default ChooseYourCab;

const styles = StyleSheet.create({
  ScreenCont: {
    height: hp(65),
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
});
