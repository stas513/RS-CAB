import { parseISO, format } from "date-fns";
import React from "react";
import { Controller } from "react-hook-form";

const RHFTextField = ({
  name,
  type,
  placeholder,
  errors,
  control,
  className,
  ...other
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <input
              {...field}
              type={type}
              value={
                type === "date" && field.value
                  ? field.value.split("T")[0]
                  : field.value
              }
              defaultValue={
                type === "date" && field.value
                  ? field.value.split("T")[0]
                  : field.value
              }
              className={`w-full outline-none p-4 rounded-small ${className}`}
              placeholder={placeholder}
              {...other}
            />

          )
        }
      />
      {!!errors[name] && (
        <p className="text-red-500 text-xs font-poppins">{errors[name].message}</p>
      )}
    </>
  );
};

export default RHFTextField;
