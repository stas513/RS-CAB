"use client";
import React, { useEffect, useState } from "react";
import DriverPorfileHeader from "./components/view/DriverPorfileHeader";
import Details from "./components/view/Details";
import axios from "axios";
import Loader from "../../common/loader/Loader";

const DriverProfile = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(true);
  const [driverData, setDriverData] = useState({});

  const fetchDriver = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/${id}/driver`);
      if (response.status === 200) {
        if (response.data.document === null) {

          const formData = new FormData();
          formData.append('driverId', response?.data?.id);

          const doc = await axios.post(
            `/api/users/driver/${response.data.id}/documents`,
            formData
          );
          if (doc.status === 201) {
            response.data.document = doc.data
          }

        }



        setDriverData({ ...response.data });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  console.log(driverData)


  useEffect(() => {
    fetchDriver(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <DriverPorfileHeader driverData={driverData} setDriverData={setDriverData} />
          <Details documents={driverData?.document} car={driverData?.car} id={driverData?.id} setDriverData={setDriverData} />
        </>
      )}
    </>
  );
};

export default DriverProfile;
