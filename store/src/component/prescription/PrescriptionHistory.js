import React from "react";
import dayjs from "dayjs";
import Link from "next/link";

const PrescriptionHistory = ({ prescription, index }) => {
  if (!prescription || !prescription.url) {
    return null;
  }

  // Split the URL by commas (or any other separator you use in the backend)
  const urls = prescription.url.split(","); // Assuming URLs are comma-separated
  const { orderId, createdAt, invoice } = prescription;

  return (
    <>
      <td className="px-5 py-3 leading-6 whitespace-nowrap">
        <span className="uppercase text-sm font-medium">{index + 1}</span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <span className="text-sm">
          {dayjs(createdAt).format("MMMM D, YYYY")}
        </span>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <div className="flex flex-col items-center">
          {" "}
          {/* Container for multiple images */}
          {urls.map((url, urlIndex) => (
            <a
              key={urlIndex}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-1 px-3 py-1 bg-blue-100 text-xs text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-semibold rounded-full"
            >
              View {urls.length > 1 ? `(${urlIndex + 1})` : ""}
            </a>
          ))}
        </div>
      </td>
      <td className="px-5 py-3 leading-6 text-center whitespace-nowrap">
        <Link href={`/order/${orderId}`} legacyBehavior>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 bg-green-100 text-xs text-green-600 hover:bg-green-600 hover:text-white transition-all font-semibold rounded-full"
          >
            View Order #{invoice}
          </a>
        </Link>
      </td>
    </>
  );
};

export default PrescriptionHistory;
