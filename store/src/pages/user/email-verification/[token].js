import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { notifySuccess, notifyError } from "@utils/toast";
import CustomerServices from "@services/CustomerServices";
import { UserContext } from "@context/UserContext";
import Loading from "@component/preloader/Loading";

const EmailVerification = () => {
  const router = useRouter();
  const { token } = router.query;
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    CustomerServices.customerRegister(token)
      .then((res) => {
        notifySuccess("Email verified. Welcome!");
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("userInfo", JSON.stringify(res));
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Verification failed";
        notifyError(message);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      {loading && <Loading loading={loading} />}
    </div>
  );
};

export default EmailVerification;
