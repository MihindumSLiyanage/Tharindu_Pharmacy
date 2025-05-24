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
    if (coupon?.discount?.type === "fixed") {
      return coupon?.discount?.value || 0;
    } else if (coupon?.discount?.type === "percentage") {
      return (cartTotal * (coupon?.discount?.value || 0)) / 100;
    }
    return 0;
  };

  const handleShippingCost = (cost) => {
    setShippingCost(cost);
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

    const orderData = {
      cart: items,
      user_info: {
        name: `${data.firstName} ${data.lastName}`,
        contact: data.contact,
        email: data.email,
        address: data.address,
        city: data.city,
      },
      shippingOption: data.shippingOption,
      subTotal: cartTotal,
      shippingCost,
      discount: discountAmount,
      total,
      paymentMethod: data.paymentMethod,
      prescriptions: imageUrls,
      status: "Pending",
      user: userInfo?._id,
      coupon: coupon?._id,
    };

    try {
      if (data.paymentMethod === "Card") {
        if (!stripe || !elements) {
          notifyError("Stripe is not ready. Please wait a moment.");
          setIsCheckoutSubmit(false);
          return;
        }

        const { error: stripeError, paymentMethod } =
          await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
          });

        if (stripeError) {
          setError(stripeError.message);
          setIsCheckoutSubmit(false);
          return;
        }

        const paymentIntent = await OrderServices.createPaymentIntent({
          ...orderData,
          total: Math.round(total * 100),
          cardInfo: paymentMethod,
        });

        const confirmResult = await stripe.confirmCardPayment(
          paymentIntent.client_secret,
          {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          }
        );

        if (confirmResult.error) {
          setError(confirmResult.error.message);
          notifyError(confirmResult.error.message);
          setIsCheckoutSubmit(false);
          return;
        }

        const finalOrder = {
          ...orderData,
          cardInfo: confirmResult.paymentIntent,
        };

        const res = await OrderServices.addOrder(finalOrder);

        router.push(`/order/${res.order._id}`);
        notifySuccess("Your order was placed successfully!");
        Cookies.remove("coupon");
        emptyCart();
        sessionStorage.removeItem("products");
      }
    } catch (err) {
      notifyError(err.message || "Something went wrong.");
      setIsCheckoutSubmit(false);
    }
  };

  const handleCouponCode = async (e) => {
    e.preventDefault();

    if (!couponRef.current.value) {
      notifyError("Please input a coupon code");
      return;
    }

    const matched = coupons?.find(
      (cp) => cp.couponCode === couponRef.current.value
    );

    if (!matched) {
      notifyError("Invalid coupon code");
      return;
    }

    if (dayjs().isAfter(dayjs(matched.endTime))) {
      notifyError("This coupon has expired");
      return;
    }

    if (cartTotal < matched.minimumAmount) {
      notifyError(`Minimum order value is ${matched.minimumAmount}`);
      return;
    }

    setCoupon(matched);
    setIsCouponApplied(true);
    Cookies.set("coupon", JSON.stringify(matched));
    notifySuccess("Coupon applied successfully!");
  };

  return {
    stripe,
    register,
    errors,
    showCard,
    setShowCard,
    error,
    stripe,
    coupon,
    couponRef,
    total,
    isEmpty,
    items,
    cartTotal,
    handleSubmit,
    submitHandler,
    handleCouponCode,
    discountAmount,
    shippingCost,
    setShippingCost,
    handleShippingCost,
    isCheckoutSubmit,
    isCouponApplied,
    imageUrls,
    setImageUrls,
  };
};

export default useCheckoutSubmit;
