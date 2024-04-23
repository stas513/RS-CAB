import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "@utils";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import KeyboardAvoidingViewWrapper from "../../../components/KeyboardAvoidingViewWrapper";
import { Auth } from "aws-amplify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextInput from "../../../components/RHFTextInput";
import { useUserContext } from "../../../context/userContext/useUserContext";
import OtpInput from "../../../components/OtpInput";
import LoadingButton from "../../../components/LoadingButton";

const schema = yup.object().shape({
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
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { AuthenticationEmail } = useUserContext();
  const [otpCode, setOtpCode] = useState([0, 0, 0, 0, 0, 0]);


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
    const otpString = otpCode.join('');
    try {
      await Auth.forgotPasswordSubmit(
        AuthenticationEmail,
        otpString,
        values.password
      );
      setLoading(false);
      Alert.alert("Password reset successful");
      navigation.push(`/auth/signIn`)
    } catch (error) {
      setLoading(false);
      console.error("Password reset error:", error);
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
          <View style={styles.resetPasswordMainContainer}>
            <View style={styles.resetContainer}>
              <Text style={styles.resetText}>Create New Password</Text>
              <Text style={styles.detailText}>
                we send you a verification code
              </Text>
              <View style={{justifyContent:'center',flexDirection:"row"}}>

              <OtpInput otpCode={otpCode} setOtpCode={setOtpCode} />
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
              <View style={styles.passwordInputContainer}>
                <RHFTextInput
                  style={styles.passwordInput}
                  secureTextEntry={!showConfirmPassword}
                  placeholder="Confirm Your Password"
                  name="confirmPassword"
                  control={control}
                  errors={errors}
                />
                <Pressable
                  style={styles.vector}
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Ionicons
                    name={!showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#000000"
                    style={{ opacity: 0.3 }}
                  />
                </Pressable>
              </View>
              <LoadingButton onPress={handleSubmit(onSubmit)} isLoading={loading}>
              Reset Password
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
  resetContainer: {
    width: wp(88),
    height: hp(56.7),
    marginTop: hp(3.14),
    borderRadius: hp(2.5),
    backgroundBlurRadius: hp(2.5),
    paddingVertical: "10%",
    paddingHorizontal: "6%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "brightness(1.8) blur(2.5px)",
  },
  resetPasswordMainContainer: {
    alignItems: "center",
  },
  resetText: {
    color: "#0045BF",
    fontWeight: "600",
    fontSize: hp(3),
  },
  detailText: {
    color: "#707070",
    fontWeight: "600",
    fontSize: hp(1.7),
  },
  passwordInputContainer: {
    paddingHorizontal: wp(1.5),
    marginVertical:hp(1),
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
  resetBtnContainer: {
    marginTop: hp(3),
    justifyContent: "center",
    alignItems: "center",
  },
  resetBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#378D00",
    width: "100%",
    height: hp(6),
    borderRadius: 50,
  },
  resetText: {
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
  resetTextBottomCon: {
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
  resetTextBottom: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
});
