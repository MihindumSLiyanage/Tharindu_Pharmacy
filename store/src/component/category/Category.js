import { useContext } from "react";

import { pages } from "@utils/data";
import useAsync from "@hooks/useAsync";
import Loading from "@component/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import CategoryServices from "@services/CategoryServices";
import CategoryCard from "@component/category/CategoryCard";

const Category = () => {
  const { categoryDrawerOpen } = useContext(SidebarContext);
  const {
    data: categories = [],
    loading,
    error,
  } = useAsync(CategoryServices.getShowingCategory);

  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      <div className="overflow-y-scroll scrollbar-hide w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg text-heading border-b px-8 py-3">
            All Categories
          </h2>
        )}
        {error ? (
          <p className="flex justify-center items-center m-auto text-xl text-red-500">
            {error}
          </p>
        ) : loading ? (
          <Loading loading={loading} />
        ) : (
          <div className="relative grid gap-2 p-6">
            {categories.map(({ _id, name, icon, children }) => (
              <CategoryCard
                key={_id}
                name={name}
                icon={icon}
                nested={children || []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
