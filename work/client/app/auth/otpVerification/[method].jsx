import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { hp, wp } from "@utils";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useUserContext } from "@context/userContext/useUserContext";
import KeyboardAvoidingViewWrapper from "../../../components/KeyboardAvoidingViewWrapper";
import { Auth } from "aws-amplify";
import { useState } from "react";
import OtpInput from "../../../components/OtpInput";
import LoadingButton from "../../../components/LoadingButton";
import jwtDecode from "jwt-decode";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const OtpVerification = () => {
  const { method } = useLocalSearchParams();
  const { AuthenticationEmail, mode, AuthenticationUser, dispatch } =
    useUserContext();
  const [otpCode, setOtpCode] = useState([0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (method === "signup") {
        const resultString = otpCode.join("");
        const response = await Auth.confirmSignUp(
          AuthenticationEmail,
          resultString
        );
        delete AuthenticationUser.password;

        const registerResponse = await axios.post(
          "https://rsadmin.vercel.app/api/users/auth/register",
          AuthenticationUser
        );

        if (registerResponse.status === 201) {
          const decodedUser = jwtDecode(registerResponse.data.token);
          dispatch({
            type: "setUser",
            payload: { user: { ...decodedUser, mode } },
          });
          await AsyncStorage.setItem("user-data", registerResponse.data.token);

          if (mode == "user") {
            const passengerFormData = new FormData();
            passengerFormData.append("userId", decodedUser.id);

            const passengerResponse = await axios.post(
              "https://rsadmin.vercel.app/api/users/passenger",
              passengerFormData
            );
            if (passengerResponse.status == 201) {
              dispatch({
                type: "setPassengerInUser",
                payload: {
                  passenger: passengerResponse.data,
                },
              });
              dispatch({
                type: "SET_ISAUTHENTICATED_USER",
                payload: {
                  isAuthenticated: true,
                },
              });
              setLoading(false)
              router.push("/getStarted");
            }
          }
          if (mode == "driver") {
            setLoading(false)
            router.push("/auth/registerDriver");
          }
        }
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ImageBackground
          style={styles.image}
          source={require("@assets/images/authenticationBgImages/authBg.png")}
        >
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("@assets/logo/logo.png")}
            />
          </View>
          <View style={styles.otpVerificationMainContainer}>
            <View style={styles.codeContainer}>
              <Text style={styles.verifcationCodeText}>Enter the</Text>
              <Text style={styles.verifcationCodeText}>verification code</Text>
              <Text style={styles.enterOtpCodeText}>
                Enter your OTP code here
              </Text>
              <OtpInput otpCode={otpCode} setOtpCode={setOtpCode} />

              <LoadingButton onPress={handleSubmit} isLoading={loading}>
                Verify Now
              </LoadingButton>
            </View>
            <Text style={styles.resendCodeText}>Resend code in 02:36</Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingViewWrapper>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  image: {
    width: wp(100),
    height: hp(100),
    marginVertical: hp(5.5),
  },
  logoContainer: {
    marginTop: hp(18),
    alignItems: "center",
  },
  logo: {
    width: wp(36),
    height: hp(18.5),
  },
  icons: {
    width: wp(4.6),
    height: hp(2.2),
  },
  codeContainer: {
    width: wp(90),
    height: hp(35),
    marginTop: hp(3.14),
    borderRadius: hp(2.5),
    backgroundBlurRadius: hp(2.5),
    padding: "10%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "brightness(1.8) blur(2.5px)",
  },
  otpVerificationMainContainer: {
    alignItems: "center",
  },
  verifcationCodeText: {
    color: "#0045BF",
    fontWeight: "600",
    fontSize: 18,
  },
  enterOtpCodeText: {
    color: "#707070",
    fontWeight: "600",
    fontSize: 13,
  },

  verifyNowBtnContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  verifyNowBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#378D00",
    width: wp(75),
    height: hp(4.6),
    marginTop: hp(2),
    borderRadius: 50,
  },
  verifyNowText: {
    marginRight: 3,
    fontSize: 16,
  },
  arrowIcon: {
    color: "#1F1F1F",
  },
  resendCodeText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: hp(3.5),
  },
});
