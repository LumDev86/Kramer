import { useParams, useNavigate } from 'react-router-dom';
import { validCategory } from '../utils/menu';
import { Products } from '../components/Products';

export const Category = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const isValidCategory = category && validCategory.includes(category);

  return (
    <>
      {
        !isValidCategory ? (
          <>
            <p className='text-red-500 text-lg font-semibold'>Categoría no válida.</p>
            <button
              onClick={() => navigate('/')}
              className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Volver al inicio
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate('/')}
              className='mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
              Volver
            </button>
            <h2 className='text-lg font-semibold my-4 capitalize'>{category}</h2>
            <Products />
          </>
        )
      }
    </>
  );
};
