import React, { useState } from "react";
import DetailsColumn from "../DetailsColumn";
import LegalInfoSection from "../LegalInfoSection";
import DocumentItem from "../DocumentItem";
import LoadingButton from "@/app/(RSWeb)/common/loading-button/LoadingButton";
import Modal from "../../../../common/modal/Modal";
import CarRegisterForm from "./CarRegisterForm";
import CarCard from "../CarCard";
import CarLegalInfoSection from "../CarLegalInfoSection";
import CarDocumentItem from "../CarDocumentItem";
import LineChart from "../LineChart";
import TableData from "../TableData";
import ColumnChart from "../ColumnChart";
import DayDateSlider from "../DateSlider";

const Details = ({ documents, car, id, setDriverData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  const legalInfoData = {
    sortCode: documents?.sortCode,
    accountNumber: documents?.accountNumber,
    bankName: documents?.bankName,
    licenceExpiryDate: documents?.licenceExpiryDate,
    pcoBadgeNumber: documents?.pcoBadgeNumber,
    pcoBadgeExpiryDate: documents?.pcoBadgeExpiryDate,
    workPermitCode: documents?.workPermitCode,
    passportExpiryDate: documents?.passportExpiryDate,
  };
  const CarLegalInfoData = {
    insurenceExpiryDate: car?.carDocument?.insurenceExpiryDate,
    motPassDate: car?.carDocument?.motPassDate,
    pcoVehicleLicenceExpiryDate: car?.carDocument?.pcoVehicleLicenceExpiryDate,
  };

  const driverDocuments = {
    accProfDoc: documents?.accProfDoc,
    licenceDocFront: documents?.licenceDocFront,
    licenceDocBack: documents?.licenceDocBack,
    licenceNumber: documents?.licenceNumber,
    pcoBadgeDocFront: documents?.pcoBadgeDocFront,
    pcoBadgeDocBack: documents?.pcoBadgeDocBack,
    pcoPaperDoc: documents?.pcoPaperDoc,
    passportDocFront: documents?.passportDocFront,
    passportDocBack: documents?.passportDocBack,
    addressProfDoc: documents?.addressProfDoc,
  };

  const CarDocuments = {
    insurenceDoc: car?.carDocument?.insurenceDoc,
    motDoc: car?.carDocument?.motDoc,
    pcoVehicleLicenceDoc: car?.carDocument?.pcoVehicleLicenceDoc,
    vehicleLogBookDoc: car?.carDocument?.vehicleLogBookDoc,
    otherDoc: car?.carDocument?.otherDoc,
  };

  const documentTitles = [
    { title: "Account Prof Document", name: "accProfDoc" },
    { title: "Driving Licence Front", name: "licenceDocFront" },
    { title: "Driving Licence Back", name: "licenceDocBack" },
    { title: "PCO Badge Document Front", name: "pcoBadgeDocFront" },
    { title: "PCO Badge Document Back", name: "pcoBadgeDocBack" },
    { title: "PCO Paper Document", name: "pcoPaperDoc" },
    { title: "Passport Document Front", name: "passportDocFront" },
    { title: "Passport Document Back", name: "passportDocBack" },
    { title: "Address Prof Document", name: "addressProfDoc" },
  ];

  const CarDocumentTitles = [
    { title: "Insurence Document", name: "insurenceDoc" },
    { title: "MOT Document", name: "motDoc" },
    { title: "PCO Vehicle Licence Document", name: "pcoVehicleLicenceDoc" },
    { title: "Vehicle Log Book Document", name: "vehicleLogBookDoc" },
    { title: "Other Document", name: "otherDoc" },
  ];



  return (
    <div className="max-w-subcontainer px-5 mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        <DetailsColumn title="Booking">
          <LineChart />
          <TableData />
        </DetailsColumn>

        <DetailsColumn title="Earning">
          <ColumnChart />
          <DayDateSlider />
        </DetailsColumn>
        <DetailsColumn title="Legal Information" className="md:col-span-2">
          <LegalInfoSection legalInfoData={legalInfoData} id={id} />
        </DetailsColumn>
        <DetailsColumn title="Documents" className="md:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-10">
            {documentTitles.map((document, index) => (
              <DocumentItem
                key={index}
                title={document.title}
                name={document.name}
                doc={driverDocuments[document?.name]}
                id={id}
                setDriverData={setDriverData}
              />
            ))}
          </div>
        </DetailsColumn>
        <DetailsColumn title="My Vehicles" className="md:col-span-2">
          {car ? (
            <div className="">
              <CarCard car={car} setDriverData={setDriverData} />
              <div className="flex justify-end">
                <LoadingButton
                  text="Update"
                  color="bg-green"
                  type="button"
                  handleSubmit={openModal}
                />
              </div>
            </div>
          ) : (
            <div className="w-full h-full grid place-content-center">
              <p className="text-center font-poppins text-gray font-semibold text-3xl mb-5">
                No car registered
              </p>
              <LoadingButton
                text="Register your car"
                color="bg-green"
                type="submit"
                handleSubmit={openModal}
              />
            </div>
          )}
        </DetailsColumn>
        {car && (
          <>
            <DetailsColumn title="Car's Legal Information">
              <CarLegalInfoSection
                legalInfoData={CarLegalInfoData}
                id={id}
                carId={car?.id}
              />
            </DetailsColumn>
            <DetailsColumn title="Car's Documents">
              <div className="grid grid-cols-1 gap-y-5 gap-x-10">
                {CarDocumentTitles.map((document, index) => (
                  <CarDocumentItem
                    key={index}
                    title={document.title}
                    name={document.name}
                    doc={CarDocuments[document?.name]}
                    id={id}
                    carId={car?.id}
                    setDriverData={setDriverData}
                  />
                ))}
              </div>
            </DetailsColumn>
          </>
        )}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="w-full md:w-3/4">
        <CarRegisterForm
          id={id}
          closeModal={closeModal}
          setDriverData={setDriverData}
          currentData={car ? car : null}
        />
      </Modal>
    </div>
  );
};

export default Details;
