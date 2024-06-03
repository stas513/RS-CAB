// components/ProfileDrawer.js

import { Icon } from "@iconify/react";
import Image from "next/image";
import React from "react";
import { useAuthContext } from "../../context/hooks";

const ProfileDrawer = ({
  isOpen,
  toggleSidebar,
  data,
  openModal,
  loading,
  children,
}) => {
  const { user, logout } = useAuthContext();
  return (
    <div>
      {/* Overlay to cover the content when the sidebar is open */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black opacity-50 z-20"
        ></div>
      )}
      <div
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed transform top-0 right-0 w-72 sm:w-96 h-[100vh] bg-white p-4 shadow-lg transition-transform duration-300 ease-in-out z-30`}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-2 left-2 text-gray-600 hover:text-gray-800"
        >
          {isOpen ? <Icon icon="ion:close" fontSize={36} /> : "Open"}
        </button>

        <div className="flex flex-col justify-between h-[95vh]">
          <div>
            <div className="text-center">
              {loading ? (
                <div className="w-full h-full grid place-content-center">
                  <div className="w-12 h-12 border-y-2 border-green border-solid rounded-full animate-spin place-self-center"></div>
                </div>
              ) : (
                <Image
                  width={100}
                  height={100}
                  src={
                    data?.profileImage !== null
                      ? data?.profileImage
                      : "/webAssets/images/placeholder/avatar.png"
                  }
                  alt="User Profile"
                  className="w-24 h-24 rounded-full mx-auto object-cover"
                />
              )}

              <h2 className="text-xl font-semibold font-poppins mt-2">{`${data?.name}`}</h2>
              <p className="font-poppins text-gray-500">{data?.mode}</p>
            </div>
          </div>
          <div className="mt-10 space-y-4 overflow-scroll overflow-x-hidden">
            {children}
          </div>
          {/* {user && ( */}
          <div className="space-y-5 w-full">
            <button
              onClick={openModal}
              className="bg-green text-white py-3 px-6 rounded-large font-semibold text-sm w-full text-center"
            >
              Update Profile
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white py-3 px-6 rounded-large font-semibold text-sm w-full text-center"
            >
              Log out
            </button>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ProfileDrawer;
