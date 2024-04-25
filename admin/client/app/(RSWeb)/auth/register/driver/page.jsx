"use client";

import { useAuthContext } from "@/app/(RSWeb)/context/hooks";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Alert from "@/app/(RSWeb)/common/alert/Alert";
import { useSnackbar } from "notistack";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import RHFTextField from "@/app/(RSWeb)/common/rhf/RHFTextField";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

const schema = yup.object().shape({
  nationalInsuranceNumber: yup
    .number()
    .required("National Insurance Number is required"),
  selfAssesmentTaxId: yup
    .number()
    .required("Self Assesment Tax Id is required"),
  dateOfBirth: yup.date().required("Date of Birth is required"),
  bio: yup.string(),
  hobby: yup.string(),
  profileImage: yup.mixed(),
});

const RegisterDriver = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const { user, dispatch } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [profileImage, setProfileImage] = useState("");
  const { replace } = useRouter();

  const clearImage = () => {
    setProfileImage("");
  };

  const onSubmit = async (data) => {
    console.log(user);
    try {
      setLoading(true);
      const formData = new FormData();
      for (let i in data) {
        if (i == "dateOfBirth") {
          formData.append(i, data[i].toISOString());
        } else {
          formData.append(i, data[i]);
        }
      }
      formData.append("profileImage", profileImage);
      formData.append("userId", user.id);

      const response = await axios.post("/api/users/driver", formData);

      setLoading(false);

      if (response.status == 201) {
        enqueueSnackbar("profile create successfully");
        console.log("beforeSetDriver", user);
        dispatch({
          type: "setDriverInUser",
          payload: {
            driver: response.data,
          },
        });

        dispatch({
          type: "setMode",
          payload: {
            mode: "driver",
          },
        });
        replace(`/driver/${user.id}`);
      }
    } catch (err) {
      setErrorMsg(err?.response?.statusText);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-container mx-auto">
      <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center">
        <div className="max-w-subcontainer h-full mx-auto">
          <div className="max-w-[693px] mx-auto mt-5 bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
            <div className="grid place-items-center gap-5">
              {!!errorMsg && <Alert type="error" alertMessage={errorMsg} />}

              <p className="font-poppins text-green mb-5 text-4xl font-semibold ">
                Driver Information
              </p>
              <div className="w-full flex flex-col items-center gap-4">
                <div className="md:w-3/4 w-full space-y-1">
                  <label className="text-white  font-semibold">
                    National Insurance Number
                  </label>

                  <RHFTextField
                    name="nationalInsuranceNumber"
                    type="text"
                    errors={errors}
                    placeholder="National Insurance Number"
                    control={control}
                  />
                </div>
                <div className="md:w-3/4 w-full space-y-1">
                  <label className="text-white  font-semibold">
                    Self Assesment Tax Id
                  </label>
                  <RHFTextField
                    name="selfAssesmentTaxId"
                    type="text"
                    errors={errors}
                    placeholder="Self Assesment Tax Id"
                    control={control}
                  />
                </div>
                <div className="md:w-3/4 w-full space-y-1">
                  <label className="text-white  font-semibold">
                    Date Of Birth
                  </label>
                  <RHFTextField
                    name="dateOfBirth"
                    type="date"
                    errors={errors}
                    placeholder="Date Of Birth"
                    control={control}
                  />
                </div>
                <div className="md:w-3/4 w-full space-y-1">
                  <label className="text-white  font-semibold">Bio</label>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="outline-none border-none p-4 rounded-small w-full"
                        placeholder="Bio"
                      ></textarea>
                    )}
                  />
                  {!!errors.bio && (
                    <p className="text-red-500 font-poppins">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
                <div className="md:w-3/4 w-full space-y-1">
                  <label className="text-white  font-semibold">Hobby</label>
                  <Controller
                    name="hobby"
                    control={control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        className="outline-none border-none p-4 rounded-small w-full"
                        placeholder="Hobby"
                      ></textarea>
                    )}
                  />
                  {!!errors.hobby && (
                    <p className="text-red-500 font-poppins">
                      {errors.hobby.message}
                    </p>
                  )}
                </div>

                <div className="md:w-3/4 w-full space-y-1">
                  <label className=" w-full flex items-center p-4 bg-white text-blue rounded-small tracking-wide cursor-pointer hover:bg-blue hover:text-white">
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="ml-5 text-base leading-normal">
                      {profileImage
                        ? profileImage.name
                        : "Upload Your Profile Image"}
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                  </label>
                  {profileImage && (
                    <div className="mt-5 space-y-1">
                      <p className="font-semibold text-white">Preview:</p>
                      <div className="flex items-start">
                        <Image
                          width={100}
                          height={100}
                          objectFit="contain"
                          src={URL.createObjectURL(profileImage)}
                          alt="Uploaded"
                          className="w-[100%] h-auto rounded-md object-contain"
                        />
                        <button
                          type="button"
                          onClick={clearImage}
                          className="text-white hover:text-red-500 ml-2"
                        >
                          <Icon icon="clarity:remove-line" fontSize={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <LoadingButton
                  color="bg-green"
                  handleSubmit={handleSubmit(onSubmit)}
                  text="Submit"
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterDriver;
