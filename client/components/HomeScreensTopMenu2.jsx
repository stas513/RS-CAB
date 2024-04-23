import React from 'react'
import {
    Image,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Pressable,
  } from "react-native";
  import { hp, wp } from "@utils/index";
  import { colors } from "@utils/theme";
  import DiscountPromo from '@assets/UserFlow/Icons/DiscountPromo.png';
  import { useUserContext } from "@context/userContext/useUserContext";

function HomeScreensTopMenu2() {
  const {user} = useUserContext()

  return (
    <View style={styles.Container}>
        <View style={styles.TextCon}>
        <Text>Hey! Good Day
          <Text style={{ color: colors.black,fontWeight:"bold" }}>{" "}{user?.name}</Text>
        </Text>
        <Text>Select Ride</Text>
        </View>
        <View style={styles.PromoCon}>
            <Image source={DiscountPromo}/>
            <Text style={{color:colors.darkBlue}}>Promo Code</Text>
        </View>

    </View>
  )
}

export default HomeScreensTopMenu2;

const styles = StyleSheet.create({
    Container:{

      height:hp(10),
      width:'100%',
      justifyContent:"space-between",
      alignItems:"flex-start",
        flexDirection:"row",
    },
    TextCon:{
        justifyContent:"space-around",
        alignItems:"flex-start",
        width:'70%',
        height:"100%",
    },
    PromoCon:{
        width:'30%',
        height:"100%",
        justifyContent:"space-around",
        alignItems:"center",
        color:colors.darkBlue
    }
  })