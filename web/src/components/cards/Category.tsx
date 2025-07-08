import { useNavigate } from "react-router-dom";
import { CategoryProps } from "../../interfaces/category";

export const Category = ({ category }: CategoryProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/categoria/${category.name}`);

  return (
    <div className="bg-[#6EC3F64D] h-[134px] rounded-2xl cursor-pointer flex flex-col 
      justify-center items-center gap-2" onClick={handleClick}>
      <img src={category.image} alt={category.name} />
      <p className="text-lg font-medium">{category.name}</p>
    </div>
  );
};
