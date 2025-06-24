<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';
import { CategoryProps } from '../../interfaces/interfaces';
=======
import { useNavigate } from "react-router-dom";
import { CategoryProps } from "../../interfaces/category";
>>>>>>> 68b326920831ad3f8b56b8502fe5fc4a3e66100b

export const Category = ({ to, label, img }: CategoryProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/categoria/${to}`);
  
  return (
<<<<<<< HEAD
    <div className='relative rounded-lg overflow-hidden shadow-md cursor-pointer' onClick={handleClick}>
      <img src={img} alt={label} className='w-full h-24 object-cover' />
      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <span className='text-white text-lg font-semibold'>{label}</span>
      </div>
    </div>
  );
}
=======
    <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer" onClick={handleClick}>
      <img src={img} alt={label} className="w-full h-24 object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <span className="text-white text-lg font-semibold">{label}</span>
      </div>
    </div>
  );
};
>>>>>>> 68b326920831ad3f8b56b8502fe5fc4a3e66100b
