import React, { useContext, useState, useEffect } from "react";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiPhoneCall, FiUser } from "react-icons/fi";
import Cookies from "js-cookie";

import LoginModal from "@component/modal/LoginModal";
import { UserContext } from "@context/UserContext";

const NavBarTop = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    state: { userInfo },
    dispatch,
  } = useContext(UserContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleLoginClick = () => {
    if (userInfo?.email) {
      router.push("/user/dashboard");
    } else {
      setModalOpen(true);
    }
  };

  const handleLogout = () => {
    Cookies.remove("userInfo");
    localStorage.removeItem("hasUploadedPrescription");
    dispatch({ type: "USER_LOGOUT" });
    router.push("/");
    window.location.reload();
  };

  return (
    <>
      {modalOpen && (
        <LoginModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      )}

      <div className="hidden lg:block bg-gray-100">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10">
          <div className="text-gray-700 py-2 font-sans text-xs font-medium border-b flex justify-between items-center">
            <span className="flex items-center">
              <FiPhoneCall className="mr-2" />
              We are available 24/7, Need help? Call Us:{" "}
              <a
                href="tel:+94372230564"
                className="font-bold text-emerald-500 ml-1"
              >
                +94372230564
              </a>
            </span>

            <div className="lg:text-right flex items-center">
              <Link href="/about-us">
                <a className="font-medium hover:text-emerald-600">
                  {" "}
                  {t("common:About Us")}
                </a>
              </Link>
              <span className="mx-2">|</span>
              <Link href="/contact-us">
                <a className="font-medium hover:text-emerald-600">
                  {" "}
                  {t("common:Contact Us")}
                </a>
              </Link>
              <span className="mx-2">|</span>
              {hasMounted &&
                (userInfo ? (
                  <button
                    onClick={handleLogout}
                    className="flex items-center font-medium hover:text-red-600"
                  >
                    <span className="mr-1">
                      <FiUser />
                    </span>
                    {t("common:logout")}
                  </button>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center font-medium hover:text-emerald-600"
                  >
                    <span className="mr-1">
                      <FiUser />
                    </span>
                    {t("common:Login")}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBarTop;
