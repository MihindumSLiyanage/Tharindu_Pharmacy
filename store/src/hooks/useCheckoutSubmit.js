import Cookies from "js-cookie";
import * as dayjs from "dayjs";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useCart } from "react-use-cart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAsync from "@hooks/useAsync";
import { UserContext } from "@context/UserContext";
import CouponServices from "@services/CouponServices";
import OrderServices from "@services/OrderServices";
import { notifyError, notifySuccess } from "@utils/toast";

const useCheckoutSubmit = () => {
  const {
    state: { userInfo, shippingAddress },
    dispatch,
  } = useContext(UserContext);
  
  const [error, setError] = useState("");
  const [total, setTotal] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [shippingCost, setShippingCost] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [isCheckoutSubmit, setIsCheckoutSubmit] = useState(false);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);

  const { isEmpty, emptyCart, items, cartTotal } = useCart();

  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const couponRef = useRef("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { data: coupons } = useAsync(CouponServices.getAllCoupons);

  useEffect(() => {
    const storedCoupon = Cookies.get("coupon");
    if (storedCoupon) {
      const parsedCoupon = JSON.parse(storedCoupon);
      setCoupon(parsedCoupon);
      setIsCouponApplied(true);
    }
  }, []);

  useEffect(() => {
    let calculatedTotal = cartTotal + Number(shippingCost);

    if (coupon) {
      const discount = calculateDiscount(cartTotal, coupon);
      calculatedTotal -= discount;
      setDiscountAmount(discount);
    } else {
      setDiscountAmount(0);
    }

    setTotal(calculatedTotal > 0 ? calculatedTotal : 0);
  }, [cartTotal, shippingCost, coupon]);

  const calculateDiscount = (cartTotal, coupon) => {
    let discountAmount = 0;
    if (coupon?.discount?.type === "fixed") {
      discountAmount = coupon?.discount?.value || 0;
    } else if (coupon?.discount?.type === "percentage") {
      discountAmount = (cartTotal * (coupon?.discount?.value || 0)) / 100;
    }
    return discountAmount;
  };

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
    }
    setValue("firstName", shippingAddress.firstName);
    setValue("lastName", shippingAddress.lastName);
    setValue("address", shippingAddress.address);
    setValue("contact", shippingAddress.contact);
    setValue("email", shippingAddress.email);
    setValue("city", shippingAddress.city);
  }, [setValue, shippingAddress, userInfo, router]);

  const submitHandler = async (data) => {
    dispatch({ type: "SAVE_SHIPPING_ADDRESS", payload: data });
    Cookies.set("shippingAddress", JSON.stringify(data));
    setIsCheckoutSubmit(true);
    setError("");

    const prescriptionRequired = items.some(
      (item) => item.requiresPrescription
    );

    if (prescriptionRequired && imageUrls.length === 0) {
      notifyError("Prescription is required for item in your cart.");
      setIsCheckoutSubmit(false);
      return;
    }

    let userInfoData = {
      name: `${data.firstName} ${data.lastName}`,
      contact: data.contact,
      email: data.email,
      address: data.address,
      city: data.city,
    };

    const orderData = {
      user_info: userInfoData,
      shippingOption: data.shippingOption,
      paymentMethod: data.paymentMethod,
      status: "Pending",
      cart: items,
      subTotal: cartTotal,
      shippingCost: shippingCost,
      discount: discountAmount,
      total: total,
      prescriptions: imageUrls,
      user: userInfo?._id,
      coupon: coupon?._id,
    };

    if (data.paymentMethod === "Card") {
      if (!stripe || !elements) {
        return;
      }

      try {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
          type: "card",
          card: elements.getElement(CardElement),
        });

        if (error) {
          setError(error.message);
          setIsCheckoutSubmit(false);
          return;
        }

        const { client_secret } = await OrderServices.createPaymentIntent(
          orderData
        );

        const { paymentIntent } = await stripe.confirmCardPayment(
          client_secret,
          {
            payment_method: paymentMethod.id,
          }
        );

        if (paymentIntent.status === "succeeded") {
          const orderWithCard = {
            ...orderData,
            paymentId: paymentIntent.id,
          };

          completeOrder(orderWithCard);
        } else {
          notifyError("Payment failed, please try again.");
          setIsCheckoutSubmit(false);
        }
      } catch (err) {
        notifyError(err?.response?.data?.message || err.message);
        setIsCheckoutSubmit(false);
      }
    } else if (data.paymentMethod === "Cash") {
      completeOrder(orderData);
    }
  };

  const completeOrder = async (orderData) => {
    try {
      const res = await OrderServices.addOrder(orderData);
      router.push(`/order/${res.order._id}`);
      notifySuccess("Your Order Confirmed!");
      Cookies.remove("coupon");
      emptyCart();
      sessionStorage.removeItem("products");
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setIsCheckoutSubmit(false);
    }
  };

  const handleShippingCost = (value) => {
    setShippingCost(value);
  };

  const handleCouponCode = (e) => {
    e.preventDefault();
    const couponCode = couponRef.current.value;

    if (!couponCode) {
      notifyError("Please Input a Coupon Code!");
      return;
    }

    const foundCoupon = coupons?.find(
      (coupon) => coupon.couponCode === couponCode
    );

    if (!foundCoupon) {
      notifyError("Please Input a Valid Coupon!");
      return;
    }

    if (dayjs().isAfter(dayjs(foundCoupon?.endTime))) {
      notifyError("This coupon is not valid!");
      return;
    }

    if (cartTotal < foundCoupon?.minimumAmount) {
      notifyError(
        `Minimum Rs. ${foundCoupon.minimumAmount} required for Apply this coupon!`
      );
      return;
    }

    if (foundCoupon.status !== "show") {
      notifyError("This coupon is not active.");
      return;
    }

    notifySuccess(
      `Your Coupon ${foundCoupon.title} is Applied on ${foundCoupon.productType}!`
    );
    setIsCouponApplied(true);
    setCoupon(foundCoupon);
    Cookies.set("coupon", JSON.stringify(foundCoupon));
  };

  const removeCoupon = () => {
    setCoupon(null);
    Cookies.remove("coupon");
    setIsCouponApplied(false);
    notifySuccess("Coupon removed.");
  };

  return {
    handleSubmit,
    submitHandler,
    handleShippingCost,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
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
    isCouponApplied,
    removeCoupon,
    imageUrls,
    setImageUrls,
  };
};

export default useCheckoutSubmit;
