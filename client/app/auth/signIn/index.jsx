import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { hp, wp } from "@utils";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import KeyboardAvoidingViewWrapper from "../../../components/KeyboardAvoidingViewWrapper";
import RHFPhoneInput from "../../../components/RHFPhoneInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextInput from "../../../components/RHFTextInput";
import { useUserContext } from "../../../context/userContext/useUserContext";
import { Auth, Hub } from "aws-amplify";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import LoadingButton from '@components/LoadingButton'
import AsyncStorage from "@react-native-async-storage/async-storage";
const SignIn = () => {
  const [isPhoneActive, setIsPhoneActive] = useState(true);
  const [isEmailActive, setIsEmailActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { mode, dispatch,login } = useUserContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    username: isEmailActive
      ? yup.string().email("Invalid email").required("email is required")
      : yup.string().required("phone number is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handlePhonePress = () => {
    setIsPhoneActive(!isPhoneActive);
    setIsEmailActive(false);
    clearErrors();
  };

  const handleEmailPress = () => {
    setIsEmailActive(!isEmailActive);
    setIsPhoneActive(false);
    clearErrors();
  };

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const user = await Auth.signIn(values?.username, values?.password);
      login(user?.attributes?.sub, setLoading);
      reset();
    } catch (error) {
      Alert.alert(error?.message);
      setLoading(false);
      reset();
    }
  };

  const registerUserSocial = async (data) => {
    setLoading(true);
    try {
      const registerResponse = await axios.post(
        "https://rsadmin.vercel.app/api/users/auth/register",
        data
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
            setLoading(false);
            router.push("/getStarted");
          }
        }
        if (mode == "driver") {
          setLoading(false);
          router.push("/auth/registerDriver");
        }
      }
    } catch (err) {
      setLoading(false);
      console.log(err);
      Alert.alert(err.message);
    }
  };

  const handleSocialLogin = async () => {
    try {
      const decodeUser = jwtDecode(token);

      const data = {
        name: decodeUser?.name || decodeUser?.middle_name || decodeUser?.given_name,
        email: decodeUser?.email,
        phoneNumber: decodeUser?.phone_number,
        cognitoUserName: decodeUser?.sub,
      };

      const userExit = await axios.post(
        "https://rsadmin.vercel.app/api/users/auth/check-user",
        {
          email:  decodeUser?.email,
        }
      );

      if (userExit.data.isExits) {
        setLoading(true);
        await login(decodeUser?.email, setLoading,true);
      } else {
        setLoading(true);
        await registerUserSocial(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          handleSocialLogin(data?.signInUserSession?.idToken?.jwtToken);
          break;
        case "signIn_failure":
          break;

        case "signOut":
          break;
        case "customOAuthState":
          setCustomState(data);
      }
    });

    return unsubscribe;
  }, []);

  const loginWithProvider = (provider) => Auth.federatedSignIn({ provider });

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
          <View style={styles.loginMainContainer}>
            <View style={styles.loginContainer}>
              <Text style={styles.signInText}>Sign In</Text>
              <Text style={styles.detailText}>
                Please provide the details below to sign in
              </Text>
              <View style={styles.btnsContainer}>
                <TouchableOpacity
                  style={[
                    isPhoneActive ? styles.phoneBtnActive : styles.phoneBtn,
                    styles.genBtn,
                  ]}
                  onPress={handlePhonePress}
                >
                  <Text
                    style={[
                      styles.phoneBtnText,
                      isPhoneActive && styles.activeBtnText,
                    ]}
                  >
                    Phone
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    isEmailActive ? styles.emailBtnActive : styles.emailBtn,
                    styles.genBtn,
                  ]}
                  onPress={handleEmailPress}
                >
                  <Text
                    style={[
                      styles.emailBtnText,
                      isEmailActive && styles.activeBtnText,
                    ]}
                  >
                    Email
                  </Text>
                </TouchableOpacity>
              </View>
              {isPhoneActive ? (
                <View style={styles.phoneInputContainer}>
                  <RHFPhoneInput
                    control={control}
                    errors={errors}
                    name="username"
                    placeholder="Mobile Number"
                  />
                </View>
              ) : (
                <View style={styles.emailInputContainer}>
                  <RHFTextInput
                    style={styles.emailInput}
                    name="username"
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
              )}
              <View style={styles.passwordInputContainer}>
                <RHFTextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showPassword}
                  placeholder="Enter Your Password"
                  name="password"
                  control={control}
                  errors={errors}
                />
                <Pressable
                  style={styles.vector}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Ionicons
                    name={!showPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#000000"
                    style={{ opacity: 0.3 }}
                  />
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  marginTop: 3,
                  paddingHorizontal: wp(2),
                }}
              >
                <TouchableOpacity
                  onPress={() => router.push("/auth/forgetPassword")}
                >
                  <Text style={{ fontSize: 12 }}>Forget Password ?</Text>
                </TouchableOpacity>
              </View>
              <LoadingButton
                onPress={handleSubmit(handleLogin)}
                isLoading={loading}
              >
                Login
              </LoadingButton>
              <View style={styles.otherOptionsContainer}>
                <Text style={styles.otherOptionsText}>OR</Text>
                <Text style={styles.otherOptionsText}>Sign in with</Text>
              </View>
              <View style={styles.socialMediaContainer}>
                <TouchableOpacity
                  onPress={() =>
                    loginWithProvider(CognitoHostedUIIdentityProvider.Google)
                  }
                >
                  <Image
                    style={styles.icons}
                    source={require("@assets/icons/google.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    loginWithProvider(CognitoHostedUIIdentityProvider.Facebook)
                  }
                >
                  <Image
                    style={styles.icons}
                    source={require("@assets/icons/facebook.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.signInTextBottomCon}>
              <Text style={styles.dontHaveAccountText}>
                I don't have an account?
              </Text>
              <Text style={styles.signUplink}>
                <Link href="/auth/signUp" style={styles.signInTextBottom}>
                  Sign Up
                </Link>
              </Text>
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
  icons: {
    width: wp(6),
    height: hp(3),
  },
  loginContainer: {
    width: wp(88),
    height: hp(58.7),
    marginTop: hp(3.14),
    borderRadius: hp(2.5),
    backgroundBlurRadius: hp(2.5),
    paddingVertical: "10%",
    paddingHorizontal: "6%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "brightness(1.8) blur(2.5px)",
  },
  loginMainContainer: {
    alignItems: "center",
  },
  signInText: {
    color: "#0045BF",
    fontWeight: "600",
    fontSize: hp(3),
  },
  detailText: {
    color: "#707070",
    fontWeight: "600",
    fontSize: hp(1.7),
  },
  btnsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  genBtn: {
    width: "50%",
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: hp(3),
  },
  phoneBtn: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: hp(0.7),
    borderBottomLeftRadius: hp(0.7),
  },
  emailBtn: {
    backgroundColor: "#FFFFFF",
    borderTopRightRadius: hp(0.7),
    borderBottomRightRadius: hp(0.7),
  },
  emailBtnActive: {
    marginVertical: hp(3),
    backgroundColor: "#1F1F1F",
    width: wp(30),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: hp(0.7),
    borderBottomRightRadius: hp(0.7),
  },
  phoneBtnActive: {
    marginVertical: hp(3),
    backgroundColor: "#1F1F1F",
    width: wp(30),
    height: hp(5),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: hp(0.7),
    borderBottomLeftRadius: hp(0.7),
  },
  phoneBtnText: {
    color: "#000000",
  },
  emailInputContainer: {
    marginBottom: hp(2),
    paddingHorizontal: wp(2),
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
  emailBtnText: {
    color: "#000000",
  },
  activeBtnText: {
    color: "#FFFFFF",
  },
  phoneInputContainer: {
    justifyContent: "center",
    marginBottom: hp(4),
    marginHorizontal: wp(4),
  },
  passwordInputContainer: {
    paddingHorizontal: wp(2),
    justifyContent: "center",
  },
  passwordInput: {
    width: "100%",
    height: hp(5),
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: hp(2),
  },
  otherOptionsContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(1.6),
  },
  otherOptionsText: {
    fontSize: 10,
    color: "#FFFFFF",
  },
  socialMediaContainer: {
    marginTop: hp(1.6),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: wp(5),
  },
  dontHaveAccountText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: hp(3.5),
  },
  signUplink: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: hp(3.5),
    marginLeft: hp(1),
  },
  signInTextBottom: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  vector: {
    position: "absolute",
    right: 10,
    top: 7,
    zIndex: 99,
    height: hp(4),
    weight: wp(10),
  },
  signInTextBottomCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
