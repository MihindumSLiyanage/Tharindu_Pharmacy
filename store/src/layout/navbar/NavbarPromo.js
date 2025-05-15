import { Fragment, useState, useEffect } from "react";
import Link from "next/link";
import { Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import SettingServices from "@services/SettingServices";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

import Category from "@component/category/Category";
import { notifyError } from "@utils/toast";

const NavbarPromo = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { locale } = router;
  const [data, setData] = useState([]);
  const [currentLang, setCurrentLang] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await SettingServices.getAllLanguages();
        setData(res);

        const result = res?.find((lang) => lang?.iso_code === locale);
        setCurrentLang(result);
      } catch (err) {
        notifyError(err);
      }
    })();
  }, [locale]);

  return (
    <>
      <div className="hidden lg:block xl:block bg-white border-b">
        <div className="max-w-screen-2xl mx-auto px-3 sm:px-10 h-12 flex justify-between items-center">
          <div className="inline-flex">
            <Popover className="relative">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center md:justify-start md:space-x-10">
                  <Popover.Group
                    as="nav"
                    className="md:flex space-x-10 items-center"
                  >
                    <Popover className="relative font-serif">
                      <Popover.Button className="group inline-flex items-center py-2 hover:text-emerald-600 focus:outline-none">
                        <span className="font-serif text-sm font-medium">
                          {t("common:Categories")}
                        </span>
                        <ChevronDownIcon
                          className="ml-1 h-3 w-3 group-hover:text-emerald-600"
                          aria-hidden="true"
                        />
                      </Popover.Button>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute z-10 -ml-1 mt-1 transform w-screen max-w-xs c-h-65vh bg-white">
                          <div
                            className="rounded-md shadow-lg ring-1 ring-black ring-opacity-5 overflow-y-auto flex-grow scrollbar-hide w-full h-full"
                            style={{ height: "105%" }}
                          >
                            <Category />
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </Popover>

                    <Link href="/about-us">
                      <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                        {t("common:About Us")}
                      </a>
                    </Link>
                    <Link href="/contact-us">
                      <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                        {t("common:Contact Us")}
                      </a>
                    </Link>
                    <Link href="/faq">
                      <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                        {t("common:FAQ")}
                      </a>
                    </Link>
                    <Link href="/offer">
                      <a className="relative inline-flex items-center h-6 bg-red-100 font-serif ml-4 py-0 px-2 rounded text-sm font-medium text-red-500 hover:text-emerald-600">
                        {t("common:Offers")}
                        <div className="absolute flex w-2 h-2 left-auto -right-1 -top-1">
                          <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </div>
                      </a>
                    </Link>
                  </Popover.Group>
                </div>
              </div>
            </Popover>
          </div>
          <div className="flex items-center mx-4">
            <div className="dropdown group relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="dropbtn font-serif text-sm font-medium flex items-center space-x-2 hover:text-emerald-600 focus:outline-none"
              >
                <div
                  className={`flag ${currentLang?.flag?.toLowerCase()} w-[25px] h-[20px]`}
                ></div>
                <span>{currentLang?.name}</span>
                <i className="fas fa-angle-down text-xs"></i>
              </button>

              {isDropdownOpen && (
                <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 p-2 z-50">
                  {data.map((language, i) => (
                    <Link key={i} href="/" locale={language.iso_code}>
                      <a
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center p-2 text-sm font-serif text-black hover:bg-gray-100 cursor-pointer"
                      >
                        <div
                          className={`flag ${language?.flag?.toLowerCase()} mr-2 h-5 w-[25px]`}
                        ></div>
                        {language?.name}
                      </a>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center">
              <Link href="/privacy-policy">
                <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                  {t("common:Privacy Policy")}
                </a>
              </Link>
              <Link href="/terms-and-conditions">
                <a className="font-serif mx-4 py-2 text-sm font-medium hover:text-emerald-600">
                  {t("common:Terms & Conditions")}
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarPromo;
