"use client";
import React, { useState, useEffect } from "react";
import "react-phone-input-2/lib/style.css";
import Image from "next/image";
import axios from "axios";
import LoadingButton from "../../common/loading-button/LoadingButton";
import Link from "next/link";
import Alert from "../../common/alert/Alert";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import RHFTextField from "../../common/rhf/RHFTextField";
import { useAuthContext } from "../../context/hooks";
import AWS from "aws-sdk";
import { createHmac } from "crypto";
import { getProviders, useSession, signIn, signOut } from "next-auth/react";
import jwtDecode from "jwt-decode";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Loader from "../../common/loader/Loader";
import RHFPasswordField from "../../common/rhf/RHFPasswordField";
import SocialButton from "../../common/social-button/SocialButton";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const Login = () => {
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mode, setMode] = useState(null);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { enqueueSnackbar } = useSnackbar();
  const { data } = useSession();
  const [providers, setProviders] = useState(null);
  const { dispatch, user } = useAuthContext();
  const { replace, push } = useRouter();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);

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
    const search = searchParams.get("mode");
    setMode(search);

    if (data) {
      setIsSubmiting(true);
      const { email } = data.user;

      axios
        .post(`/api/users/info/email`, { email })
        .then((response) => {
          const decodedUser = jwtDecode(response?.data?.token);
          dispatch({ type: "setUser", payload: { user: { ...decodedUser } } });

          setIsSubmiting(false);
          console.log(mode);
          if (mode == "driver") {
            if (!decodedUser.driver) {
              console.log("triggred");
              enqueueSnackbar("Driver Doesn't Exits", { variant: "error" });
            } else {
              dispatch({ type: "setMode", payload: { mode: "driver" } });
              enqueueSnackbar("Login Successfully");
              replace(`/driver/${decodedUser.id}`);
            }
          }

          if (mode == "passenger") {
            if (!decodedUser.passenger) {
              enqueueSnackbar("Passenger Doesn't Exits", { variant: "error" });
            } else {
              dispatch({ type: "setMode", payload: { mode: "passenger" } });
              enqueueSnackbar("Login Successfully");
              replace(`/client/${decodedUser.id}`);
            }
          }
        })
        .catch((err) => {
          console.log(err);
          setErrorMsg(err?.response?.data?.message);
          setIsSubmiting(false);
        });
    }
  }, [data?.user?.email]);

  console.log('providers:',providers)

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
      hasher.update(
        `${data.email}${process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID}`
      );
      const secretHash = hasher.digest("base64");
      const params = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: data.email,
          PASSWORD: data.password,
          SECRET_HASH: secretHash,
        },
      };

      const loginResponse = await cognitoidentityserviceprovider
        .initiateAuth(params)
        .promise();

      //  console.log(loginResponse,"loginResponse")
      const decodeLoginInfo = jwtDecode(
        loginResponse?.AuthenticationResult?.AccessToken
      );

      const userInfoResponse = await axios.post(`/api/users/info`, {
        cognitoUserName: decodeLoginInfo?.sub,
      });
      const decodedUser = jwtDecode(userInfoResponse?.data.token);

      if (mode == "driver") {
        if (!decodedUser.driver) {
          console.log("triggred");
          enqueueSnackbar("Driver Doesn't Exits", { variant: "error" });
        } else {
          dispatch({ type: "setUser", payload: { user: { ...decodedUser } } });
          dispatch({ type: "setMode", payload: { mode: "driver" } });
          enqueueSnackbar("Login Successfully");
          replace(`/driver/${decodedUser.id}`);
        }
      }

      if (mode == "passenger") {
        if (!decodedUser.passenger) {
          enqueueSnackbar("Passenger Doesn't Exits", { variant: "error" });
        } else {
          dispatch({ type: "setUser", payload: { user: { ...decodedUser } } });
          dispatch({ type: "setMode", payload: { mode: "passenger" } });
          enqueueSnackbar("Login Successfully");
          replace(`/client/${decodedUser.id}`);
        }
      }
      setErrorMsg("");
      setIsSubmiting(false);
    } catch (err) {
      console.log(err);
      setErrorMsg(err.message);
      setIsSubmiting(false);
    }
  };

  const handleModeChange = (mode) => {
    setMode(mode);
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    const value = mode;

    if (!value) {
      current.delete("mode");
    } else {
      current.set("mode", mode);
    }

    const search = current.toString();
    const query = search ? `?${search}` : "";

    router.push(`${pathname}${query}`);
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
                  <p className=" text-green font-poppins mb-5 text-4xl font-semibold ">
                    LOGIN
                  </p>
                  <div class="max-w-[260px] bg-white relative rounded-small md:mr-3">
                    <div
                      id="bg"
                      className={`absolute top-0 w-[130px] h-full bg-black rounded-small duration-75 ${
                        mode == "passenger" ? "left-0" : "left-[130px]"
                      }`}
                    ></div>
                    <button
                      id="email"
                      type="button"
                      className={`cursor-pointer bg-transparent w-[125px] py-3 relative font-poppins text-center ${
                        mode == "passenger" ? "text-white" : ""
                      }`}
                      onClick={() => handleModeChange("passenger")}
                    >
                      Passenger
                    </button>
                    <button
                      id="phone"
                      type="button"
                      className={`cursor-pointer bg-transparent w-[130px] py-3 relative font-poppins text-center ${
                        mode == "driver" ? "text-white" : ""
                      }`}
                      onClick={() => handleModeChange("driver")}
                    >
                      Driver
                    </button>
                  </div>

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

                    <div className="md:w-3/4 w-full space-y-1">
                      <label className="text-white font-poppins font-semibold">
                        Password
                      </label>
                      <RHFPasswordField
                        name="password"
                        errors={errors}
                        placeholder="Enter Your Password"
                        control={control}
                        showPassword={showPassword}
                        setShowPassword={setShowPassword}
                      />
                      <div className="flex justify-end">
                        <Link
                          href="/auth/forget-password"
                          className={`hover:text-white cursor-pointer text-sky-500 `}
                        >
                          Forget Password ?
                        </Link>
                      </div>
                    </div>
                    <LoadingButton
                      color="bg-green"
                      handleSubmit={handleSubmit(onSubmit)}
                      text="Login"
                      width="w-full md:w-3/4"
                      loading={isSubmiting}
                    />
                  </form>

                  <div class="w-full flex flex-col items-center gap-4">
                    <p class="text-center font-poppins text-white">
                      Don't have an account?
                      <Link
                        href={`/auth/register/user/${mode}`}
                        className="font-semibold mx-2 text-sky-500"
                      >
                        Sign Up
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

export default Login;
