import React, { useContext } from "react";
import dynamic from "next/dynamic";
import Drawer from "rc-drawer";

import Category from "@component/category/Category";
import { SidebarContext } from "@context/SidebarContext";

const CategoryDrawer = ({ FilterProduct }) => {
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);

  return (
    <Drawer
      open={categoryDrawerOpen}
      onClose={closeCategoryDrawer}
      name={null}
      level={null}
      placement={"left"}
    >
      <Category FilterProduct={FilterProduct} />
    </Drawer>
  );
};
export default dynamic(() => Promise.resolve(CategoryDrawer), { ssr: false });
