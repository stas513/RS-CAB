import React, { useEffect, useState } from "react";
import Image from "next/image";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";
import axios from "axios";

const PackageCard = ({
  data,
  setPackages,
  setBookingDetails,
  bookingDetails,
}) => {
  const handleCardClick = () => {
    setBookingDetails((prevState) => ({
      ...prevState,
      packageId: data.id,
    }));
  };
  return (
    <>
      <div
        class={`sm:w-[400px] w-full flex gap-x-5 px-4 py-2 shadow-md rounded-xl overflow-hidden border cursor-pointer ${
          bookingDetails.packageId === data.id
            ? "border-blue"
            : "border-slate-300"
        }`}
        onClick={handleCardClick}
      >
        <div class="w-1/4 flex items-center rounded-xl overflow-hidden">
          <Image
            width={100}
            height={50}
            className="object-cover object-center w-full !h-[50px]"
            src={
              data?.coverImage
                ? data?.coverImage
                : "/webAssets/images/placeholder/package.jpg"
            }
            alt={data?.name}
          />
        </div>
        <div className="space-y-3 w-3/4">
          <div className="flex justify-between gap-x-16">
            <h2 class="text-md font-poppins font-bold">{data?.name}</h2>
            <h2 class="text-md font-poppins font-bold">$ {data?.serviceFee}</h2>
          </div>
          <p class="font-poppins text-slate-600 text-xs text-right">
            Fee / mile: $ {data?.pricePerMilage}
          </p>
        </div>
      </div>
    </>
  );
};

export default PackageCard;
