import Image from "next/image";
import React from "react";

const SocialButton = ({ social, onClick, imgSrc, bgColor }) => {
  return (
    <button
      className={`outline-none border-none ${bgColor} text-md text-white font-poppins flex items-center p-2 rounded-large w-full md:w-3/4`}
      onClick={onClick}
    >
      <div className="">
        <Image width={40} height={40} src={imgSrc} alt={social} objectFit="contain"/>
      </div>
      <span className="text-lg grow">{`Continue with ${social}`}</span>
    </button>
  );
};

export default SocialButton;
