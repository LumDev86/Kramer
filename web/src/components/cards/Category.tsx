import { useNavigate } from "react-router-dom";
import { CategoryProps } from "../../interfaces/category";

export const Category = ({ category }: CategoryProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/categoria/${category.name}`);

  return (
    <div className="bg-[#6EC3F64D] rounded-2xl cursor-pointer flex flex-col 
      items-center pt-4 pb-2 gap-3" onClick={handleClick}>
      <img src={category.image} alt={category.name} className="h-20 object-contain mx-auto" />
      <p className="text-lg font-medium">{category.name}</p>
    </div>
  );
};
