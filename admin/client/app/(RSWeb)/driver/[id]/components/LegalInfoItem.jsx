"use client";

import RHFTextField from "@/app/(RSWeb)/common/rhf/RHFTextField";
import React from "react";

const LegalInfoItem = ({ title, name, type, toggle, control, errors }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <p className="text-xl font-poppins font-semibold">{title}</p>
      </div>
      <div className="grid place-content-center">
        <RHFTextField
          name={name}
          readOnly={toggle}
          className={toggle === false ? 'shadow-lg text-left' : 'text-right'}
          type={type}
          errors={errors}
          placeholder={`Enter your ${title.toLowerCase()}`}
          control={control}
        />
      </div>
    </div>
  );
};

export default LegalInfoItem;
