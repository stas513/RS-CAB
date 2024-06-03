import React from "react";

const DetailsColumn = ({ title, children, className, btn }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      <div className="flex justify-between items-center">
        <p className="font-poppins ps-8 text-2xl font-semibold ">{title}</p>
        {btn}
      </div>
      <div className="w-full rounded-[20px] p-8 border-2 border-slate-300">
        {children}
      </div>
    </div>
  );
};

export default DetailsColumn;
