import React from "react";

const PrescriptionLabel = ({ required }) => {
  if (!required) return null;

  return (
    <span className="absolute top-2 right-2 bg-blue-700 text-white text-[10px] font-medium px-2 py-0.5 rounded-full shadow-md z-10">
      Prescription Required
    </span>
  );
};

export default PrescriptionLabel;
