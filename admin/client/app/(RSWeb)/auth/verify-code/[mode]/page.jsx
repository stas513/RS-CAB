"use client";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useAuthContext } from "@/app/(RSWeb)/context/hooks";
import Alert from "@/app/(RSWeb)/common/alert/Alert";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "@/app/(RSWeb)/common/rhf/RHFTextField";
import { createHmac } from "crypto";
import AWS from "aws-sdk";
import {
  ResendConfirmationCodeCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";
import jwtDecode from "jwt-decode";

const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "Must be exactly 6 digits"),
});

const VerifyCode = ({ params }) => {
  const [loading, setLoading] = useState(false);
  const { replace } = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { dispatch, authenticateUser, user } = useAuthContext();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const hasher = createHmac(
    "sha256",
    process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET
  );
  hasher.update(
    `${authenticateUser?.email}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`
  );
  const secretHash = hasher.digest("base64");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      AWS.config.update({ region: process.env.NEXT_PUBLIC_COGNITO_REGION });
      const cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();

      const paramsConfirm = {
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        Username: authenticateUser?.email,
        ConfirmationCode: data.otp,
        SecretHash: secretHash,
      };

       await cognitoidentityserviceprovider
        .confirmSignUp(paramsConfirm)
        .promise();

      const userData = {
        name: `${authenticateUser?.firstName || ""} ${authenticateUser?.lastName || ""
          }`,
        email: authenticateUser?.email,
        phoneNumber: authenticateUser?.phoneNumber,
        cognitoUserName: authenticateUser?.cognitoUserName,
      };
      const registerResponse = await axios.post(
        "/api/users/auth/register",
        userData
      );

      if (registerResponse.status === 201) {
        const decodedUser = jwtDecode(registerResponse.data.token);
        dispatch({ type: "setUser", payload: { user: { ...decodedUser, mode: params.mode } } });

        if (params.mode == "passenger") {
          const passengerFormData = new FormData()
          passengerFormData.append('userId', decodedUser.id)

          const passengerResponse = await axios.post("/api/users/passenger", passengerFormData)
          if (passengerResponse.status == 201) {
            dispatch({
              type: "setPassengerInUser",
              payload: {
                passenger: passengerResponse.data,
              },
            });
            dispatch({
              type: "setMode",
              payload: {
                mode: 'passenger'
              }
            })
            replace("/booking")
          }
        }
        if (params.mode == "driver") {
          replace("/auth/register/driver");
        }
      }

      setErrorMsg("");
      enqueueSnackbar("User Created Successfully");
      setLoading(false);
    } catch (err) {
      console.log(err);
      setErrorMsg(err?.message);
      if (err?.response?.data?.message) {
        setErrorMsg(err?.response?.data?.message);
      }
      setLoading(false);
    }
  };

  const config = {
    // ResendConfirmationCodeRequest
    ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID, // required
    SecretHash: secretHash,
    Username: authenticateUser?.email, // required
  };

  const resendConfirmationCode = async () => {
    const client = new CognitoIdentityProviderClient({
      region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    });
    const command = new ResendConfirmationCodeCommand(config);
    client
      .send(command)
      .then(() => {
        enqueueSnackbar("New OTP sent!");
      })
      .catch((err) => {
        enqueueSnackbar(err.message, { variant: "error" });
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-container mx-auto"
      >
        <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center">
          <div className="max-w-subcontainer h-full mx-auto">
            <div className="max-w-[693px] mx-auto mt-5 bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
              <div className="grid place-items-center gap-5">
                {!!errorMsg && <Alert type="error" alertMessage={errorMsg} />}

                <div className="w-full flex flex-col items-center gap-4">
                  <p className="font-poppins text-green mb-5 text-4xl font-semibold ">
                    Verify Your Email
                  </p>
                  <div className="md:w-3/4 w-full space-y-1">
                    <label className="text-white  font-semibold">
                      Verification Code
                    </label>
                    <RHFTextField
                      type="number"
                      name="otp"
                      errors={errors}
                      placeholder="Enter Verifciation Code"
                      control={control}
                    />
                  </div>

                  <p style={{ color: "white" }}>
                    Did not get verification code?{" "}
                    <input
                      className="text-white cursor-pointer"
                      type="button"
                      value="resend"
                      onClick={resendConfirmationCode}
                    />
                  </p>

                  <LoadingButton
                    color="bg-green"
                    handleSubmit={handleSubmit(onSubmit)}
                    text="Verify Code"
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default VerifyCode;
