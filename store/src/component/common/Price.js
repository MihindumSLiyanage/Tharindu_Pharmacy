// Price.js
import React from "react";

const Price = ({ product, card }) => {
  const price = product?.prices?.price;
  const originalPrice = product?.prices?.originalPrice;
  const discount = product?.prices?.discount;

  return (
    <div className="font-serif product-price font-bold">
      <span
        className={
          card
            ? "inline-block text-lg font-semibold text-gray-800"
            : "inline-block text-2xl"
        }
      >
        Rs. {price}
      </span>

      {discount > 0 && originalPrice > price ? (
        <del
          className={
            card
              ? "sm:text-sm font-normal text-base text-gray-400 ml-1"
              : "text-lg font-normal text-gray-400 ml-1"
          }
        >
          Rs. {parseFloat(originalPrice).toFixed(2)}
        </del>
      ) : null}
    </div>
  );
};

export default Price;
