import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import {
  IoChevronDownOutline,
  IoChevronForwardOutline,
  IoRemoveSharp,
} from "react-icons/io5";

import { SidebarContext } from "@context/SidebarContext";

const CategoryCard = ({ name, icon, children = [], id }) => {
  const router = useRouter();
  const { closeCategoryDrawer, isLoading, setIsLoading } =
    useContext(SidebarContext);
  const [showChildren, setShowChildren] = useState(false);

  const handleClick = (categoryId, categoryName) => {
    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/gi, "-");
    setIsLoading(true);
    router.push(`/search?category=${slug}&_id=${categoryId}`).then(() => {
      closeCategoryDrawer?.();
      setIsLoading(false);
    });
  };

  return (
    <>
      <a
        onClick={() => {
          if (children.length > 0) {
            setShowChildren(!showChildren);
          } else {
            handleClick(id, name);
          }
        }}
        className="p-2 flex items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600 cursor-pointer"
      >
        <Image src={icon} width={18} height={18} alt="Category Icon" />

        <div className="inline-flex items-center justify-between ml-3 text-sm font-medium w-full">
          {name}
          {children.length > 0 && (
            <span className="inline-flex text-gray-400">
              {showChildren ? (
                <IoChevronDownOutline />
              ) : (
                <IoChevronForwardOutline />
              )}
            </span>
          )}
        </div>
      </a>

      {showChildren && children.length > 0 && (
        <ul className="pl-6 pb-3 pt-1 -mt-1">
          {children.map((childName, index) => (
            <li key={index}>
              <a
                onClick={() => handleClick(id, childName)}
                className="flex items-center font-serif py-1 text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
              >
                <span className="text-xs text-gray-500 pr-2">
                  <IoRemoveSharp />
                </span>
                {childName}
              </a>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CategoryCard;
