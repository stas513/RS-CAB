import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import PhoneInput from "@components/PhoneInput";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { hp, wp } from "@utils";
import KeyboardAvoidingViewWrapoer from "../../../components/KeyboardAvoidingViewWrapper";
import { Auth, Hub } from "aws-amplify";
import { useUserContext } from "../../../context/userContext/useUserContext";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
import RHFTextInput from "../../../components/RHFTextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFPhoneInput from "../../../components/RHFPhoneInput";
import LoadingButton from "../../../components/LoadingButton";
import { withOAuth } from 'aws-amplify-react-native';
const schema = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phoneNumber: yup.string().required("Phone number is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    )
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .min(8, "Password must be at least 8 characters long"),
});

export default withOAuth(({oAuthUser,authState,oAuthError}) => {

  const [showPassword, setShowPassword] = useState(false);
  const { dispatch } = useUserContext();
  const [loading, setLoading] = useState(null);

  const router = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    const { email, password, phoneNumber } = values || {};
    setLoading(true);
    try {
      const user = await Auth.signUp({
        username: email,
        password,
        attributes: {
          phone_number: phoneNumber,
        },
        options:{
          pluginOptions:{
            authFlowType:"ALLOW_REFRESH_TOKEN_AUTH"
          }
        }
      });

      dispatch({
        type: "SET_AUTHENTICATION_EMAIL",
        payload: {
          AuthenticationEmail: email,
        },
      });

      dispatch({
        type: "SET_AUTHENTICATION_USER",
        payload: {
          AuthenticationUser: {...values,cognitoUserName:user?.userSub},
        },
      });
      setLoading(false);
      reset()
      router.push(`/auth/otpVerification/signup`);
    } catch (error) {
      Alert.alert(error.message);
      reset()
      setLoading(false);
    }
  };

  if (authState === "loading" || authState === "verifyContact"){
    return (<ActivityIndicator color={'#000000'} />)
  }
  const loginWithProvider = (provider) => Auth.federatedSignIn({provider})

  return (
    <KeyboardAvoidingViewWrapoer>
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
          <View style={styles.signMainContainer}>
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>Sign Up</Text>
              <View style={styles.nameInputContainer}>
                <RHFTextInput
                  style={styles.nameInput}
                  name="name"
                  control={control}
                  errors={errors}
                  placeholder="Name"
                />
                <View style={styles.personIcon}>
                  <Ionicons
                    name={"person-outline"}
                    size={16}
                    color="#000000"
                    style={{ opacity: 0.3 }}
                  />
                </View>
              </View>
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
              <View style={styles.phoneInputContainer}>
                <RHFPhoneInput
                  control={control}
                  errors={errors}
                  name="phoneNumber"
                  placeholder="Mobile Number"
                />
              </View>
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
              <LoadingButton
                onPress={handleSubmit(onSubmit)}
                isLoading={loading}
              >
                Sign Up
              </LoadingButton>
              <View style={styles.otherOptionsContainer}>
                <Text style={styles.otherOptionsText}>OR</Text>
                <Text style={styles.otherOptionsText}>Sign up with</Text>
              </View>
              <View style={styles.socialMediaContainer}>
                <TouchableOpacity onPress={() => loginWithProvider(CognitoHostedUIIdentityProvider.Google)}>
                  <Image
                    style={styles.icons}
                    source={require("@assets/icons/google.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => loginWithProvider(CognitoHostedUIIdentityProvider.Facebook)}
                >
                  <Image
                    style={styles.icons}
                    source={require("@assets/icons/facebook.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.signInTextBottomCon}>
            <Text style={styles.dontHaveAccountText}>
              Already have an account?{" "}
            </Text>
            <Text style={styles.signUplink}>
              <Link href="/auth/signIn" style={styles.signInTextBottom}>
                Sign In
              </Link>
            </Text>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingViewWrapoer>
  );
});


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
    marginTop: hp(4),
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
  signUpContainer: {
    width: wp(88),
    height: hp(60),
    marginTop: hp(3.14),
    borderRadius: hp(2.5),
    backgroundBlurRadius: hp(2.5),
    padding: "10%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "brightness(1.8) blur(2.5px)",
  },
  signMainContainer: {
    alignItems: "center",
  },
  signUpText: {
    color: "#0045BF",
    fontWeight: "600",
    fontSize: hp(3),
  },
  detailText: {
    color: "#707070",
    fontWeight: "600",
    fontSize: 9,
  },
  phoneBtnText: {
    color: "#000000",
  },
  emailBtnText: {
    color: "#000000",
  },
  activeBtnText: {
    color: "#FFFFFF",
  },
  nameInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
  },
  emailInputContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: hp(2),
  },
  nameInput: {
    width: wp(72),
    height: hp(5),
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: hp(2),
  },
  emailInput: {
    width: wp(72),
    height: hp(5),
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: hp(2),
  },
  phoneInputContainer: {
    justifyContent: "center",
    marginVertical: hp(2),
  },
  passwordInputContainer: {
    alignItems: "center",
    marginTop: hp(4),
  },
  passwordInput: {
    width: wp(72),
    height: hp(5),
    marginTop: hp(-2),
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: hp(2),
  },
  signUpBtnContainer: {
    marginTop: hp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  signBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#378D00",
    width: wp(72),
    height: hp(6),
    borderRadius: 50,
  },
  loginText: {
    marginRight: 3,
    fontSize: hp(2.4),
  },
  arrowIcon: {
    color: "#1F1F1F",
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

  vector: {
    position: "absolute",
    right: 1,
    top: -8,
    zIndex: 99,
    height: hp(4),
    weight: wp(10),
  },
  mailIcon: {
    position: "absolute",
    right: 1,
    top: 9,
    zIndex: 99,
    height: hp(4),
    weight: wp(10),
  },
  personIcon: {
    position: "absolute",
    right: 1,
    top: 9,
    zIndex: 99,
    height: hp(4),
    weight: wp(10),
  },

  signInTextBottomCon: {
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
});
