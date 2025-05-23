import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Drawer from "rc-drawer";

import Cart from "@component/cart/Cart";
import { SidebarContext } from "@context/SidebarContext";

const CartDrawer = () => {
  const { cartDrawerOpen, closeCartDrawer } = useContext(SidebarContext);

  return (
    <Drawer
      open={cartDrawerOpen}
      onClose={closeCartDrawer}
      name={null}
      level={null}
      placement={"right"}
    >
      <Cart />
    </Drawer>
  );
};
export default dynamic(() => Promise.resolve(CartDrawer), { ssr: false });
