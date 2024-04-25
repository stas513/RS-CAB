"use client";
import React from "react";
import { PassengerProfileView } from "../components/view"

const PassengerDetails = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <PassengerProfileView id={id} />
    </div>
  );
};

export default PassengerDetails;
