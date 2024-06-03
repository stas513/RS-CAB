import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CarCard = ({ car, setDriverData }) => {
  const [loading, setLoading] = useState(true);
  const [carImage, setCarImage] = useState("");

  const fetchCarImage = async () => {
    setLoading(true);
    try {
      if (car?.carImage) {
        const carImageRes = await axios.get(
          `/api/users/files/${car?.carImage}`
        );
        if (carImageRes.status === 200) {
          setCarImage(carImageRes.data);
          setLoading(false);
        }
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarImage();
  }, [car]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="relative w-full h-auto rounded-[20px] overflow-hidden">
        {loading ? (
          <div className="w-full h-full grid place-content-center">
            <div className="w-12 h-12 border-y-2 border-green border-solid rounded-full animate-spin place-self-center"></div>
          </div>
        ) : (
          <Image
            src={carImage ? carImage : "/webAssets/images/placeholder/car.png"}
            alt={car?.make}
            width={100}
            height={100}
            className="w-full object-contain"
          />
        )}
      </div>
      <div className="mt-4 md:mt-0 flex items-start flex-col">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <p className="font-poppins text-3xl font-bold text-blue">
            {car?.make}
          </p>
          <p className="font-poppins text-3xl font-bold text-blue">
            {car?.model}
          </p>
        </div>
        <table className="w-full">
          <tr>
            <td>
              <p className="font-poppins text-xl text-green">Engine</p>
            </td>
            <td>
              <p className="font-poppins text-xl">{car?.engine}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="font-poppins text-xl text-green">Year</p>
            </td>
            <td>
              <p className="font-poppins text-xl">{car?.year}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="font-poppins text-xl text-green">Number plate</p>
            </td>
            <td>
              <p className="font-poppins text-xl">{car?.numberPlate}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p className="font-poppins text-xl text-green">Color</p>
            </td>
            <td>
              <p className="font-poppins text-xl">{car?.color}</p>
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
};

export default CarCard;
