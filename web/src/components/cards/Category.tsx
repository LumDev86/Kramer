import { useNavigate } from 'react-router-dom';
import { CategoryProps } from '../../interfaces/category';

export const Category = ({ to, label, img }: CategoryProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/categoria/${to}`);

  return (
    <div className='relative rounded-lg overflow-hidden shadow-md cursor-pointer' onClick={handleClick}>
      <img src={img} alt={label} className='w-full h-24 object-cover' />
      <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
        <span className='text-white text-lg font-semibold'>{label}</span>
      </div>
    </div>
  );
}
