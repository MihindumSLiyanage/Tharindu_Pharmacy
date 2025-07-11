import Image from "next/image";
import Link from "next/link";
import { useContext, useState } from "react";
import { FiMinus, FiPlus } from "react-icons/fi";
import useTranslation from "next-translate/useTranslation";

import Discount from "@component/common/Discount";
import Price from "@component/common/Price";
import Stock from "@component/common/Stock";
import Tags from "@component/common/Tags";
import MainModal from "@component/modal/MainModal";
import { SidebarContext } from "@context/SidebarContext";
import useAddToCart from "@hooks/useAddToCart";
import { notifyError } from "@utils/toast";
import PrescriptionLabel from "@component/common/PrescriptionLabel";

const ProductModal = ({ modalOpen, setModalOpen, product }) => {
  const { setIsLoading, isLoading } = useContext(SidebarContext);
  const { handleAddItem } = useAddToCart();
  const { t } = useTranslation();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = (p) => {
    if (p.quantity < 1) return notifyError("Insufficient stock");

    const newItem = {
      ...p,
      id: p._id,
      name: p.name,
      image: p.image,
      price: p.prices.price,
      originalPrice: p.prices.originalPrice,
      slug: p.slug,
      description: p.description,
      sku: p.sku,
      category: p.category,
      tag: p.tag,
      status: p.status,
      requiresPrescription: p.requiresPrescription,
    };

    handleAddItem(newItem, quantity);
  };

  const category_name = product?.category?.name
    ?.toLowerCase()
    ?.replace(/[^A-Z0-9]+/gi, "-");

  const handleIncrement = () => {
    if (quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <>
      <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform bg-white shadow-xl rounded-2xl max-w-3xl">
          <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
            <div className="relative flex-shrink-0">
              <div
                onClick={() => setModalOpen(false)}
                className="flex items-center justify-center h-full cursor-pointer"
              >
                <div className="absolute top-2 left-2 z-10">
                  <Stock stock={product.quantity} />
                </div>
                <Image
                  src={product.image}
                  width={300}
                  height={300}
                  alt="product"
                  className="object-cover rounded-l-2xl ml-2"
                />
                <div className="absolute top-2 right-20 z-10">
                  <Discount
                    product={product}
                    discount={product.prices.discount}
                    modal
                  />
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col p-6 md:p-7 text-left">
              <div className="mb-3 md:mb-4">
                <h1
                  onClick={() => setModalOpen(false)}
                  className="text-heading text-xl md:text-2xl font-semibold font-serif hover:text-emerald-500 cursor-pointer transition-colors duration-200" // Reduced text size
                >
                  {product?.name}
                </h1>
              </div>
              <p className="text-sm leading-6 text-gray-600 md:leading-7 mb-5">
                {product?.description}
              </p>
              <div className="flex items-center mb-4">
                <Price product={product} />
              </div>
              <div className="flex items-center">
                {product.expiryDate && (
                  <div className="text-sm text-gray-600 mt-1">
                    <span className="font-medium">Expiry Date:</span>{" "}
                    {new Date(product.expiryDate).toLocaleDateString()}
                  </div>
                )}
              </div>
              <div className="flex items-center mt-5">
                <div className="flex items-center justify-between space-x-3 w-full">
                  <div className="group flex items-center justify-between rounded-full overflow-hidden flex-shrink-0 border h-10 md:h-12 border-gray-300">
                    <button
                      onClick={handleDecrement}
                      disabled={quantity === 1}
                      className="flex items-center justify-center flex-shrink-0 h-full transition ease-in-out duration-300 focus:outline-none w-8 md:w-10 text-heading border-r border-gray-300 hover:text-gray-500" // Reduced width
                    >
                      <span className="text-dark text-base">
                        <FiMinus />
                      </span>
                    </button>
                    <p className="font-semibold flex items-center justify-center h-full transition-colors duration-250 ease-in-out cursor-default flex-shrink-0 text-base text-heading w-10 md:w-16">
                      {quantity}
                    </p>
                    <button
                      onClick={handleIncrement}
                      disabled={
                        product.quantity < quantity ||
                        product.quantity === quantity
                      }
                      className="flex items-center justify-center h-full flex-shrink-0 transition ease-in-out duration-300 focus:outline-none w-8 md:w-10 text-heading border-l border-gray-300 hover:text-gray-500" // Reduced width
                    >
                      <span className="text-dark text-base">
                        <FiPlus />
                      </span>
                    </button>
                  </div>
                  <PrescriptionLabel required={product.requiresPrescription} />
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.quantity < 1}
                    className={`text-sm leading-5 inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center border-0 border-transparent rounded-full focus-visible:outline-none focus:outline-none text-white px-4 ml-4 md:px-5 py-3 md:py-3 w-full h-10 md:h-12
                    ${
                      product.quantity < 1
                        ? "bg-gray-500 hover:bg-gray-500 cursor-not-allowed"
                        : "bg-emerald-500 hover:bg-emerald-600"
                    }`}
                  >
                    {t("common:addToCart")}
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between space-x-2 w-full">
                  <div>
                    <span className="font-serif font-semibold py-1 text-sm d-block">
                      <span className="text-gray-700">
                        {t("common:category")} :
                      </span>
                      <Link
                        href={`/search?category=${category_name}&_id=${product?.category?._id}`}
                      >
                        <button
                          type="button"
                          className="text-gray-600 font-serif font-medium underline ml-1 hover:text-emerald-600 transition-colors duration-200" // Reduced margin
                          onClick={() => setIsLoading(!isLoading)}
                        >
                          {category_name}
                        </button>
                      </Link>
                    </span>
                    <Tags product={product} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainModal>
    </>
  );
};

export default ProductModal;
