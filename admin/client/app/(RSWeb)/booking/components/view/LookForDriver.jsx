import React from "react";

const LookForDriver = ({ requestData, bookingData }) => {
  console.log(bookingData)
  return (
    <>
      {requestData?.status === "PENDING" ? (
        <div className="w-96 h-96 grid place-content-center">
          <div className="flex flex-col justify-center gap-10">
            <div className="w-12 h-12 border-y-2 border-green border-solid rounded-full animate-spin place-self-center"></div>
            <h1 className="text-2xl text-green font-poppins font-bold">
              Finding cab for you...
            </h1>
          </div>
        </div>
      ) : requestData?.status == "ACCEPTED" ? (
        <>
          <div className="w-96 h-96 grid place-content-center">
            <div className="flex flex-col justify-center gap-10">
              <h1 className="text-2xl text-green font-poppins font-bold text-center">
                {bookingData?.driverInfo?.userInfo?.name} Accept Your request and is on the
                way.
              </h1>
            </div>
          </div>
        </>
      ) : requestData?.status == "CANCELLED" ? (
        <>
          <h4>Your Ride Is Cancelled.</h4>
        </>
      ) : null}
    </>
  );
};

export default LookForDriver;
