import { useState } from "react";
import { useCart } from "react-use-cart";
import { notifyError, notifySuccess } from "@utils/toast";

const useAddToCart = () => {
  const [item, setItem] = useState(1);
  const { addItem, items, updateItemQuantity } = useCart();

  const handleAddItem = (product, quantity) => {
    const result = items.find((i) => i.id === product.id);
    const availableStock = product?.quantity;

    if (result !== undefined) {
      if (result?.quantity + quantity <= availableStock) {
        addItem(product, quantity); 
        notifySuccess(`${quantity} ${product.name} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    } else {
      if (quantity <= availableStock) {
        addItem(product, quantity); 
        notifySuccess(`${quantity} ${product.name} added to cart!`);
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  const handleIncreaseQuantity = (product) => {
    const result = items?.find((p) => p.id === product.id);
    const availableStock = product?.quantity;

    if (result) {
      if (result?.quantity + 1 <= availableStock) {
        updateItemQuantity(product.id, result.quantity + 1);
      } else {
        notifyError("Insufficient stock!");
      }
    }
  };

  return {
    setItem,
    item,
    handleAddItem,
    handleIncreaseQuantity,
  };
};

export default useAddToCart;
