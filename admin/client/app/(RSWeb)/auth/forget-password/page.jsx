"use client";
import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import LoadingButton from "../../common/loading-button/LoadingButton";
import Alert from "../../common/alert/Alert";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../../common/rhf/RHFTextField";
import AWS from "aws-sdk";
import { createHmac } from "crypto";
import { useAuthContext } from "../../context/hooks";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),

});

const ForgetPassword = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { dispatch } = useAuthContext()
  const { replace } = useRouter();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();



  const onSubmit = async (data) => {
    setIsSubmiting(true);
    try {
      AWS.config.update({ region: process.env.NEXT_PUBLIC_COGNITO_REGION });
      const cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();


      const hasher = createHmac(
        "sha256",
        process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET
      );

      hasher.update(`${data.email}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`);
      const secretHash = hasher.digest("base64");

      const paramsForgetPassword = {
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        Username: data.email,
        SecretHash: secretHash,

      };

      await cognitoidentityserviceprovider.forgotPassword(paramsForgetPassword).promise();

      dispatch({
        type: "setForgetPasswordEmail",
        payload: {
          forgetPasswordEmail: data.email
        }
      })
      reset()
      setIsSubmiting(false)
      enqueueSnackbar("Conformation code send it to your mail")
      replace('/auth/reset-password')

    }
    catch (err) {
      console.log(err)
      setErrorMsg(err.message)
      setIsSubmiting(false)

    }
  };


  return (
    <>
      <div

        className="max-w-container mx-auto"
      >

        <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center">
          <div className="max-w-subcontainer h-full mx-auto">
            <div className="max-w-[693px] mx-auto mt-5 bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
              <div className="grid place-items-center gap-5">
                {!!errorMsg && <Alert type="error" alertMessage={errorMsg} />}
                <p className=" text-green font-poppins mb-5 text-4xl font-semibold ">
                  Forget Password
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-4">
                  <div className="md:w-3/4 w-full space-y-1">
                    <label className="text-white font-poppins font-semibold">
                      Email
                    </label>
                    <RHFTextField
                      type="email"
                      name="email"
                      errors={errors}
                      placeholder="Email Address"
                      control={control}
                    />
                  </div>

                  <LoadingButton
                    color="bg-green"
                    handleSubmit={handleSubmit(onSubmit)}
                    text="Proceed"
                    loading={isSubmiting}
                  />
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;