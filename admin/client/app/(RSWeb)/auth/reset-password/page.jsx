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
import Loader from "../../common/loader/Loader";
import { createHmac } from "crypto";
import { useAuthContext } from "../../context/hooks";
import RHFPasswordField from "../../common/rhf/RHFPasswordField";
import { useRouter } from "next/navigation";

const schema = yup.object().shape({
  code: yup
    .string()
    .required("OTP is required")
    .matches(/^[0-9]{6}$/, "Must be exactly 6 digits"),
  password: yup.string()
    .required("Password is required")
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .min(8, 'Password must be at least 8 characters long'),
  confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),

});

const ResetPassword = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState("")
  const [showConfirmPassword, setShowConfirmPassword] = useState("")
  const { forgetPasswordEmail } = useAuthContext()

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();
  const { replace } = useRouter();



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

      hasher.update(`${forgetPasswordEmail}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`);
      const secretHash = hasher.digest("base64");
      const paramsForgetPassword = {
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        Username: forgetPasswordEmail,
        SecretHash: secretHash,
        ConfirmationCode: data.code,
        Password: data.password,
      };

      await cognitoidentityserviceprovider.confirmForgotPassword(paramsForgetPassword).promise()

      setIsSubmiting(false)
      setErrorMsg("")
      enqueueSnackbar('password change successfully')
      replace("/auth/login?mode=passenger")
    }
    catch (err) {
      console.log(err)
      setErrorMsg(err.message)
      setIsSubmiting(false)
    }
  };

  const handleResendOtp = async () => {
    setIsSubmiting(true);
    try {
      AWS.config.update({ region: process.env.NEXT_PUBLIC_COGNITO_REGION });
      const cognitoidentityserviceprovider =
        new AWS.CognitoIdentityServiceProvider();


      const hasher = createHmac(
        "sha256",
        process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET
      );

      hasher.update(`${forgetPasswordEmail}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`);
      const secretHash = hasher.digest("base64");

      const paramsForgetPassword = {
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        Username: forgetPasswordEmail,
        SecretHash: secretHash,

      };

      await cognitoidentityserviceprovider.forgotPassword(paramsForgetPassword).promise();
      setIsSubmiting(false)
      enqueueSnackbar("Confirmation code Resend it to your mail")

    }
    catch (err) {
      console.log(err)
      setErrorMsg(err.message)
      setIsSubmiting(false)

    }
  };


  return (
    <>
      {
        <div

          className="max-w-container mx-auto"
        >

          <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center">
            <div className="max-w-subcontainer h-full mx-auto">
              <div className="max-w-[693px] mx-auto mt-5 bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
                <div className="grid place-items-center gap-5">
                  {!!errorMsg && <Alert type="error" alertMessage={errorMsg} />}
                  <p className=" text-green font-poppins mb-5 text-4xl font-semibold ">
                    Reset Password
                  </p>
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col items-center gap-4">
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white font-poppins font-semibold">
                        Verification code
                      </label>
                      <RHFTextField
                        type="number"
                        name="code"
                        errors={errors}
                        placeholder="Enter Verifciation Code"
                        control={control}
                      />
                    </div>
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white font-poppins font-semibold">
                        New Password
                      </label>
                      <RHFPasswordField
                        name="password"
                        errors={errors}
                        placeholder="Enter Your Password"
                        control={control}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                    </div>
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white font-poppins font-semibold">
                        Confirm Password
                      </label>
                      <RHFPasswordField
                        name="confirmPassword"
                        errors={errors}
                        placeholder="Confirm Your Password"
                        control={control}
                        showPassword={showConfirmPassword}
                        setShowPassword={setShowConfirmPassword}
                      />
                    </div>
                    <p style={{ color: "white" }}>Did not get verification code?  <input className="text-white cursor-pointer" type="button" value="resend" onClick={handleResendOtp} /></p>

                    <LoadingButton
                      color="bg-green"
                      handleSubmit={handleSubmit(onSubmit)}
                      text="Submit"
                      loading={isSubmiting}
                    />
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  );
};

export default ResetPassword;
