import React from "react";
import Link from "next/link";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

const FooterTop = () => {
  const { t } = useTranslation();

  return (
    <div
      id="downloadApp"
      className="bg-indigo-50 py-10 lg:py-16 bg-repeat bg-center overflow-hidden"
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-2 md:gap-3 lg:gap-3 items-center">
          <div className="flex-grow hidden lg:flex md:flex md:justify-items-center lg:justify-start">
            <Link href="/">
              <a>
                <Image
                  src="/app-download-img-left.jpg"
                  alt="app download"
                  width={500}
                  height={350}
                  className="block w-auto"
                />
              </a>
            </Link>
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold font-serif mb-3">
              {t("common:footer-top-title")}
            </h3>
            <p className="text-base opacity-90 leading-7">
              {t("common:footer-top-paragraph-text")}
            </p>
            <div className="mt-8">
              <Link href="/">
                <a target="_blank" rel="noreferrer">
                  <Image
                    width={170}
                    height={50}
                    className="mr-2 rounded"
                    src="/app/app-store.svg"
                    alt="app store"
                  />
                </a>
              </Link>

              <Link href="https://play.google.com/store/apps">
                <a target="_blank" rel="noreferrer">
                  <Image
                    width={170}
                    height={50}
                    className="rounded"
                    src="/app/play-store.svg"
                    alt="play store"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="md:hidden lg:block">
            <div className="flex-grow hidden lg:flex md:flex lg:justify-end">
              <Link href="/">
                <a>
                  <Image
                    src="/app-download-img.png"
                    width={500}
                    height={394}
                    alt="app download"
                    className="block w-auto"
                  />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
