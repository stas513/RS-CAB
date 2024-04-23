import React from 'react'
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Pressable,
    TextInput,
  } from "react-native";
  import { hp, wp } from "@utils/index";
  import { colors } from "@utils/theme";
  import { Ionicons,FontAwesome5,MaterialIcons,AntDesign } from "@expo/vector-icons";

function BookYourCabAction() {
  return (
    <View style={styles.actionContainer}>
    <TouchableOpacity style={[styles.Asgo,styles.actionBtn]}>
      <Text style={[styles.actBtnText,styles.AsgoBtnText]}>Pay as you go</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.actionBtn,styles.Amobtn]}>
      <Text style={[styles.actBtnText,styles.workBtnText]}> € 09.50 </Text>
    </TouchableOpacity>
  </View>
  )
}

export default BookYourCabAction;

const styles = StyleSheet.create({
    actionContainer: {

      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      marginBottom:hp(1),
      width: "100%",
    },
    Asgo: {
      backgroundColor:colors.darkBlue,
      textAlign:"center"
    },
    Amobtn: {
      backgroundColor:colors.lightGreen
    },
    actionBtn: {
      width:wp(44),
      borderRadius: 10,
      paddingVertical: hp(2),
      flexDirection: "row",
      justifyContent: 'center',
      alignItems: "center",
    },
    actBtnText: {
      fontSize: hp(2),
      marginHorizontal: wp(2),
      fontWeight: "bold",
      color: colors.white,
    },


  });
