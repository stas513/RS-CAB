import "react-native-gesture-handler";
import { AppRegistry, SafeAreaView,Image } from "react-native";
import { name as appName } from "../app.json";
import { useState } from "react";
import { loadAsync, useFonts } from "expo-font";
import UserAndCaptain from "./user&Captain";
import awsExports from '../src/aws-exports';
import { Amplify } from 'aws-amplify';
import { useUserContext } from "@context/userContext/useUserContext";
import {hp,wp} from '@utils'

Amplify.configure({...awsExports,
  authenticationFlowType:"USER_PASSWORD_AUTH",
  oauth: {
  ...awsExports.oauth
},});



AppRegistry.registerComponent(appName, () => Page);

export default function Page({ children }) {
  const [loading, setLoading] = useState(true);
  const {isLoading} = useUserContext()
  const [fontsLoaded] = useFonts({
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
  });

  loadAsync({
    "Poppins-Medium": require("../assets/fonts/poppins/Poppins-Medium.ttf"),
    "Poppins-Bold": require("../assets/fonts/poppins/Poppins-Bold.ttf"),
  })
    .then(() => {
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });

    if (isLoading) {
      return <Image source={require("@assets/background/splash.png")} style={{height:hp(100),width:wp(100)}}/>
    }
    else {
      return <UserAndCaptain />;
    }
}
