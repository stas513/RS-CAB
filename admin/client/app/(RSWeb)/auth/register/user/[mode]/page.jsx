"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/app/(RSWeb)/context/hooks";
import axios from "axios";
import { useSnackbar } from "notistack";
import Alert from "@/app/(RSWeb)/common/alert/Alert";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import Link from "next/link";
import RHFTextField from "@/app/(RSWeb)/common/rhf/RHFTextField";
import { createHmac } from "crypto";
import AWS, { CognitoIdentityServiceProvider } from "aws-sdk";
import jwtDecode from "jwt-decode";
import "react-phone-input-2/lib/style.css";
import Loader from "@/app/(RSWeb)/common/loader/Loader";
import RHFPasswordField from "@/app/(RSWeb)/common/rhf/RHFPasswordField";
import SocialButton from "@/app/(RSWeb)/common/social-button/SocialButton";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
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
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const SignUpUser = ({ params }) => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const { replace } = useRouter();
  const { data } = useSession();
  const [providers, setProviders] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (data?.user?.email) {
      signOut();
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    getProviders()
      .then((providers) => {
        setProviders(providers);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    if (data) {
      const { name, email, phoneNumber } = data.user || {};
      const { accessToken } = data;

      const decodeToken = jwtDecode(accessToken);

      console.log(data.user,"userToken",decodeToken)
      axios
        .post("/api/users/auth/register", {
          name,
          email,
          phoneNumber,
          cognitoUserName: decodeToken?.sub,
        })
        .then((response) => {
          if (response.status == 201) {
            enqueueSnackbar("user created successfully");
            const decodedUser = jwtDecode(response.data.token);
            dispatch({
              type: "setUser",
              payload: { user: { ...decodedUser, mode: params.mode } },
            });

            if (params.mode == "passenger") {
              const passengerFormData = new FormData();
              passengerFormData.append("userId", decodedUser.id);
              axios
                .post("/api/users/passenger", passengerFormData)
                .then((response) => {
                  if (response.status === 201) {
                    dispatch({
                      type: "setPassengerInUser",
                      payload: {
                        passenger: response.data,
                      },
                    });
                    dispatch({
                      type: "setMode",
                      payload: {
                        mode: "passenger",
                      },
                    });
                    replace(`/client/${decodedUser.id}`);
                  }
                })
                .catch((err) => {
                  setErrorMsg(err?.response?.data?.message);

                  signOut();
                });
            }

            if (params.mode == "driver") {
              replace("/auth/register/driver");
            }
          }
        })
        .catch((err) => {
          enqueueSnackbar(err?.response?.data?.message, { variant: "error" });
          console.log(err);
        });
    }
  }, [data?.user?.email]);

  const onSubmit = async (data) => {
    delete data.confirmPassword;
    setIsSubmiting(true);

    try {
      AWS.config.update({
        region: process.env.NEXT_PUBLIC_COGNITO_REGION,
        secretAccessKey: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
        credentials: new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
        }),
      });
      const cognito = new CognitoIdentityServiceProvider();
      const hasher = createHmac(
        "sha256",
        process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET
      );
      hasher.update(
        `${data.email}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`
      );
      const secretHash = hasher.digest("base64");

      const registerUser = await cognito
        .signUp({
          ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
          Username: data.email,
          Password: data.password,
          SecretHash: secretHash,
          UserAttributes: [
            {
              Name: "phone_number",
              Value: `+${data.phoneNumber}`,
            },
          ],
        })
        .promise();

        console.log(registerUser)
      dispatch({
        type: "setAuthenticateUser",
        payload: {
          authenticateUser: { ...data, cognitoUserName: registerUser.UserSub },
        },
      });
      enqueueSnackbar("We send it otp");
      replace(`/auth/verify-code/${params?.mode}`);
      setIsSubmiting(false);
    } catch (err) {
      console.log(err);
      setIsSubmiting(false);

      setErrorMsg(err.message);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="max-w-container mx-auto">
          <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center">
            <div className="max-w-subcontainer h-full mx-auto">
              <div className="max-w-[693px] mx-auto mt-5 bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
                <div className="grid place-items-center gap-5">
                  {!!errorMsg && <Alert type="error" alertMessage={errorMsg} />}

                  <p className=" text-green mb-5 text-4xl font-semibold font-poppins">
                    Sign up
                  </p>

                  <SocialButton
                    social="Google"
                    imgSrc="/webAssets/images/signup/Group879.png"
                    bgColor="bg-sky-500 hover:bg-sky-600"
                    onClick={() => signIn(providers["cognito_google"].id)}
                  />
                  <SocialButton
                    social="Facebook"
                    imgSrc="/webAssets/images/signup/Group878.png"
                    bgColor="bg-sky-700 hover:bg-sky-800"
                    onClick={() => signIn(providers["cognito_facebook"].id)}
                  />

                  <div className="flex items-center w-3/4">
                    <div className="flex-grow border border-green"></div>
                    <div className="mx-4 text-white font-poppins">OR</div>
                    <div className="flex-grow border border-green"></div>
                  </div>

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col items-center gap-4"
                  >
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white  font-semibold">
                        Your First Name
                      </label>
                      <RHFTextField
                        type="text"
                        name="firstName"
                        errors={errors}
                        placeholder="Your First Name"
                        control={control}
                      />
                    </div>
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white  font-semibold">
                        Your Last Name
                      </label>
                      <RHFTextField
                        type="text"
                        name="lastName"
                        errors={errors}
                        placeholder="Your Last Name"
                        control={control}
                      />
                    </div>
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white  font-semibold">
                        Your Email Address
                      </label>
                      <RHFTextField
                        type="email"
                        name="email"
                        errors={errors}
                        placeholder="Your Email Address"
                        control={control}
                      />
                    </div>
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white  font-semibold">
                        Your Phone Number
                      </label>
                      <Controller
                        name="phoneNumber"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <PhoneInput
                            country={"us"}
                            {...field}
                            onChange={(value) => field.onChange(value)}
                            placeholder="Your Phone Number"
                            inputClass="!relative !outline-none !border-none !px-4 py-5 !ps-24 !rounded-small !h-full !w-full"
                            buttonClass="!absolute !top-0 !bottom-0 !left-0 !w-[80px] !grid !place-content-center !rounded-tl-small !rounded-bl-small"
                          />
                        )}
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs font-poppins">
                          {errors["phoneNumber"].message}
                        </p>
                      )}
                    </div>
                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white  font-semibold">
                        Enter Your Password
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
                      <label className="text-white  font-semibold">
                        Confirm Your Password
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
                    <LoadingButton
                      color="bg-green"
                      handleSubmit={handleSubmit(onSubmit)}
                      text="Sign up"
                      loading={isSubmiting}
                    />
                  </form>

                  <div className="w-full flex flex-col items-center gap-4">
                    <p className="text-center font-poppins text-white">
                      Already have an account?{" "}
                      <Link
                        href={`/auth/login?mode=${params?.mode}`}
                        className="font-semibold text-sky-500"
                      >
                        Sign In
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpUser;
