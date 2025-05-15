import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { IoDocumentText } from "react-icons/io5";
import { notifySuccess, notifyError } from "@utils/toast";
import Dashboard from "@pages/user/dashboard";
import OrderServices from "@services/OrderServices";
import Loading from "@component/preloader/Loading";
import { UserContext } from "@context/UserContext";
import PrescriptionHistory from "@component/prescription/PrescriptionHistory";

const MyPrescriptions = () => {
  const router = useRouter();
  const {
    state: { userInfo },
  } = useContext(UserContext);
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const response = await OrderServices.getPrescriptionsByUser();
      if (response && response.prescriptions) {
        setPrescriptions(response.prescriptions);
      } else {
        setError("Failed to fetch prescriptions: Invalid response");
      }
    } catch (err) {
      setError("Failed to fetch prescriptions.");
      console.error("Error fetching prescriptions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userInfo) {
      router.push("/");
      return;
    }
    fetchPrescriptions();
  }, [userInfo]);

  return (
    <Dashboard
      title="My Prescriptions"
      description="This is your prescription history page"
    >
      <div className="overflow-hidden rounded-md font-serif">
        {loading ? (
          <Loading loading={loading} />
        ) : error ? (
          <h2 className="text-2xl text-center my-10 mx-auto w-11/12">
            {error}
          </h2>
        ) : prescriptions.length === 0 ? (
          <div className="text-center">
            <span className="flex justify-center my-30 pt-16 new-text-600 font-semibold text-6xl">
              <IoDocumentText />
            </span>
            <h2 className="font-medium text-md my-4 text-gray-600">
              You Have No Prescriptions Yet!
            </h2>
          </div>
        ) : (
          <div className="flex flex-col">
            <h2 className="text-xl font-serif font-semibold mb-5">
              My Prescriptions
            </h2>
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="align-middle inline-block border border-gray-100 rounded-md min-w-full pb-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b last:border-b-0 border-gray-100 rounded-md">
                  <table className="table-auto min-w-full border border-gray-100 divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr className="bg-gray-100">
                        <th className="text-left text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          Prescription Date
                        </th>
                        <th className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          File
                        </th>
                        <th className="text-center text-xs font-serif font-semibold px-6 py-2 text-gray-700 uppercase tracking-wider">
                          Invoice
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {prescriptions.map((prescription, index) => (
                        <tr key={index}>
                          <PrescriptionHistory
                            prescription={prescription}
                            index={index}
                          />
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Dashboard>
  );
};

export default MyPrescriptions;
