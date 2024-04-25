"use client";

import axios from "axios";
import React, { useState } from "react";
import LegalInfoItem from "./LegalInfoItem";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";

const schema = Yup.object().shape({
  insurenceExpiryDate: Yup.date()
    .nullable()
    .min(new Date(), "Licence Expiry Date must be in the future"),
  motPassDate: Yup.date().nullable(),
  pcoVehicleLicenceExpiryDate: Yup.date()
    .nullable()
    .min(new Date(), "Passport Expiry Date must be in the future"),
});

const CarLegalInfoSection = ({ legalInfoData, id, carId }) => {
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(true);
  const { enqueueSnackbar } = useSnackbar();

  const handleToggle = () => {
    setActive(!active);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: legalInfoData,
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const res = await axios.put(
        `/api/users/driver/${id}/cars/${carId}/documents/legalinfo`,
        data
      );
      if (res.status === 200) {
        handleToggle();
        enqueueSnackbar("Updated Successfully");
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
      <div className="space-y-5">
        <LegalInfoItem
          title="Insurence Expiry Date"
          type="date"
          name="insurenceExpiryDate"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="MOT Pass Date"
          type="date"
          name="motPassDate"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title=" PCO Licence Expiry Date"
          type="date"
          name="pcoVehicleLicenceExpiryDate"
          toggle={active}
          errors={errors}
          control={control}
        />
        <div className="md:col-span-2">
          <div className="flex justify-end">
            {active ? (
              <button
                type="button" // Use type="button" for a regular button
                onClick={handleToggle} // Toggle the active state when clicked
                className="bg-green outline-none border-none px-8 py-4 rounded-full font-poppins flex items-center justify-center  text-center"
              >
                Update
              </button>
            ) : (
              <>
                <button
                  type="button" // Use type="button" for a regular button
                  onClick={handleToggle} // Toggle the active state when clicked
                  className="bg-blue text-white mr-5 outline-none border-none px-8 py-4 rounded-full font-poppins flex items-center justify-center  text-center"
                >
                  Cancel
                </button>
                <LoadingButton
                  loading={loading}
                  text="Submit"
                  color="bg-green"
                  type="submit" // Use type="submit" for a submit button
                />
              </>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default CarLegalInfoSection;
