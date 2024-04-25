import React, { useState, useEffect } from "react";
import Image from "next/image";
import { fetchPredictions, fetchPlaceDetails } from "../../utils/GoogleMapsApi";

const LocationInput = ({
  placeholder,
  onPlaceSelect,
  removeBtn,
  removeInputField,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState([]);

  const handleChange = async (e) => {
    setLoading(true);

    const value = e.target.value;
    setInputValue(value);
    try {
      const predictions = await fetchPredictions(value);
      setPredictions(predictions);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handlePlaceSelect = async (place) => {
    setLoading(true);

    try {
      const result = await fetchPlaceDetails(place);
      onPlaceSelect(result);
      setInputValue(place.description);
      setPredictions([]);

      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div className="w-full rounded-small bg-white flex">
        <div className="grid place-content-center w-14">
          <Image
            width={20}
            height={20}
            src="/webAssets/images/home/Group 126.png"
            alt="location"
          />
        </div>
        <input
          type="text"
          className="outline-none border-none p-4 rounded-small grow z-0"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
        {loading && (
          <div className="grid place-content-center w-12">
            <div
              className="w-8 h-8 rounded-full animate-spin
                border-4 border-solid border-green border-t-transparent"
            ></div>
          </div>
        )}
        {removeBtn && (
          <button
            className="text-red-600 py-3 px-6 rounded-md font-poppins font-semibold text-sm"
            onClick={() => removeInputField()}
          >
            Remove
          </button>
        )}
      </div>
      {predictions.length > 0 && (
        <ul className="absolute w-full bg-white rounded-small mt-1 overflow-hidden z-50">
          {predictions.map((prediction, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-green hover:text-white text-slate-500 font-semibold"
              onClick={() => handlePlaceSelect(prediction)}
            >
              {prediction.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationInput;
