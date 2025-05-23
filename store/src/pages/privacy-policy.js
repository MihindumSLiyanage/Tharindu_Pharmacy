import React from "react";
import useTranslation from "next-translate/useTranslation";

import Layout from "@layout/Layout";
import PageHeader from "@component/header/PageHeader";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  return (
    <Layout title="Privacy Policy" description="This is privacy policy page">
      <PageHeader title="privacy-policy-page" />
      <div className="bg-white">
        <div className="max-w-screen-2xl mx-auto lg:py-20 py-10 px-4 sm:px-10">
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-update-date")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-update-date-docs1")}</p>
              <p>{t("common:privacy-policy-update-date-docs2")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-consent")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-consent-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-information")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-information-docs1")}</p>
              <p>{t("common:privacy-policy-information-docs2")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-use-information")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-use-information-docs")}</p>

              <ol>
                <li>{t("common:privacy-policy-use-information-docs1")}</li>
                <li>{t("common:privacy-policy-use-information-docs2")}</li>
                <li>{t("common:privacy-policy-use-information-docs3")}</li>
                <li>{t("common:privacy-policy-use-information-docs4")}</li>
                <li>{t("common:privacy-policy-use-information-docs5")}</li>
                <li>{t("common:privacy-policy-use-information-docs6")}</li>
                <li>{t("common:privacy-policy-use-information-docs7")}</li>
              </ol>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-log-file")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-log-file-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-advertising")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-advertising-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-third-party")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-third-party-docs1")}</p>
              <p>{t("common:privacy-policy-third-party-docs2")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-ccpa-rights")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-ccpa-rights-docs")}</p>
            </div>
          </div>
          <div className="mb-8 lg:mb-12 last:mb-0">
            <h2 className="text-xl xl:text-2xl xl:leading-7 font-semibold font-serif mb-2 lg:mb-4">
              {t("common:privacy-policy-children-information")}
            </h2>
            <div className="font-sans leading-7">
              <p>{t("common:privacy-policy-children-information-docs1")}</p>
              <p>{t("common:privacy-policy-children-information-docs2")}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
