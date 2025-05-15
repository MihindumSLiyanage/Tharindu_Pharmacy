import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "react-use-cart";
import { IoBagAddSharp, IoAdd, IoRemove } from "react-icons/io5";

import Price from "@component/common/Price";
import Discount from "@component/common/Discount";
import ProductModal from "@component/modal/ProductModal";
import Stock from "@component/common/Stock";

const ProductCard = ({ product }) => {
  const [isClient, setIsClient] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { items, addItem, updateItemQuantity, inCart } = useCart();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddItem = (p) => {
    const newItem = {
      ...p,
      id: p._id,
      price: p.prices.price,
      originalPrice: p.prices?.originalPrice,
    };
    addItem(newItem);
  };

  return (
    <>
      <ProductModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        product={product}
      />
      <div className="group box-border overflow-hidden flex flex-col items-center rounded-2xl shadow-md bg-white relative transition-all duration-300 transform hover:scale-105 hover:shadow-lg max-w-xs w-full">
        {" "}
        <div
          onClick={() => setModalOpen(!modalOpen)}
          className="relative flex justify-center w-full cursor-pointer rounded-t-2xl overflow-hidden"
        >
          <Stock stock={product.quantity} card={true} />
          <Discount product={product} discount={product.prices.discount} />
          <Image
            src={product.image}
            width={160}
            height={160}
            alt={product.name}
            className="object-cover rounded-t-2xl transition duration-150 ease-linear transform group-hover:scale-110"
          />
        </div>
        <div className="w-full px-3 py-2 overflow-hidden">
          {" "}
          <div className="mb-2">
            <div className="flex items-center justify-between">
              <h2 className="text-gray-800 text-sm truncate transition-colors duration-200">
                {" "}
                {product.name}
              </h2>
            </div>
          </div>
          <div className="flex justify-between items-center text-heading text-sm sm:text-base lg:text-lg">
            {" "}
            <Price product={product} card={true} />
            {isClient && inCart(product._id) ? (
              <div className="flex items-center space-x-2">
                {" "}
                {items.map(
                  (item) =>
                    item.id === product._id && (
                      <div
                        key={item.id}
                        className="h-8 flex items-center justify-between w-16 bg-emerald-500 text-white rounded-full py-1 px-2" /* Reduced size */
                      >
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          className="text-white hover:text-emerald-200 transition-colors duration-200"
                        >
                          <IoRemove className="text-sm" />{" "}
                        </button>
                        <p className="text-sm font-semibold">{item.quantity}</p>{" "}
                        <button
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          disabled={product.quantity === item.quantity}
                          className="text-white hover:text-emerald-200 transition-colors duration-200"
                        >
                          <IoAdd className="text-sm" />{" "}
                        </button>
                      </div>
                    )
                )}
              </div>
            ) : (
              <button
                onClick={() => handleAddItem(product)}
                disabled={product.quantity < 1}
                aria-label="Add to Cart"
                className="h-8 w-8 flex items-center justify-center border-2 border-gray-300 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none" /* Reduced size */
              >
                <IoBagAddSharp className="text-sm" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
