import { useNavigate } from 'react-router-dom';

type CategoryProps = {
  to: string
  label: string
  img: string
}

export const Category = ({ to, label, img }: CategoryProps) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/categoria/${to}`);

  return (
    <div className='bg-[#6EC3F64D] h-[134px] relative rounded-lg cursor-pointer flex flex-col justify-center items-center font-outfit gap-3' onClick={handleClick}>
      <img src={img} alt={label} className='bg-transparent' />
      <div className='bg-transparent flex items-center justify-center'>
        <p className='text-[##171717] text-lg font-semibold bg-transparent'>{label}</p>
      </div>
    </div>
  );
}
