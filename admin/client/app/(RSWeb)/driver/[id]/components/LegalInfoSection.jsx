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
  sortCode: Yup.number().nullable(),
  accountNumber: Yup.number().nullable(),
  bankName: Yup.string().nullable(),
  licenceExpiryDate: Yup.date()
    .nullable()
    .typeError("Licence Expiry Date must be a valid date")
    .min(new Date(), "Licence Expiry Date must be in the future"),
  pcoBadgeNumber: Yup.number().nullable(),
  pcoBadgeExpiryDate: Yup.date()
    .nullable()
    .typeError("PCO Badge Expiry Date must be a valid date")
    .min(new Date(), "PCO Badge Expiry Date must be in the future"),
  workPermitCode: Yup.number().nullable(),
  passportExpiryDate: Yup.date()
    .nullable()
    .typeError("Passport Expiry Date must be a valid date")
    .min(new Date(), "Passport Expiry Date must be in the future"),
});

const LegalInfoSection = ({ legalInfoData, id }) => {
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
        `/api/users/driver/${id}/documents/legalinfo`,
        {
          ...data,
          sortCode: `${data.sortCode}`,
          pcoBadgeNumber: `${data.pcoBadgeNumber}`,
          accountNumber: `${data.accountNumber}`,
          workPermitCode: `${data.workPermitCode}`,
        }
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-10">
        <LegalInfoItem
          title="Sort Code"
          type="number"
          name="sortCode"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="Account Number"
          type="number"
          name="accountNumber"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="Bank Name"
          type="text"
          name="bankName"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="Licence Expiry Date"
          type="date"
          name="licenceExpiryDate"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="PCO Badge Number"
          type="number"
          name="pcoBadgeNumber"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="PCO Badge Expiry Date"
          type="date"
          name="pcoBadgeExpiryDate"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="Work Permit Code"
          type="number"
          name="workPermitCode"
          toggle={active}
          errors={errors}
          control={control}
        />
        <LegalInfoItem
          title="Passport Expiry Date"
          type="date"
          name="passportExpiryDate"
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

export default LegalInfoSection;
