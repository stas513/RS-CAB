"use client";

import Modal from "@/app/(RSWeb)/common/modal/Modal";
import axios from "axios";
import Image from "next/image";
import { useSnackbar } from "notistack";
import React, { useState } from "react";

const DocumentItem = ({ title, name, doc, id, setDriverData }) => {
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const fetch = async () => {
    try {
      if (doc) {
        setPreviewLoading(true);
        const res = await axios.get(`/api/users/files/${doc}/`);
        if (res.status === 200) {
          setImagePreview(res.data);
          setPreviewLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setPreviewLoading(false);
    }
  };

  const openModal = () => {
    setIsOpen(true);
    fetch();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUploading = async (input) => {
    setLoading(true);
    try {
      const field = input.name;
      const file = input.files[0];

      if (file) {
        const formData = new FormData();
        formData.append(field, file);

        const res = await axios.put(
          `/api/users/driver/${id}/documents/`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (res.status === 200) {
          console.log(res.data);
          setDriverData((prev) => ({ ...prev, document: res.data.data }));
          setLoading(false);
          enqueueSnackbar("Uploaded Successfully");
        } else {
          setLoading(false);
          enqueueSnackbar("Something went wrong", { variant: "error" });
        }
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.message, { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-between">
      <div>
        <p className="font-poppins text-xl font-semibold">{title}</p>
        <p className="font-poppins text-sm">{`Upload your ${title.toLowerCase()} image`}</p>
      </div>
      <div className="grid place-content-center">
        {loading ? (
          <div className="w-6 h-6 border-y-2 border-green border-solid rounded-full animate-spin place-self-center"></div>
        ) : (
          <>
            <label className="flex justify-end">
              <p className="font-poppins text-sm text-left text-blue cursor-pointer">
                {doc === null ? "Upload file" : "Update file"}
              </p>
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleUploading(e.target)}
                name={name}
              />
            </label>
            <div className="flex justify-end gap-3">
              <p
                className={`uploaded-file-name text-xs font-poppins ${
                  doc === null ? "text-red-500" : "text-green"
                } text-right font-semibold`}
              >
                {doc === null ? "required" : "uploaded"}
              </p>
              {doc && (
                <button
                  className="text-blue font-poppins border-none outline-none bg-none text-xs"
                  onClick={openModal}
                >
                  view
                </button>
              )}
            </div>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="w-1/2">
        {previewLoading ? (
          <div className="w-full h-96 grid place-content-center">
            <div className="w-12 h-12 border-y-2 border-green border-solid rounded-full animate-spin place-self-center"></div>
          </div>
        ) : (
          
          <Image
            src={imagePreview}
            width={100}
            height={100}
            className="w-full h-auto"
            alt="document"
          />
        )}
      </Modal>
    </div>
  );
};

export default DocumentItem;
