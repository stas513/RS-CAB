import React, { useState } from "react";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSnackbar } from "notistack";
import RHFTextField from "@/app/(RSWeb)/common/rhf/RHFTextField";
import axios from "axios";
import { Icon } from "@iconify/react";
import Image from "next/image";

const carSchema = Yup.object({
  color: Yup.string().required(),
  carImage: Yup.string().nullable(),
  engine: Yup.string().required(),
  make: Yup.string().required(),
  model: Yup.string().required(),
  year: Yup.string().required(),
  numberPlate: Yup.string().required(),
});

const CarRegisterForm = ({ id, closeModal, setDriverData, currentData }) => {
  const [loading, setLoading] = useState(false);
  const [carImage, setCarImage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const clearImage = () => {
    setCarImage("");
  };

  const defaultValues = {
    color: currentData?.color || "",
    engine: currentData?.engine || "",
    make: currentData?.make || "",
    model: currentData?.model || "",
    year: currentData?.year || "",
    numberPlate: currentData?.numberPlate || "",
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(carSchema),
    defaultValues,
  });

  const onSubmit = async (data) => {
    setLoading(true);
    console.log(data, "data");
    try {
      const formData = new FormData();

      for (const key in data) {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      }

      if (currentData) {
        if (carImage) {
          formData.append("carImage", carImage);
        }
        const res = await axios.put(
          `/api/users/driver/${id}/cars/${currentData?.id}/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 200) {
          enqueueSnackbar("Car updated successfully");
          setLoading(false);
          setDriverData((prev) => ({
            ...prev,
            car: { ...prev.car, ...res?.data.data },
          }));
          closeModal();
          setCarImage(null);
        }
      } else {
        formData.append("carImage", carImage);
        const res = await axios.post(
          `/api/users/driver/${id}/cars/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (res.status === 201) {
          const carFormData = new FormData();
          carFormData.append("carId", res?.data?.id);
          const carDoc = await axios.post(
            `/api/users/driver/${id}/cars/${res?.data?.id}/documents`,
            carFormData
          );
          enqueueSnackbar("Car registered successfully");
          setLoading(false);
          setDriverData((prev) => ({
            ...prev,
            car: { ...res?.data, carDocument: carDoc?.data },
          }));
          closeModal();
        }
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
        {currentData ? "Update car" : "Car registration form"}
      </h1>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Color</label>
          <RHFTextField
            type="text"
            name="color"
            className="border border-green"
            errors={errors}
            placeholder="Enter car's color name"
            control={control}
          />
        </div>
        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Engine</label>
          <RHFTextField
            type="text"
            name="engine"
            className="border border-green"
            errors={errors}
            placeholder="Enter car's engine number"
            control={control}
          />
        </div>
        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Make</label>
          <RHFTextField
            type="text"
            name="make"
            className="border border-green"
            errors={errors}
            placeholder="Enter car's make"
            control={control}
          />
        </div>
        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Model</label>
          <RHFTextField
            type="text"
            name="model"
            className="border border-green"
            errors={errors}
            placeholder="Enter car's model"
            control={control}
          />
        </div>

        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Year</label>
          <RHFTextField
            type="text"
            name="year"
            className="border border-green"
            errors={errors}
            placeholder="Enter car's model year"
            control={control}
          />
        </div>

        <div className=" w-full space-y-1">
          <label className="text-black font-semibold">Number plate</label>
          <RHFTextField
            type="text"
            name="numberPlate"
            className="border border-green"
            errors={errors}
            placeholder="Enter car's plate number"
            control={control}
          />
        </div>

        <div class="w-full space-y-1">
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
              {carImage ? carImage.name : "Upload Your Car Image"}
            </span>
            <input
              type="file"
              className="hidden"
              accept=".jpeg, .jpg, .png"
              onChange={(e) => setCarImage(e.target.files[0])}
            />
          </label>
          {carImage && (
            <div className="mt-5 space-y-1 w-3/4">
              <p className="font-semibold text-white">Preview:</p>
              <div className="flex items-start">
                <Image
                  width={100}
                  height={100}
                  objectFit="contain"
                  src={URL.createObjectURL(carImage)}
                  alt="Uploaded"
                  className="w-[100%] h-auto rounded-md object-contain"
                />
                <button
                  type="button"
                  onClick={clearImage}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <Icon icon="clarity:remove-line" fontSize={18} />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-1 sm:col-span-2 md:col-span-3 place-self-end">
          <LoadingButton
            color="bg-green"
            handleSubmit={handleSubmit(onSubmit)}
            text={currentData ? "Update" : "Submit"}
            loading={loading}
          />
        </div>
      </div>
    </form>
  );
};

export default CarRegisterForm;
