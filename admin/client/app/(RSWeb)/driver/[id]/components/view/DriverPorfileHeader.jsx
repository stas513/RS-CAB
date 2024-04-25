import React, { useEffect, useState } from "react";
import DriverInfo from "../DriverInfo";
import Image from "next/image";
import ProfileDrawer from "@/app/(RSWeb)/common/profile-drawer/ProfileDrawer";
import UserUpdateForm from "@/app/(RSWeb)/components/user-update-form/UserUpdateForm";
import Modal from "@/app/(RSWeb)/common/modal/Modal";
import DriverInfoUpdateForm from "@/app/(RSWeb)/components/driver-info-update-form/DriverInfoUpdateForm";
import axios from "axios";

const DriverPorfileHeader = ({ driverData, setDriverData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetch = async () => {
    try {
      setLoading(true);
      if (driverData?.profileImage) {
        const res = await axios.get(
          `/api/users/files/${driverData?.profileImage}`
        );
        if (res.status === 200) {
          setDriverData((prev) => ({ ...prev, profileImage: res.data }));
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const drawerHeaderData = {
    profileImage: driverData?.profileImage,
    name: driverData?.userInfo?.name,
    mode: driverData?.userInfo?.mode,
  };

  const driverInfoData = [
    {
      field: "Commision Payable",
      value: driverData?.commision,
    },
    { field: "Current Balance", value: driverData?.currentBalance },
  ];

  const drawerListData = [
    { field: "Email", value: driverData?.userInfo?.email },
    { field: "Phone Number", value: driverData?.userInfo?.phoneNumber },
    {
      field: "Date of birth",
      value: new Date(driverData?.dateOfBirth).toLocaleDateString(),
    },
    { field: "Self assesment tax id", value: driverData?.selfAssesmentTaxId },
    {
      field: "National insurance number",
      value: driverData?.nationalInsuranceNumber,
    },
    {
      field: "Driver recognition number",
      value: driverData?.driverRecognitionNumber,
    },
  ];

  const drawerDriverInfoData = {
    dateOfBirth: driverData?.dateOfBirth,
    selfAssesmentTaxId: driverData?.selfAssesmentTaxId,
    nationalInsuranceNumber: driverData?.nationalInsuranceNumber,
    driverRecognitionNumber: driverData?.driverRecognitionNumber,
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="max-w-subcontainer px-5 mx-auto mb-8">
      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full md:w-2/5 flex flex-col justify-center">
          {driverInfoData?.map((item, ind) => (
            <DriverInfo key={ind} title={item.field} value={item.value} />
          ))}
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex justify-between md:justify-end space-x-5">
            <div className="w-4/5 flex items-center">
              <p className="font-poppins text-4xl font-semibold ">
                {`Welcome ${driverData?.userInfo?.name}`}
              </p>
            </div>
            <div className="w-1/5">
              <button
                className="rounded-full font-poppins overflow-hidden w-[100px] h-[100px]"
                onClick={toggleSidebar}
              >
                {loading ? (
                  <div className="w-full h-full grid place-content-center">
                    <div className="w-12 h-12 border-y-2 border-green border-solid rounded-full animate-spin place-self-center"></div>
                  </div>
                ) : (
                  <Image
                    width={100}
                    height={100}
                    src={
                      driverData?.profileImage
                        ? driverData?.profileImage
                        : "/webAssets/images/placeholder/avatar.png"
                    } // Replace with your profile image path
                    alt="User Profile"
                    className="w-24 h-24 rounded-full mx-auto object-cover"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <ProfileDrawer
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        data={drawerHeaderData}
        openModal={() => openModal()}
        loading={loading}
      >
        {drawerListData?.map((item, ind) => (
          <div key={ind} className="flex flex-col px-2 border-x border-green">
            <p className="font-poppins text-blue font-semibold text-lg">
              {item.field}
            </p>
            <p className="font-poppins text-end">{item.value}</p>
          </div>
        ))}
      </ProfileDrawer>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <UserUpdateForm
          id={driverData?.userInfo?.id}
          closeModal={closeModal}
          setData={setDriverData}
          currentData={driverData?.userInfo}
        />
        <DriverInfoUpdateForm
          id={driverData?.id}
          closeModal={closeModal}
          setDriverData={setDriverData}
          currentData={drawerDriverInfoData}
        />
      </Modal>
    </div>
  );
};

export default DriverPorfileHeader;
