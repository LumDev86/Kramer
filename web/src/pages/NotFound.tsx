import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Página no encontrada</h1>
        <p className="text-gray-600">Lo sentimos, la ruta que estás buscando no existe.</p>
        <button
          onClick={() => navigate('/')}
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Volver al inicio
        </button>
      </div>
    </section>
  )
}
