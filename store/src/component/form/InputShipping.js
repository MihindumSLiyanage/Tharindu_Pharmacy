import React from "react";
import { FiTruck } from "react-icons/fi";

const InputShipping = ({
  register,
  value,
  description,
  cost,
  handleShippingCost,
}) => {
  return (
    <div className="p-3 card border border-gray-200 bg-white rounded-md">
      <label className="cursor-pointer label">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl mr-3 text-gray-400">
              <FiTruck />
            </span>
            <div>
              <h6 className="font-serif font-medium text-sm text-gray-600">
                {value}
              </h6>
              <p className="text-xs text-gray-500 font-medium">
                {description}{" "}
                <span className="font-medium text-gray-600">
                  {cost > 0 ? `Cost: Rs.${cost}.00` : "Free"}
                </span>
              </p>
            </div>
          </div>
          <input
            onClick={() => handleShippingCost(cost)}
            {...register("shippingOption", {
              required: "Shipping Option is required!",
            })}
            name="shippingOption"
            type="radio"
            value={value}
            className="form-radio outline-none focus:ring-0 text-emerald-500"
          />
        </div>
      </label>
    </div>
  );
};

export default InputShipping;
