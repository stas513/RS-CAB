import {
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { hp, wp } from "@utils";
import { useRouter } from "expo-router";
import KeyboardAvoidingViewWrapper from "../../../components/KeyboardAvoidingViewWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextInput from "../../../components/RHFTextInput";
import { useUserContext } from "../../../context/userContext/useUserContext";
import LoadingButton from "../../../components/LoadingButton";
import RHFDateTimePicker from "../../../components/RHFDateTImePicker";
import axiosInstance from "../../../utils/axios";
import * as DocumentPicker from "expo-document-picker";

import { useCallback } from "react";
import axios from "axios";

const schema = yup.object().shape({
  nationalInsuranceNumber: yup
    .number()
    .required("National Insurance Number is required"),
  selfAssesmentTaxId: yup
    .number()
    .required("Self Assessment Tax Id is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  bio: yup.string(),
  hobby: yup.string(),
});

const registerDriver = () => {
  const { user, dispatch } = useUserContext();
  const [loading, setLoading] = useState(false);
  const [fileResponse, setFileResponse] = useState(false);

  const handleImageSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.getDocumentAsync({
        multiple: false,
        copyToCacheDirectory: true,
        type: "image/*",
      });
      console.log(response)
      setFileResponse(response);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (let i in data) {
        if (i == "dateOfBirth") {
          formData.append(i, data[i]?.toISOString());
        } else {
          formData.append(i, data[i]);
        }
      }

      // formData.append("profileImage",{
      //   uri : fileResponse?.assets[0].uri,
      //   type: "image",
      //   name: fileResponse?.assets[0]?.uri.split("/").pop()
      //  }, );

      formData.append("userId", user?.id);

      const response = await axios({
        method: "post",
        url: "https://rsadmin.vercel.app/api/users/driver/",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status == 201) {
        setLoading(false);
        Alert.alert("profile create successfully");
        console.log(response.data, "register driver response");

        dispatch({
          type: "setDriverInUser",
          payload: {
            driver: response.data,
          },
        });

        dispatch({
          type: "SET_ISAUTHENTICATED_USER",
          payload: {
            isAuthenticated: true,
          },
        });

        reset();
        return router.push(`/drivers/driverOffline`);
      }
    } catch (err) {
      console.log("err", err);
      Alert.alert(err?.message);
      setLoading(false);
      reset();
    }
  };

  return (
    <KeyboardAvoidingViewWrapper>
      <SafeAreaView style={styles.mainContainer}>
        <ImageBackground
          style={styles.image}
          source={require("@assets/images/authenticationBgImages/authBg.png")}
        >
          <View style={styles.formContainer}>
            <View style={styles.container}>
              <Text style={styles.registerDriverText}>Driver Info</Text>
              <Text style={styles.detailText}>
                Please provide the details below to create a driver profile
              </Text>

              <View style={styles.inputContainer}>
                <RHFTextInput
                  style={styles.input}
                  name="nationalInsuranceNumber"
                  control={control}
                  errors={errors}
                  placeholder="National Insurence Number."
                />
              </View>
              <View style={styles.inputContainer}>
                <RHFTextInput
                  style={styles.input}
                  name="selfAssesmentTaxId"
                  control={control}
                  errors={errors}
                  placeholder="Self Assesment Tax Id."
                />
              </View>
              <View style={styles.inputContainer}>
                <RHFDateTimePicker
                  style={styles.input}
                  name="dateOfBirth"
                  control={control}
                  errors={errors}
                  placeholder="Date Of Birth"
                />
              </View>
              <View style={styles.inputContainer}>
                <RHFTextInput
                  style={styles.input}
                  name="bio"
                  control={control}
                  errors={errors}
                  placeholder="bio"
                />
              </View>
              <View style={styles.inputContainer}>
                <RHFTextInput
                  style={styles.input}
                  name="hobby"
                  control={control}
                  errors={errors}
                  placeholder="hobby"
                />
              </View>
              <View style={styles.inputContainer}>
                <TouchableOpacity
                  style={styles.uploadButton}
                  onPress={handleImageSelection}
                >
                  <Text>
                    {fileResponse
                      ? fileResponse?.assets[0]?.name
                      : "Upload Profile Image"}
                  </Text>
                </TouchableOpacity>
              </View>
              <LoadingButton
                onPress={handleSubmit(onSubmit)}
                isLoading={loading}
              >
                Register Driver
              </LoadingButton>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAvoidingViewWrapper>
  );
};

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
  container: {
    width: wp(88),
    height: hp(70),
    marginTop: hp(9.14),
    borderRadius: hp(2.5),
    backgroundBlurRadius: hp(2.5),
    paddingVertical: "10%",
    paddingHorizontal: "6%",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "brightness(1.8) blur(2.5px)",
  },
  formContainer: {
    alignItems: "center",
    marginTop: hp(4),
  },
  registerDriverText: {
    color: "#0045BF",
    fontWeight: "600",
    fontSize: hp(3),
  },
  detailText: {
    color: "#707070",
    fontWeight: "600",
    fontSize: hp(1.7),
    marginBottom: hp(2),
  },
  inputContainer: {
    marginBottom: hp(2),
    paddingHorizontal: wp(2),
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: hp(5),
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 15,
    fontSize: hp(2),
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "white",
    paddingVertical: wp(2),
  },
});

export default registerDriver;
