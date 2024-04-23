import {
  Alert,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "@utils";
import { Ionicons } from "@expo/vector-icons";
import {  useRouter } from "expo-router";
import KeyboardAvoidingViewWrapper from "../../../components/KeyboardAvoidingViewWrapper";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextInput from "../../../components/RHFTextInput";
import { useUserContext } from "../../../context/userContext/useUserContext";
import LoadingButton from "../../../components/LoadingButton";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("email is required"),
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useUserContext();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigation = useRouter();

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      await Auth.forgotPassword(values.email);
      dispatch({
        type: "SET_AUTHENTICATION_EMAIL",
        payload: {
          AuthenticationEmail: values.email,
        },
      });
      navigation.push("/auth/resetPassword");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert("Password forget error:", error);
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
          <View style={styles.forgetPasswordMainContainer}>
            <View style={styles.forgetContainer}>
              <Text style={styles.forgetText}>Forget Password ?</Text>
              <Text style={styles.detailText}>
                Enter Your Email To Change Your Password
              </Text>

              <View style={styles.emailInputContainer}>
                <RHFTextInput
                  style={styles.emailInput}
                  name="email"
                  control={control}
                  errors={errors}
                  placeholder="Email"
                />
                <View style={styles.mailIcon}>
                  <Ionicons
                    name={"mail-outline"}
                    size={16}
                    color="#000000"
                    style={{ opacity: 0.3 }}
                  />
                </View>
              </View>

              <LoadingButton onPress={handleSubmit(onSubmit)} isLoading={loading}>
                Continue
              </LoadingButton>
            </View>

          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingViewWrapper>
  );
};

export default SignIn;

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
    marginTop: hp(8),
    alignItems: "center",
  },
  logo: {
    width: wp(36),
    height: hp(18.5),
  },
  forgetContainer: {
    width: wp(88),
    height: hp(30),
    marginTop: hp(13),
    borderRadius: hp(2.5),
    backgroundBlurRadius: hp(2.5),

    paddingVertical: "10%",
    paddingHorizontal: "6%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "brightness(1.8) blur(2.5px)",
  },
  forgetPasswordMainContainer: {
    alignItems: "center",
  },
  forgetText: {
    color: "#0045BF",
    fontWeight: "600",
    fontSize: hp(3),
  },
  detailText: {
    color: "#707070",
    fontWeight: "600",
    fontSize: hp(1.7),
  },
  emailInputContainer: {
    paddingHorizontal: wp(1.5),
    marginTop:hp(2),
    justifyContent: "center",
  },
  emailInput: {
    width: "100%",
    height: hp(5),
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: hp(2),
  },
  mailIcon: {
    position: "absolute",
    right: 10,
    top: 7,
    zIndex: 99,
    height: hp(4),
    weight: wp(10),
  },
  forgetBtnContainer: {
    marginTop: hp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  forgetBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#378D00",
    width: "100%",
    height: hp(6),
    borderRadius: 50,
  },
  forgetText: {
    marginRight: 3,
    fontSize: hp(2.4),
  },
  vector: {
    position: "absolute",
    right: 10,
    top: 7,
    zIndex: 99,
    height: hp(4),
    weight: wp(10),
  },
  forgetTextBottomCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dontHaveAccountText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: hp(3.5),
  },
  signInLink: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: hp(3.5),
    marginLeft: hp(1),
  },
  forgetTextBottom: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
