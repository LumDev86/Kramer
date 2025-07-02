import { useNavigate } from "react-router-dom";
import { CategoryProps } from "../../interfaces/category";

export const Category = ({ category }: CategoryProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/categoria/${category.name}`);

  return (
    <div className="bg-[#6EC3F64D] h-[134px] relative rounded-lg cursor-pointer flex flex-col 
      justify-center items-center font-outfit gap-3" onClick={handleClick}>
      <img src={category.image} alt={category.name} />
      <div className="flex items-center justify-center">
        <p className="text-[##171717] text-lg font-semibold">{category.name}</p>
      </div>
    </div>
  );
};
