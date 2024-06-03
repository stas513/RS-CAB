"use client";
import React, { useEffect, useState } from "react";
import ClientPorfileHeader from "./components/view/ClientPorfileHeader";
import ClientDetails from "./components/view/ClientDetails";
import axios from "axios";
import Loader from "../../common/loader/Loader";

const ClientProfile = ({ params }) => {
  const { id } = params;
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState({});

  const fetchPassenger = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/users/${id}/passenger`);
      if (response.status === 200) {
        setClientData(response.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassenger(id);
  }, [id]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <ClientPorfileHeader
            clientData={clientData}
            setClientData={setClientData}
          />
          <ClientDetails clientData={clientData} />
        </>
      )}
    </>
  );
};

export default ClientProfile;
