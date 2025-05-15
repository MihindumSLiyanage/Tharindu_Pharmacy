import React from "react";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <Layout title="About Us" description="This is about us page">
      <PageHeader title="about-page-title" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="grid grid-flow-row lg:grid-cols-2 gap-4 lg:gap-16 items-center">
            <div className="">
              <h3 className="text-xl lg:text-3xl mb-2 font-serif font-semibold">
                {t("common:about-section-title")}
              </h3>
              <div className="mt-3 text-base opacity-90 leading-7">
                <p>{t("common:about-section-top-paragraph1")}</p>

                <p>{t("common:about-section-top-paragraph2")}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-2 xl:gap-6 mt-8">
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                    10K
                  </span>
                  <h4 className="text-lg font-serif font-bold mb-1">
                    {t("common:about-listed-products-box-title")}
                  </h4>
                  <p className="mb-0 opacity-90 leading-7">
                    {t("common:about-listed-products-box-text")}
                  </p>
                </div>
                <div className="p-8 bg-indigo-50 shadow-sm rounded-lg">
                  <span className="text-3xl block font-extrabold font-serif mb-4 text-gray-800">
                    8K
                  </span>
                  <h4 className="text-lg font-serif font-bold mb-1">
                    {t("common:about-customer-box-title")}
                  </h4>
                  <p className="mb-0 opacity-90 leading-7">
                    {t("common:about-customers-box-text")}
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <Image width={920} height={750} src="/about-us.png" alt="logo" />
            </div>
          </div>
          <div className="mt-10 lg:mt-16 text-base opacity-90 leading-7">
            <p>{t("common:about-section-top-paragraph3")}</p>

            <p>{t("common:about-section-top-paragraph4")}</p>
          </div>
          <div className="mt-10 lg:mt-12 flex flex-col sm:grid gap-4">
            <Image
              width={1920}
              height={570}
              src="/about-medicines.jpg"
              alt="logo"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
