"use client";
import React from "react";
import { PackagesProfileView } from "../components/view";

const PackageDetails = ({ params }) => {
  const { id } = params;

  return (
    <div>
      <PackagesProfileView id={id} />
    </div>
  );
};

export default PackageDetails;