import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import ReactToPrint from "react-to-print";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { IoCloudDownloadOutline, IoPrintOutline } from "react-icons/io5";
import useTranslation from "next-translate/useTranslation";

import Layout from "@layout/Layout";
import Invoice from "@component/invoice/Invoice";
import Loading from "@component/preloader/Loading";
import OrderServices from "@services/OrderServices";
import { UserContext } from "@context/UserContext";
import InvoiceForDownload from "@component/invoice/InvoiceForDownload";

const Order = ({ params }) => {
  const printRef = useRef();
  const orderId = params.id;
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    state: { userInfo },
  } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        const res = await OrderServices.getOrderById(orderId);
        setData(res);
        console.log(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.log("err", err.message);
      }
    })();

    if (!userInfo) {
      router.push("/");
    }
  }, []);

  const { t } = useTranslation();

  return (
    <Layout title="Invoice" description="order confirmation page">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="max-w-screen-2xl mx-auto py-10 px-3 sm:px-6">
          <div className="bg-emerald-100 rounded-md mb-5 px-4 py-3">
            <label>
              {t("common:thankyou")}{" "}
              <span className="font-bold text-emerald-600">{data.name},</span>{" "}
              {t("common:orderReceivedMsg")}
            </label>
          </div>
          <div className="bg-white rounded-lg shadow-sm">
            <Invoice data={data} printRef={printRef} />
            <div className="bg-white p-8 rounded-b-xl">
              <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between">
                <PDFDownloadLink
                  document={<InvoiceForDownload data={data} />}
                  fileName="Invoice"
                >
                  {({ loading }) =>
                    loading ? (
                      "Loading..."
                    ) : (
                      <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 focus:ring focus:ring-purple-300 w-auto">
                        {t("common:downloadInvoice")}{" "}
                        <span className="ml-2 text-base">
                          <IoCloudDownloadOutline />
                        </span>
                      </button>
                    )
                  }
                </PDFDownloadLink>

                <ReactToPrint
                  trigger={() => (
                    <button className="mb-3 sm:mb-0 md:mb-0 lg:mb-0 flex items-center justify-center bg-emerald-500  text-white transition-all font-serif text-sm font-semibold h-10 py-2 px-5 rounded-md">
                      {t("common:printInvoice")}{" "}
                      <span className="ml-2">
                        <IoPrintOutline />
                      </span>
                    </button>
                  )}
                  content={() => printRef.current}
                  documentTitle="Invoice"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export const getServerSideProps = ({ params }) => {
  return {
    props: { params },
  };
};

export default dynamic(() => Promise.resolve(Order), { ssr: false });
