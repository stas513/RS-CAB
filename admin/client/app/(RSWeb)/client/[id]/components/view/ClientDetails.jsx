import React, { useState } from "react";
import DetailsColumn from "../DetailsColumn";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import Modal from "../../../../common/modal/Modal";
import BookingTable from "../BookingTable";

const ClientDetails = ({ clientData }) => {
  const [isOpen, setIsOpen] = useState(false);

  

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const data = [
    { id: 1, field1: 'Value 1', field2: 'Value 2' },
    { id: 2, field1: 'Value 3', field2: 'Value 4' },
    // Add more data rows as needed
  ];

  return (
    <div className="max-w-subcontainer px-5 mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        <DetailsColumn
          title="Bookings"
          className="md:col-span-2"
        >
          <BookingTable data={clientData?.bookings} />
        </DetailsColumn>
      </div>
      <Modal isOpen={isOpen} onClose={closeModal}>
        {/* <CarRegisterForm
          id={id}
          closeModal={closeModal}
          setDriverData={setDriverData}
        /> */}
      </Modal>
    </div>
  );
};

export default ClientDetails;
