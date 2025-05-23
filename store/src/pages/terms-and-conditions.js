import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";

const TermAndConditions = () => {
  const { t } = useTranslation();
  return (
    <Layout
      title="Terms & Conditions"
      description="This is terms and conditions page"
    >
      <PageHeader title="Terms & Conditions" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-3 sm:px-10">
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:terms-condition-welcome")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:terms-condition-welcome-docs1")}</p>
              <p>{t("common:terms-condition-welcome-docs2")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:terms-condition-license")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:terms-condition-license-docs")}</p>

              <ul>
                <strong className="mb-2">
                  {" "}
                  {t("common:terms-condition-license-docs0")}
                </strong>
                <li>{t("common:terms-condition-license-docs1")}</li>
                <li>{t("common:terms-condition-license-docs2")}</li>
                <li>{t("common:terms-condition-license-docs3")}</li>
                <li>{t("common:terms-condition-license-docs4")}</li>
                <li> {t("common:terms-condition-license-docs5")}</li>
                <li>{t("common:terms-condition-license-docs6")}</li>
                <li>{t("common:terms-condition-license-docs7")}</li>
              </ul>
              <p>{t("common:terms-condition-license-docs8")}</p>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                {t("common:terms-condition-liability")}
              </h2>
              <div className="font-sans leading-7">
                <p>{t("common:terms-condition-liability-docs")}</p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                {t("common:terms-condition-privacy")}
              </h2>
              <div className="font-sans leading-7">
                <p>
                  {t("common:terms-condition-privacy-docs1")}
                  <Link href="/privacy-policy" className="text-emerald-500">
                    {t("common:terms-condition-privacy-docs2")}
                  </Link>{" "}
                </p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                {t("common:terms-condition-rights")}
              </h2>
              <div className="font-sans leading-7">
                <p>{t("common:terms-condition-rights-docs")}</p>
              </div>
            </div>
            <div className="my-6 lg:my-8 last:mb-0">
              <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
                {t("common:terms-condition-disclaimer")}
              </h2>
              <div className="font-sans leading-7">
                <p>{t("common:terms-condition-disclaimer-docs")}</p>
                <ul>
                  <li>{t("common:terms-condition-disclaimer-docs1")}</li>
                  <li>{t("common:terms-condition-disclaimer-docs2")}</li>
                  <li>{t("common:terms-condition-disclaimer-docs3")}</li>
                  <li>{t("common:terms-condition-disclaimer-docs4")}</li>
                </ul>
                <p>{t("common:terms-condition-disclaimer-docs5")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TermAndConditions;
