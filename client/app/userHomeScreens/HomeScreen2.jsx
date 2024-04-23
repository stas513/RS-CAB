import React from "react";
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import MapView from "@components/MapView";
import SelectRideCars from "@components/SelectRideCars";
import AdressesContainer from "@components/AdressesContainer";
import HomeScreensTopMenu from "@components/HomeScreensTopMenu";
import HomeScreenActions from "@components/HomeScreenActions";
import CustomBottomSheet from "@components/BottomSheet";
import { ScrollView } from "react-native-gesture-handler";

function HomeScreen2() {
  return (
    <CustomBottomSheet snapPoints={[50, 300]} backdrop={MapView} index={1}>
        <View style={styles.container}>
          <View style={styles.ScreenCont}>
            <View style={styles.ScreenContChilds}>
              <HomeScreensTopMenu />
              <SelectRideCars />
              <Text>Where are you going today ?</Text>
              <AdressesContainer />
              <HomeScreenActions />
              <View style={styles.priceBtn}>
                <TouchableOpacity
                  style={[styles.priceActionBtn, styles.priceActionBtnAsGO]}
                >
                  <Text style={styles.actionBtnText}>Pay as you go</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.priceActionBtn, styles.priceActionBtnFixed]}
                >
                  <Text style={styles.actionBtnText}>Fixed Price</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.FindBtn}>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>Find A Driver </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
    </CustomBottomSheet>
  );
}

const styles = StyleSheet.create({});
export default HomeScreen2;
