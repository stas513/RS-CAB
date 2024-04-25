import React from "react";

const BookingDetails = ({booking}) => {

  const invoiceDetails = [
    {
      packageName: booking?.packageName,
      bookingDate: booking?.bookingDate,
      bookingTime: booking?.bookingTime,
      startAddress: booking?.startAddress,
      destination: booking?.destination,
    },
  ];

  const paymentDetails = [
    {
      totalDistance: booking?.totalDistance,
      totalBill: booking?.totalBill,
      status: booking?.status,
      paymentType: booking?.paymentType,
    },
  ];

  return (
    <>
      

      <div className="container mx-auto p-4 ">
        <div className="bg-white p-8 rounded-lg">
          <h1 className="text-2xl font-poppins font-semibold">Client Information</h1>
          <p className="font-poppins">Name: {booking?.clientName}</p>
          <p className="font-poppins">Phone: {booking?.clientNumber}</p>
          <p className="font-poppins">Email: {booking?.clientEmail}</p>
        </div>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 pr-2">
            {invoiceDetails?.map((details, index) => (
              <div key={index}>
                <div className="bg-white p-8 rounded-lg">
                  <h2 className="text-lg font-semibold font-poppins mb-4">
                    Booking Details
                  </h2>
                  <table className="w-full">
                    <tbody>
                      {Object.entries(details).map(([key, value]) => (
                        <tr key={key}>
                          <th className="text-left font-semibold">{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
          <div className="md:w-1/2 pl-2">
            {paymentDetails?.map((details, index) => (
              <div key={index}>
                <div className="bg-white p-8 rounded-lg">
                  <h2 className="text-lg font-semibold font-poppins mb-4">
                    Payment Details
                  </h2>
                  <table className="w-full">
                    <tbody>
                      {Object.entries(details).map(([key, value]) => (
                        <tr key={key}>
                          <th className="text-left font-semibold">{key}</th>
                          <td>{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
