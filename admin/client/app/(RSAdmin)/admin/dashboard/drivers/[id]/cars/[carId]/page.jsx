"use client";
import React from "react";
import CarDetailsView from "../components/view/car-details-view";

const CarDetails = ({ params }) => {
    const { carId } = params;

    return (
        <div>
            <CarDetailsView id={carId} />
        </div>
    );
};

export default CarDetails;