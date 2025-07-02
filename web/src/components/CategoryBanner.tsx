import { CategoryBannerProps } from "../interfaces/category";

export const CategoryBanner = ({ 
  category, 
  isValidCategory 
}: CategoryBannerProps) => {
  return (
    <section className="text-4xl font-semibold font-outfit flex justify-center items-center 
      h-[218px] bg-gradient-to-br from-[#D9F3FF] to-[#FDF0E6] rounded-2xl">
      <h1 className={`text-[#1D1D1F] ${isValidCategory ? "capitalize" : "" }`}>
        { isValidCategory ? category : "La categoría no existe" }
      </h1>
    </section>
  );
};
