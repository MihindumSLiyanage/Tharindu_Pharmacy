import React, { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";

// internal import
import { UserContext } from "@context/UserContext";

const Footer = () => {
  const { t } = useTranslation();
  const {
    state: { userInfo },
  } = useContext(UserContext);

  return (
    <div className="pb-16 lg:pb-0 xl:pb-0 bg-white">
      <div className="mx-auto max-w-screen-2xl px-4 sm:px-10">
        <div className="grid grid-cols-2 md:grid-cols-7 xl:grid-cols-12 gap-5 sm:gap-9 lg:gap-11 xl:gap-7 py-10 lg:py-16 justify-between">
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              {t("common:footer-menu-title")}
            </h3>
            <ul className="text-sm flex flex-col space-y-3">
              <li>
                <Link href="/about-us">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-about-us")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/contact-us">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-contact-us")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-terms-and-conditions")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-privacy-policy")}
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              {t("common:footer-top-category")}
            </h3>
            <ul className="text-sm lg:text-15px flex flex-col space-y-3">
              <li>
                <Link href="/search?category=medicines">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-top-category-medicines")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/search?category=personal--care">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-top-category-personal-care")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/search?category=baby--care">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-top-category-baby-care")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/search?category=beauty--health">
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-top-category-health-wellness")}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <h3 className="text-md lg:leading-7 font-medium mb-4 sm:mb-5 lg:mb-6 pb-0.5">
              {t("common:footer-terms-and-policies")}
            </h3>
            <ul className="text-sm lg:text-15px flex flex-col space-y-3">
              <li>
                <Link href={userInfo?.email ? "/user/dashboard" : "#"}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-my-account-dashboard")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={userInfo?.email ? "/user/my-orders" : "#"}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-my-account-myOrders")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={userInfo?.email ? "/user/dashboard" : "#"}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-my-account-recentOrders")}
                  </a>
                </Link>
              </li>
              <li>
                <Link href={userInfo?.email ? "/user/update-profile" : "#"}>
                  <a className="text-gray-600 inline-block w-full hover:text-emerald-500">
                    {t("common:footer-my-account-updatedProfile")}
                  </a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2 lg:col-span-3">
            <Link href="/">
              <a className="mr-3 lg:mr-12 xl:mr-12" rel="noreferrer">
                <Image
                  width={270}
                  height={100}
                  src="/logo/logo.png"
                  alt="logo"
                  className="h-auto w-auto"
                />
              </a>
            </Link>
            <p className="leading-7 font-sans text-sm text-gray-600 mt-3">
              <span>{t("common:footer-address")}</span>
              <br />
              <span>{t("common:footer-tell")}</span>
              <br />
              <span>{t("common:footer-email")}</span>
            </p>
          </div>
        </div>

        <hr className="hr-line" />

        <div className="mx-auto max-w-screen-2xl px-4 sm:px-10 bg-gray-50 shadow-sm border border-gray-50 rounded-lg">
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-5 py-8 items-center justify-between">
            <div>
              <span className="text-base leading-7 font-medium block mb-2">
                {t("common:footer-follow-us")}
              </span>
              <ul className="text-sm flex">
                <li className="mr-3">
                  <Link href="https://www.linkedin.com">
                    <a target="_blank" rel="noreferrer">
                      <LinkedinIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link href="https://www.facebook.com">
                    <a target="_blank" rel="noreferrer">
                      <FacebookIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link href="https://wa.me/1234567890">
                    <a target="_blank" rel="noreferrer">
                      <WhatsappIcon size={34} round />
                    </a>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link href="https://twitter.com">
                    <a target="_blank" rel="noreferrer">
                      <TwitterIcon size={34} round />
                    </a>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center hidden lg:block md:block">
              <p className="text-base leading-7 font-medium block">
                {t("common:footer-call-us")}
              </p>
              <h5 className="text-2xl font-bold text-emerald-500 leading-7">
                037 - 2256 464
              </h5>
            </div>

            <div className="hidden lg:block md:block">
              <ul className="lg:text-right">
                <li className="px-1 mb-2 inline-flex">
                  <Image
                    width={274}
                    height={85}
                    className="w-full"
                    src="/payment-method/payment-logo.png"
                    alt="payment method"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10 flex justify-center py-4">
        <p className="text-sm text-gray-500 leading-6">
          Copyright 2025 @{" "}
          <Link href="/">
            <a
              className="text-emerald-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              Tharindu Pharmacy
            </a>
          </Link>
          , All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(Footer), { ssr: false });
