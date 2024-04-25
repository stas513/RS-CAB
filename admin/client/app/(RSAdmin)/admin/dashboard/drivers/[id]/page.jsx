"use client";
import React from "react";
import DriverProfileView from "../components/view/drivers-profile-view";

const DriverDetails = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <DriverProfileView id={id} />
    </div>
  );
};

export default DriverDetails;