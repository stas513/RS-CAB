import React from "react";
import { Icon } from "@iconify/react";
import CardPayment from "../CardPayment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const PaymentView = () => {
  const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);
  return (
    <section className="max-w-container mx-auto">
      <div className="px-5 py-10 mx-5 rounded-large bg-hero-section bg-cover bg-center">
        <div className="max-w-[693px] mx-auto bg-gradient-to-b from-white/30 to-white/20 rounded-small p-5 md:p-10">
          <div className="grid md:grid-cols-2 mb-5">
            <h1 className="text-left font-poppins w-full text-white text-2xl font-bold">
              Payment Details
            </h1>
            <div className="flex justify-end gap-10">
              <Icon icon="logos:paypal" fontSize={32} />
              <Icon icon="logos:visa" fontSize={32} />
              <Icon icon="logos:mastercard" fontSize={32} />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {/* <div className="">
              <input
                type="text"
                name=""
                placeholder="Card Holder Name"
                className="w-full outline-none p-4 rounded-small"
              />
            </div>
            <div className="">
              <input
                type="text"
                name=""
                placeholder="Card Number"
                className="w-full outline-none p-4 rounded-small"
              />
            </div> */}
            <h1>Checkout</h1>
            <Elements stripe={stripePromise}>
              <CardPayment />
            </Elements>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentView;
