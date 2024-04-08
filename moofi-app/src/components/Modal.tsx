import { useNavigate } from "@tanstack/react-router";
import React, { useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, 100%)",
    borderRadius: "16px",
    width: "358px",
  },
};

type CustomModalProps = {
  isOpen: boolean;
  redirectLink: string;
  text: string;
};

export default function CustomModal({
  isOpen,
  redirectLink,
  text,
}: CustomModalProps) {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        navigate({ to: redirectLink });
      }, 2000);
    }
  }, [isOpen]);

  return (
    <Modal
      overlayClassName="bg-black/80 fixed top-0 right-0 bottom-0 left-0"
      isOpen={isOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div className="flex justify-center items-center mb-6">
        <svg
          className="animate-spin size-10 text-gray-900" // Adjust the size as needed
          width="88"
          height="88"
          viewBox="0 0 88 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M76.0832 74C82.041 66.4305 85.5951 56.8803 85.5951 46.5C85.5951 21.9233 65.6718 2 41.0951 2C24.5209 2 10.063 11.0612 2.40491 24.5"
            stroke="#1D3630"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 className="font-bold text-center text-xl text-green-500">{text}</h1>
    </Modal>
  );
}
