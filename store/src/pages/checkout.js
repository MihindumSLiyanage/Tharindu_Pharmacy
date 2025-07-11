import React, { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { CardElement } from "@stripe/react-stripe-js";
import {
  IoReturnUpBackOutline,
  IoArrowForward,
  IoBagHandle,
  IoWalletSharp,
} from "react-icons/io5";
import { ImCreditCard } from "react-icons/im";

import Layout from "@layout/Layout";
import Label from "@component/form/Label";
import Error from "@component/form/Error";
import CartItem from "@component/cart/CartItem";
import InputArea from "@component/form/InputArea";
import InputPayment from "@component/form/InputPayment";
import useCheckoutSubmit from "@hooks/useCheckoutSubmit";
import InputShipping from "@component/form/InputShipping";
import Uploader from "@component/image-uploader/Uploader";
import useTranslation from "next-translate/useTranslation";
import cityShipping from "@utils/cityShipping";

const Checkout = () => {
  const {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    stripe,
    error,
    errors,
    showCard,
    setShowCard,
    coupon,
    couponRef,
    handleCouponCode,
    discountAmount,
    shippingCost,
    total,
    isEmpty,
    items,
    cartTotal,
    isCheckoutSubmit,
    removeCoupon,
    setImageUrls,
    imageUrls,
  } = useCheckoutSubmit();

  const { t } = useTranslation();

  const [selectedCity, setSelectedCity] = useState("");
  const [cityShippingCost, setCityShippingCost] = useState(0);

  const handleCityChange = (e) => {
    const cityName = e.target.value;
    setSelectedCity(cityName);
    const found = cityShipping.find((city) => city.name === cityName);
    const cost = found ? found.cost : 0;
    setCityShippingCost(cost);
    handleShippingCost(cost);
  };

  return (
    <>
      <Layout title="Checkout" description="this is checkout page">
        <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
          <div className="py-10 lg:py-12 px-0 2xl:max-w-screen-2xl w-full xl:max-w-screen-xl flex flex-col md:flex-row lg:flex-row">
            <div className="md:w-full lg:w-3/5 flex h-full flex-col order-2 sm:order-1 lg:order-1">
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={handleSubmit(submitHandler)}>
                  {/* Personal Details */}
                  <div className="form-group">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      01. {t("common:personalDetails")}
                    </h2>
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="First Name"
                          name="firstName"
                          type="text"
                          placeholder="John"
                        />
                        <Error errorName={errors.firstName} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Last name"
                          name="lastName"
                          type="text"
                          placeholder="Doe"
                        />
                        <Error errorName={errors.lastName} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Email address"
                          name="email"
                          type="email"
                          placeholder="youremail@gmail.com"
                        />
                        <Error errorName={errors.email} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label="Phone number"
                          name="contact"
                          type="tel"
                          placeholder="+011-1111111"
                        />
                        <Error errorName={errors.contact} />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Details */}
                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      02. {t("common:shippingDetails")}
                    </h2>
                    <div className="grid grid-cols-6 gap-6 mb-8">
                      <div className="col-span-6 sm:col-span-3">
                        <InputArea
                          register={register}
                          label={t("common:Address")}
                          name="address"
                          type="text"
                          placeholder="123 Colombo Rd, Kurunegala"
                        />
                        <Error errorName={errors.address} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <Label label={t("common:city")} />
                        <select
                          value={selectedCity}
                          onChange={handleCityChange}
                          className="form-select w-full h-12 px-4 py-2 rounded border border-gray-200 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="">Select City</option>
                          {cityShipping.map((city) => (
                            <option key={city.name} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </select>
                        <Error errorName={errors.city} />
                      </div>
                    </div>
                    <Label label="Shipping Cost" />
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputShipping
                          register={register}
                          value="Pickup From the Store"
                          description="Collect your order at the pharmacy"
                          cost={0}
                          handleShippingCost={() => {
                            setSelectedCity("Pickup From the Store");
                            setCityShippingCost(0);
                            handleShippingCost(0);
                          }}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3 space-y-2">
                        {selectedCity &&
                          selectedCity !== "Pickup From the Store" && (
                            <InputShipping
                              register={register}
                              value={selectedCity}
                              description={`Delivery to ${selectedCity}`}
                              cost={cityShippingCost}
                              handleShippingCost={() => {
                                handleShippingCost(cityShippingCost);
                              }}
                            />
                          )}
                        <Error errorName={errors.shippingOption} />
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      03. {t("common:paymentDetails")}
                    </h2>
                    {showCard && (
                      <div className="mb-3">
                        <CardElement />{" "}
                        <p className="text-red-400 text-sm mt-1">{error}</p>
                      </div>
                    )}
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:cashOnDelivery")}
                          value="Cash"
                          Icon={IoWalletSharp}
                        />
                        <Error errorName={errors.paymentMethod} />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <InputPayment
                          setShowCard={setShowCard}
                          register={register}
                          name={t("common:creditCard")}
                          value="Card"
                          Icon={ImCreditCard}
                        />
                        <Error errorMessage={errors.paymentMethod} />
                      </div>
                    </div>
                  </div>

                  {/* Prescription */}
                  <div className="form-group mt-12">
                    <h2 className="font-semibold font-serif text-base text-gray-700 pb-3">
                      04. {t("common:prescription")}
                    </h2>
                    <Uploader
                      imageUrls={imageUrls}
                      setImageUrls={setImageUrls}
                      folder="prescriptions"
                    />
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-6 gap-4 lg:gap-6 mt-10">
                    <div className="col-span-6 sm:col-span-3">
                      <Link href="/" className="w-full">
                        <span className="bg-indigo-50 border border-indigo-100 rounded py-3 text-center text-sm font-medium text-gray-700 hover:text-gray-800 hover:border-gray-300 transition-all flex justify-center font-serif w-full">
                          <span className="text-xl mr-2">
                            <IoReturnUpBackOutline />
                          </span>
                          {t("common:continueShoppingBtn")}
                        </span>
                      </Link>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <button
                        type="submit"
                        disabled={isEmpty || !stripe || isCheckoutSubmit}
                        className="bg-emerald-500 hover:bg-emerald-600 border border-emerald-500 transition-all rounded py-3 text-center text-sm font-serif font-medium text-white flex justify-center w-full"
                      >
                        {isCheckoutSubmit ? (
                          <span className="flex justify-center text-center">
                            {" "}
                            <img
                              src="/loader/spinner.gif"
                              alt="Loading"
                              width={20}
                              height={10}
                            />{" "}
                            <span className="ml-2">
                              {t("common:processing")}
                            </span>
                          </span>
                        ) : (
                          <span className="flex justify-center text-center">
                            {t("common:confirmOrderBtn")}
                            <span className="text-xl ml-2">
                              {" "}
                              <IoArrowForward />
                            </span>
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="md:w-full lg:w-2/5 lg:ml-10 xl:ml-14 md:ml-6 flex flex-col h-full md:sticky lg:sticky top-28 md:order-2 lg:order-2">
              <div className="border p-5 lg:px-8 lg:py-8 rounded-lg bg-white order-1 sm:order-2">
                <h2 className="font-semibold font-serif text-lg pb-4">
                  {t("common:orderSummary")}
                </h2>
                <div className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-64 bg-gray-50 block">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                  {isEmpty && (
                    <div className="text-center py-10">
                      <span className="flex justify-center my-auto text-gray-500 font-semibold text-4xl">
                        <IoBagHandle />
                      </span>
                      <h2 className="font-medium font-serif text-sm pt-2 text-gray-600">
                        No Item Added Yet!
                      </h2>
                    </div>
                  )}
                </div>

                {/* Coupon Section */}
                <div className="flex items-center mt-4 py-4 lg:py-4 text-sm w-full font-semibold text-heading last:border-b-0 last:text-base last:pb-0">
                  <form className="w-full">
                    {coupon ? (
                      <div className="bg-emerald-50 px-4 py-3 leading-tight w-full rounded-md flex justify-between">
                        <p className="text-emerald-600">Coupon Applied</p>
                        <div className="flex items-center">
                          <span className="text-red-500 text-right mr-2">
                            {coupon.couponCode}
                          </span>
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-gray-600 hover:text-gray-800 focus:outline-none"
                          >
                            (Remove)
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row items-start justify-end">
                        <input
                          ref={couponRef}
                          type="text"
                          placeholder="Input your coupon code"
                          className="form-input py-2 px-3 md:px-4 w-full appearance-none transition ease-in-out border text-input text-sm rounded-md h-12 duration-200 bg-white border-gray-200 focus:ring-0 focus:outline-none focus:border-emerald-500 placeholder-gray-500 placeholder-opacity-75"
                        />
                        <button
                          onClick={handleCouponCode}
                          className="md:text-sm leading-4 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold text-center justify-center border border-gray-200 rounded-md placeholder-white focus-visible:outline-none focus:outline-none px-5 md:px-6 lg:px-8 py-3 md:py-3.5 lg:py-3 mt-3 sm:mt-0 sm:ml-3 md:mt-0 md:ml-3 lg:mt-0 lg:ml-3 hover:text-white hover:bg-emerald-500 h-12 text-sm lg:text-base w-full sm:w-auto"
                        >
                          {t("common:applyBtn")}
                        </button>
                      </div>
                    )}
                  </form>
                </div>

                {/* Totals */}
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:subtotal")}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    Rs. {cartTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:shippingCost")}
                  <span className="ml-auto flex-shrink-0 text-gray-800 font-bold">
                    Rs. {shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center py-2 text-sm w-full font-semibold text-gray-500 last:border-b-0 last:text-base last:pb-0">
                  {t("common:discount")}
                  <span className="ml-auto flex-shrink-0 font-bold text-orange-400">
                    Rs. {discountAmount.toFixed(2)}
                  </span>
                </div>

                {/* Total Cost */}
                <div className="border-t mt-4">
                  <div className="flex items-center font-bold font-serif justify-between pt-5 text-sm uppercase">
                    {t("common:totalCost")}
                    <span className="font-serif font-extrabold text-lg">
                      Rs. {Math.round(total)}.00
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
