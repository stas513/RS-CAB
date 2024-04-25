import React, { useState } from "react";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import RHFTextField from "@/app/(RSWeb)/common/rhf/RHFTextField";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const userSchema = Yup.object({
  name: Yup.string().required(),
  email: Yup.string().email("Invalid email format"),
  phoneNumber: Yup.string().required(),
});

const UserUpdateForm = ({ id, closeModal, setData, currentData }) => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const defaultValues = {
    name: currentData?.name || "",
    email: currentData?.email || "",
    phoneNumber: currentData?.phoneNumber || "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data, "data");
    try {
      const res = await axios.put(`/api/users/${id}/`, data);
      if (res.status === 200) {
        setData((prev) => ({
          ...prev,
          userInfo: { ...prev.userInfo, ...res?.data },
        }));
        enqueueSnackbar("Profile updated");
        closeModal();
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="text-2xl font-poppins font-bold text-center mb-10">
        Profile Update
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Name</label>
          <RHFTextField
            type="text"
            name="name"
            className="border border-green"
            errors={errors}
            placeholder="Enter Your Name"
            control={control}
          />
        </div>

        <div className="w-full space-y-1">
          <label className="text-black  font-semibold">Phone Number</label>
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
                inputClass="!relative !outline-none !border !border-green !px-4 py-5 !ps-24 !rounded-small !h-full !w-full"
                buttonClass="!absolute !top-0 !bottom-0 !left-0 !w-[80px] !border !border-green !grid !place-content-center !rounded-tl-small !rounded-bl-small"
              />
            )}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-xs font-poppins">
              {errors["phoneNumber"].message}
            </p>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-2 place-self-end">
          <LoadingButton
            color="bg-green"
            handleSubmit={handleSubmit(onSubmit)}
            text="Update"
            loading={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default UserUpdateForm;
