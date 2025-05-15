// Stock.js
import React from "react";

const Stock = ({ stock, card }) => {
  const baseClass =
    "absolute top-4 left-4 z-10 px-2 py-0.5 text-xs font-semibold rounded-full whitespace-nowrap";

  return (
    <>
      {stock <= 0 ? (
        <span className={`${baseClass} bg-red-600 text-white`}>Stock Out</span>
      ) : (
        <span
          className={`${baseClass} ${
            card
              ? "bg-emerald-600 text-white"
              : "bg-emerald-100 text-emerald-700 border border-emerald-300"
          }`}
        >
          Stock: {stock}
        </span>
      )}
    </>
  );
};

export default Stock;
