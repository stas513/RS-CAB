import React, { useEffect, useState } from "react";
import Image from "next/image";
import BookingInfo from "../BookingInfo";
import ProfileDrawer from "@/app/(RSWeb)/common/profile-drawer/ProfileDrawer";
import Modal from "@/app/(RSWeb)/common/modal/Modal";
import UserUpdateForm from "@/app/(RSWeb)/components/user-update-form/UserUpdateForm";
import axios from "axios";

const ClientPorfileHeader = ({ clientData, setClientData }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
console.log(clientData)
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const fetch = async () => {
    try {
      setLoading(true);
      if (clientData?.profileImage) {
        const res = await axios.get(
          `/api/users/files/${clientData?.profileImage}`
        );
        if (res.status === 200) {
          setClientData((prev) => ({ ...prev, profileImage: res.data }));
          setLoading(false);
        }
      }else{
        setLoading(false)
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
    profileImage: clientData?.profileImage,
    name: clientData?.userInfo?.name,
    mode: clientData?.userInfo?.mode,
  };

  const drawerListData = [
    { field: "Email", value: clientData?.userInfo?.email },
    { field: "Phone Number", value: clientData?.userInfo?.phoneNumber },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="max-w-subcontainer px-5 mx-auto mb-8">
      <div className="flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full md:w-2/5 flex flex-col justify-center">
          <BookingInfo
            title="Total Bookings"
            value={clientData?.totalBookings}
          />
        </div>
        <div className="w-full md:w-3/5">
          <div className="flex justify-between md:justify-end space-x-5">
            <div className="w-4/5 flex items-center">
              <p className="font-poppins text-4xl font-semibold ">
                {`Welcome ${clientData?.userInfo?.name}`}
              </p>
            </div>
            <div className="w-1/5">
              <button
                className="rounded-full overflow-hidden w-[100px] h-[100px]"
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
                    className="object-cover h-full w-full"
                    src={
                      clientData?.profileImage !== null
                        ? clientData?.profileImage
                        : "/webAssets/images/placeholder/avatar.png"
                    }
                    alt=""
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
          id={clientData?.userInfo?.id}
          closeModal={closeModal}
          setData={setClientData}
          currentData={clientData?.userInfo}
        />
      </Modal>
    </div>
  );
};

export default ClientPorfileHeader;
