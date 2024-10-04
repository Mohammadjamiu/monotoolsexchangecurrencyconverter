import React from "react";

const PopupCard = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50  ">
      <div className="bg-white rounded-lg shadow-lg p-6 w-80 ">
        <div className="flex items-center bg-transparent">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="text-[#163300] bg-white"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" x2="12" y1="8" y2="12" />
            <line x1="12" x2="12.01" y1="16" y2="16" />
          </svg>
          <span className="font-sourceSan ml-4 text-[#163300] font-semibold text-lg bg-white">
            {message}
          </span>
        </div>
        <div className="flex justify-end mt-4 bg-white">
          <button
            onClick={onClose}
            className="font-sourceSans bg-[#163300] hover:bg-[#316d03] text-white px-2 py-1 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
