import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { IoLockOpenOutline } from "react-icons/io5";
import { FiCheck, FiRefreshCw, FiShoppingCart, FiTruck } from "react-icons/fi";

import Layout from "@layout/Layout";
import { userSidebar } from "@utils/data";
import Card from "@component/order-card/Card";
import { UserContext } from "@context/UserContext";
import OrderServices from "@services/OrderServices";
import RecentOrder from "@pages/user/recent-order";
import { SidebarContext } from "@context/SidebarContext";

const Dashboard = ({ title, description, children }) => {
  const router = useRouter();
  const {
    dispatch,
    state: { userInfo },
  } = useContext(UserContext);

  const { setIsLoading, currentPage } = useContext(SidebarContext);

  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userInfo) return;

    OrderServices.getOrderByCustomer({
      page: currentPage,
      limit: 8,
      customer: userInfo._id,
    })
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  }, [currentPage, userInfo]);

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("userInfo");
    Cookies.remove("couponInfo");
    router.push("/");
  };

  useEffect(() => {
    setIsLoading(false);
    if (!userInfo) {
      router.push("/");
    }
  }, [userInfo]);

  return (
    <Layout
      title={title ? title : "Dashboard"}
      description={description ? description : "This is User Dashboard"}
    >
      <div className="mx-auto max-w-screen-2xl px-3 sm:px-10">
        <div className="py-10 lg:py-12 flex flex-col lg:flex-row w-full">
          <div className="flex-shrink-0 w-full lg:w-80 mr-7 lg:mr-10  xl:mr-10 ">
            <div className="bg-white p-4 sm:p-5 lg:p-8 rounded-md sticky top-32">
              {userSidebar.map((item) => (
                <span
                  key={item.title}
                  className="p-2 my-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                >
                  <item.icon
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <Link href={item.href}>
                    <a className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                      {item.title}
                    </a>
                  </Link>
                </span>
              ))}
              <span className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600">
                <span className="mr-2">
                  <IoLockOpenOutline />
                </span>{" "}
                <button
                  onClick={handleLogOut}
                  className="inline-flex items-center justify-between text-sm font-medium w-full hover:text-emerald-600"
                >
                  Logout
                </button>
              </span>
            </div>
          </div>
          <div className="w-full bg-white mt-4 lg:mt-0 p-4 sm:p-5 lg:p-8 rounded-md overflow-hidden">
            {!children && (
              <div className="overflow-hidden">
                <h2 className="text-xl font-serif font-semibold mb-5">
                  Dashboard
                </h2>
                <div className="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-4">
                  <Card
                    title="Total Order"
                    Icon={FiShoppingCart}
                    quantity={data?.totalDoc}
                    className="text-red-600  bg-red-200"
                  />
                  <Card
                    title="Pending Order"
                    Icon={FiRefreshCw}
                    quantity={data?.pending}
                    className="text-orange-600 bg-orange-200"
                  />
                  <Card
                    title="Processing Order"
                    Icon={FiTruck}
                    quantity={data?.processing}
                    className="text-indigo-600 bg-indigo-200"
                  />
                  <Card
                    title="Complete Order"
                    Icon={FiCheck}
                    quantity={data?.delivered}
                    className="text-emerald-600 bg-emerald-200"
                  />
                </div>
                <RecentOrder data={data} loading={loading} error={error} />
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Dashboard), { ssr: false });
