import React from "react";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, message, buttonText, buttonAction }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notice</h2>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              if (buttonAction) {
                navigate(buttonAction);
              }
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
