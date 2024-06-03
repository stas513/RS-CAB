'use client'
import React, { useState } from "react";
import BookingView from "./components/view/BookingView";
import PaymentView from "./components/view/PaymentView";

const BookingPage = () => {
  const [step, setStep] = useState("booking");
  return (
    <>
      <div className="max-w-subcontainer mx-auto grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-5 sm:gap-10 md:gap-14 my-10">
        <button onClick={()=>setStep('booking')} className="bg-green py-3 px-12 rounded-md font-semibold text-sm font-poppins">
          Booking Details
        </button>
        <button onClick={()=>setStep('payment')} className="bg-green py-3 px-12 rounded-md font-semibold text-sm font-poppins">
          Payment Details
        </button>
        <button className="bg-green py-3 px-12 rounded-md font-semibold text-sm font-poppins">
          Confirmation
        </button>
      </div>

      {step === "booking" && <BookingView />}
      {step === "payment" && <PaymentView />}
    </>
  );
};

export default BookingPage;
