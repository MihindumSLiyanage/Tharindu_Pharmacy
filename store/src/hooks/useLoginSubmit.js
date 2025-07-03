import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import CustomerServices from "@services/CustomerServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = (mode, setModalOpen) => {
  const router = useRouter();
  const { redirect } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (mode === "login") {
      CustomerServices.customerLogin({
        email: data.email,
        password: data.password,
      })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          router.push(redirect || "/");
          notifySuccess("Login Success!");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("userInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
          });
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err?.response?.data?.message || err.message);
        });
    } else if (mode === "register") {
      CustomerServices.verifyEmailAddress({
        name: data.name,
        email: data.email,
        password: data.password,
      })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err?.response?.data?.message || err.message);
        });
    } else if (mode === "forgot") {
      CustomerServices.forgotPassword({ verifyEmail: data.verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
          setValue("verifyEmail", "");
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err?.response?.data?.message || err.message);
        });
    }
  };

  return {
    handleSubmit,
    submitHandler,
    register,
    errors,
    loading,
  };
};

export default useLoginSubmit;
