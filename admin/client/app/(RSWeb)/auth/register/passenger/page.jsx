"use client";

import { useAuthContext } from "@/app/(RSWeb)/context/hooks";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import Alert from "@/app/(RSWeb)/common/alert/Alert";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import { useSnackbar } from "notistack";

const RegisterDriver = () => {

  const [profileImage, setProfileImage] = useState("");
  const { user } = useAuthContext();
  const [loading,setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleFormSubmit = async () => {
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("userId", user.id);
      const response = await axios.post("/api/users/passenger", formData);
      setLoading(false)
      
      if (response.status==201){
        enqueueSnackbar('profile create successfully')
      }

    }
    catch (err) {
      setErrorMsg(err?.response?.data?.message)
      setLoading(false)
    }
  };

  return (  
        <section className="max-w-container mx-auto">
        <div className="px-5 py-10 mx-5 min-h-[600px] rounded-large bg-hero-section bg-cover bg-center">
          <div className="max-w-subcontainer h-full mx-auto">
            <div className="max-w-[693px] mx-auto mt-5 bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
              <div className="grid place-items-center gap-5">
              {!!errorMsg && <Alert type="error" alertMessage={errorMsg} />}

                <p className="font-poppins text-green mb-5 text-4xl font-semibold ">
                  Passenger Information
                </p>
                <div className="w-full flex flex-col items-center gap-4">
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
                      {profileImage?profileImage.name:"Upload Your Profile Image"}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <LoadingButton color="bg-green" handleSubmit={handleFormSubmit} text="Submit" loading={loading}/>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
     
 
  );
};

export default RegisterDriver;
