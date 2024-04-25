import { Icon } from "@iconify/react";
import React from "react";

const Modal = ({ isOpen, onClose, children, className }) => {
  return (
    <>
      <div className={`fixed inset-0 flex justify-center items-center z-30 ${isOpen ? '' : 'hidden'}`}>
        <div className="bg-black opacity-50 absolute inset-0" onClick={onClose}></div>
        <div className={`transform bg-white p-4 rounded-3xl shadow-lg transition-transform duration-300 ease-in-out ${className}`}>
          <button
            onClick={onClose}
            className="absolute top-2 left-2 text-gray-600 hover:text-gray-800"
          >
            {isOpen ? <Icon icon="ion:close" fontSize={36} /> : "Open"}
          </button>
          <div className="max-h-[80vh] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
