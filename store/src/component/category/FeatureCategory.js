import Image from "next/image";
import { useRouter } from "next/router";
import { IoChevronForwardSharp } from "react-icons/io5";
import { useContext } from "react";

import { SidebarContext } from "@context/SidebarContext";
import useAsync from "@hooks/useAsync";
import CategoryServices from "@services/CategoryServices";

const FeatureCategory = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(
    CategoryServices.getShowingCategory
  );

  const handleCategoryClick = (id, categoryName) => {
    const slug = categoryName.toLowerCase().replace(/[^a-z0-9]+/gi, "-");
    router.push(`/search?category=${slug}&_id=${id}`);
    setIsLoading(!isLoading);
  };

  return (
    <>
      {error ? (
        <p className="flex justify-center items-center m-auto text-xl text-red-500">
          <span>{error}</span>
        </p>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 gap-4">
          {data?.map((category) => (
            <li className="group" key={category._id}>
              <div
                className="flex w-full h-full border border-gray-100 shadow-sm bg-white p-4 cursor-pointer transition duration-200 ease-linear transform group-hover:shadow-lg"
                onClick={() => handleCategoryClick(category._id, category.name)}
              >
                <div className="flex items-center">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={35}
                    height={35}
                  />
                  <div className="pl-4">
                    <h3 className="text-sm text-gray-600 font-serif font-medium leading-tight line-clamp-1 group-hover:text-emerald-600">
                      {category.name}
                    </h3>

                    <ul className="pt-1 mt-1">
                      {category.children?.slice(0, 3).map((child, index) => (
                        <li key={index} className="pt-1">
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCategoryClick(category._id, child);
                            }}
                            className="flex items-center font-serif text-xs text-gray-400 cursor-pointer hover:text-emerald-600"
                          >
                            <IoChevronForwardSharp className="mr-1" />
                            {child}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FeatureCategory;
