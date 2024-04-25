"use client";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import Image from "next/image";
import LocationInput from "../LocationInput";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import PackageCard from "../PackageCard";
import { formatISO, formatISO9075 } from "date-fns";
import axios from "axios";
import { calculateTotalDistance } from "@/app/(RSWeb)/utils/GoogleMapsApi";
import { useSocketContext } from "@/app/(RSWeb)/context/hooks/use-sockets-context";
import { useAuthContext } from "@/app/(RSWeb)/context/hooks";
import { useSnackbar } from "notistack";
import { endpoints } from "@/app/(RSAdmin)/admin/utils/axios";
import Loader from "@/app/(RSWeb)/common/loader/Loader";
import Modal from "@/app/(RSWeb)/common/modal/Modal";
import LookForDriver from "./LookForDriver";
const BookingView = () => {
  const [loading, setLoading] = useState(true);
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isBookingforMyself, setIsBookingforMyself] = useState(false);
  const [inputFields, setInputFields] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingDetails, setBookingDetails] = useState({
    startAddress: {},
    destinationAddress: {},
    stopages: [],
    bookingDate: null,
    bookingTime: null,
    totalDistance: 123,
    totalBill: "",
    packageId: "",
    userId: "",
    passengerId: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    budget: null,
    requestType: "FIXED",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [requestData, setRequestData] = useState({});
  const [bookingData, setBookingData] = useState({});

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const { socketInstance } = useSocketContext();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBookingDetails((prevState) => ({
      ...prevState,
      bookingDate: formatISO(date),
    }));
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setBookingDetails((prevState) => ({
      ...prevState,
      bookingTime: formatISO9075(time, { representation: "time" }),
    }));
  };

  const CustomDatePicker = forwardRef(({ value, onClick }, ref) => (
    <div className="w-full rounded-small bg-white">
      <input
        type="text"
        className="outline-none border-none p-4 rounded-small w-full"
        placeholder="Choose Date"
        onClick={onClick}
        ref={ref}
        value={value}
      />
    </div>
  ));

  const CustomTimePicker = forwardRef(({ value, onClick }, ref) => (
    <div className="w-full rounded-small bg-white">
      <input
        type="text"
        className="outline-none border-none p-4 rounded-small w-full"
        placeholder="Choose Time"
        onClick={onClick}
        ref={ref}
        value={value}
      />
    </div>
  ));

  // Function to add a new input field
  const addInputField = () => {
    setInputFields([...inputFields, ""]);
  };

  // Function to remove an input field
  const removeInputField = (index) => {
    const newInputFields = inputFields.filter((_, i) => i !== index);
    setInputFields(newInputFields);

    // Remove the corresponding stoppage from the payload
    setBookingDetails((prevState) => ({
      ...prevState,
      stopages: prevState.stopages.filter((_, i) => i !== index),
    }));
  };

  const fetchPackages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/admin/packages");
      console.log(res.data);
      if (res.status === 200) {
        const updatedPackages = await Promise.all(
          res.data.map(async (val) => {
            const coverImageRes = await axios.get(
              endpoints.documents.doc(val?.coverImage)
            );
            val.coverImage = coverImageRes.data;
            return val;
          })
        );

        setLoading(false);
        setPackages(updatedPackages);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  console.log(requestData, "booking response");
  useEffect(() => {
    fetchPackages();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);

    try {
      const locations = {
        startAddress: bookingDetails.startAddress,
        stopages: bookingDetails.stopages,
        destinationAddress: bookingDetails.destinationAddress,
      };
      const selectedPackage = packages?.filter(
        (pack) => pack.id === bookingDetails.packageId
      );

      const distance = await calculateTotalDistance(locations);

      if (distance !== null) {
        const totalDistance = distance.toFixed(2);
        const totalBill = (
          distance * selectedPackage[0]?.pricePerMilage
        ).toFixed(2);

        const bookingDataRequest ={
          ...bookingDetails,
          totalDistance: totalDistance,
          totalBill: totalBill,
          userId: user?.id,
          passengerId: user?.passenger?.id,
          clientName: isBookingforMyself ? user?.name : prevState?.clientName,
          clientEmail: isBookingforMyself ? user?.email : prevState?.clientEmail,
          clientPhone: isBookingforMyself
            ? user?.phoneNumber
            : prevState.clientPhone,
          }


        socketInstance.on("ride-request-error", (data) => {
          console.log('triggred error')

          setIsSubmiting(false);
          enqueueSnackbar(data.message, { variant: "error" });
        });

        socketInstance.on("ride-requests-created", (data) => {
          console.log('triggred success')
          setRequestData(data.data);
          setIsSubmiting(false);
          enqueueSnackbar(data.message);

          openModal();

        });

        socketInstance.on("get-ride", (response) => {
          if (response.data.status === "ACCEPTED") {
            setRequestData(response.data)
          }
        });

        socketInstance.on("get-booking", (response) => {
          setBookingData(response.data)
        });

        socketInstance.emit("create-ride-request",bookingDataRequest);

      }
    } catch (error) {
      console.log(error);
      setIsSubmiting(false);
    }
  };

  console.log(bookingDetails);

  const onPassengerDetailChange = () => {
    if (!isBookingforMyself) {
      setBookingDetails((prev) => ({
        ...prev,
        clientEmail: user?.email,
        clientPhone: user?.phoneNumber,
        clientName: user?.name,
      }));
    } else {
      setBookingDetails((prev) => ({
        ...prev,
        clientEmail: "",
        clientName: "",
        clientPhone: "",
      }));
    }
    setIsBookingforMyself(!isBookingforMyself);
  };

  return (
    <>
      <section className="max-w-container mx-auto">
        <div className="px-5 py-10 mx-5 rounded-large bg-hero-section bg-cover bg-center">
          <div className="max-w-subcontainer h-full mx-auto space-y-10">
            <div className="max-w-subcontainer mx-auto bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
              <div className="grid grid-cols-3 gap-10">
                <div className="w-full col-span-3 md:col-span-2 flex flex-col gap-4">
                  <div className="w-full space-y-5">
                    <h1 className="text-left font-poppins w-full text-white text-2xl font-bold">
                      Journey Details
                    </h1>
                    <LocationInput
                      placeholder="Choose Pickup Point"
                      onPlaceSelect={(placeDetails) =>
                        setBookingDetails((prevState) => ({
                          ...prevState,
                          startAddress: placeDetails,
                        }))
                      }
                    />
                    <LocationInput
                      placeholder="Choose Destination Point"
                      onPlaceSelect={(placeDetails) =>
                        setBookingDetails((prevState) => ({
                          ...prevState,
                          destinationAddress: placeDetails,
                        }))
                      }
                    />
                    {inputFields.length !== 0 && (
                      <h1 className="text-left font-poppins w-full text-white text-2xl font-bold">
                        Stopage
                      </h1>
                    )}
                    {inputFields.map((_, index) => (
                      <LocationInput
                        key={index}
                        placeholder="Choose Stopage Point"
                        onPlaceSelect={(placeDetails) =>
                          setBookingDetails((prevState) => {
                            const Stopages = [...prevState.stopages];
                            Stopages[index] = placeDetails;

                            return {
                              ...prevState,
                              stopages: Stopages,
                            };
                          })
                        }
                        removeBtn={true}
                        removeInputField={() => removeInputField(index)}
                      />
                    ))}
                    <div className="flex justify-end">
                      <button
                        className="bg-blue text-white font-poppins py-3 px-6 rounded-md text-sm"
                        onClick={addInputField}
                      >
                        {inputFields.length !== 0
                          ? "Add More Stopage"
                          : "Add Stopage"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full col-span-3 md:col-span-1">
                  <div className="w-full space-y-2">
                    <div className="grid grid-cols-3 gap-5 place-items-center">
                      <div className="flex flex-col">
                        <p className="font-poppins text-white text-sm">Month</p>
                        <p className="font-poppins text-white text-md font-semibold">
                          August
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-poppins text-white text-sm">Year</p>
                        <p className="font-poppins text-white text-md font-semibold">
                          2023
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-poppins text-white text-sm">Time</p>
                        <p className="font-poppins text-white text-md font-semibold">
                          10:31 PM
                        </p>
                      </div>
                    </div>
                    <div className="w-full space-y-5">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        className="w-full"
                        wrapperClassName="w-full"
                        customInput={<CustomDatePicker />}
                      />

                      <DatePicker
                        selected={selectedTime}
                        onChange={handleTimeChange}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={15}
                        dateFormat="h:mm aa"
                        className="w-full"
                        wrapperClassName="w-full"
                        customInput={<CustomTimePicker />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-subcontainer mx-auto py-10 px-5">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-left font-poppins text-2xl font-bold w-full">
              Select Package
            </h2>
            {loading ? (
              <div className="grid place-content-center w-full">
                <div
                  className="w-16 h-16 rounded-full animate-spin
            border-4 border-solid border-green border-t-transparent"
                ></div>
              </div>
            ) : (
              <div className="w-full flex flex-col space-y-6 items-center mt-4">
                {packages?.map((element, ind) => (
                  <PackageCard
                    key={ind}
                    data={element}
                    setPackages={setPackages}
                    bookingDetails={bookingDetails}
                    setBookingDetails={setBookingDetails}
                  />
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="p-4 m-2 bg-blue">
              <form action="">
                <div className="flex justify-between">
                  <h2 className="text-white font-poppins text-2xl ml-5  font-semibold">
                    Passenger Details
                  </h2>
                  <label className="flex items-center">
                    <p className="text-white mr-5">Book for myself!</p>
                    <input type="checkbox" onChange={onPassengerDetailChange} />
                  </label>
                </div>

                {/* <!-- name --> */}
                <div className="px-5 my-4">
                  <input
                    type="text"
                    name=""
                    value={bookingDetails.clientName}
                    disabled={isBookingforMyself}
                    placeholder="Passenger Name"
                    className="w-full outline-none p-4 rounded-small"
                    onChange={(e) =>
                      setBookingDetails((prevState) => ({
                        ...prevState,
                        clientName: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* <!-- email --> */}
                <div className="px-5 my-4">
                  <input
                    placeholder="Email"
                    type="email"
                    value={bookingDetails.clientEmail}
                    disabled={isBookingforMyself}
                    name=""
                    className="w-full outline-none p-4 rounded-small"
                    onChange={(e) =>
                      setBookingDetails((prevState) => ({
                        ...prevState,
                        clientEmail: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* <!-- phone --> */}
                <div className="px-5 my-4">
                  <PhoneInput
                    country={"us"}
                    placeholder="Your Phone Number"
                    inputClass="!relative !outline-none !border-none !px-4 py-5 !ps-24 !rounded-small !h-full !w-full"
                    buttonClass="!absolute !top-0 !bottom-0 !left-0 !w-[80px] !grid !place-content-center !rounded-tl-small !rounded-bl-small"
                    value={bookingDetails.clientPhone}
                    disabled={isBookingforMyself}
                    onChange={(value) => {
                      setBookingDetails((prevState) => ({
                        ...prevState,
                        clientPhone: value,
                      }));
                    }}
                  />
                </div>

                {/* <!-- budget --> */}
                <div className="px-5 my-4">
                  <input
                    type="number"
                    name="budget"
                    placeholder="Your Budget"
                    className="w-full outline-none p-4 rounded-small"
                    onChange={(e) =>
                      setBookingDetails((prevState) => ({
                        ...prevState,
                        budget: e.target.value,
                      }))
                    }
                  />
                </div>

                {/* <!-- button --> */}
                <div className="flex justify-center p-3">
                  <button
                    className="bg-green flex py-3 font-poppins px-12 rounded-md text-sm font-semibold"
                    onClick={onSubmit}
                  >
                    Process
                    {isSubmiting && (
                      <span className="grid place-content-center w-12">
                        <span
                          className="w-5 h-5 rounded-full animate-spin
                border-4 border-solid border-black border-t-transparent"
                        ></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={isOpen} onClose={closeModal} className="">
        <LookForDriver requestData={requestData} bookingData={bookingData}/>
      </Modal>
    </>
  );
};

export default BookingView;
