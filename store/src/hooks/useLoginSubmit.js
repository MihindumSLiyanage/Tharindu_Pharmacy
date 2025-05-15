import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import UserServices from "@services/UserServices";
import { UserContext } from "@context/UserContext";
import { notifyError, notifySuccess } from "@utils/toast";

const useLoginSubmit = (setModalOpen) => {
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

  const submitHandler = ({ name, email, verifyEmail, password }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    if (email && password) {
      UserServices.userLogin({
        email,
        password,
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
          notifyError(err ? err.response.data.message : err.message);
          setLoading(false);
        });
    }
    if (name && email && password) {
      UserServices.verifyEmailAddress({ name, email, password })
        .then((res) => {
          setLoading(false);
          setModalOpen(false);
          notifySuccess(res.message);
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err.response.data.message);
        });
    }
    if (verifyEmail) {
      UserServices.forgotPassword({ verifyEmail })
        .then((res) => {
          setLoading(false);
          notifySuccess(res.message);
          setValue("verifyEmail");
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err ? err.response.data.message : err.message);
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
