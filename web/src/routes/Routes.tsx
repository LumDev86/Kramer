import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ShopLayout from '../layouts/ShopLayout';
import Logo from '../assets/logos/logo.webp';

const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen w-screen">
          <img
            src={Logo}
            alt="Cargando..."
            className="w-[88px] h-[44px] md:h-14 md:w-[104px] lg:h-16 lg:w-[112px] 
            xl:h-20 xl:w-[120px] object-contain animate-pulse"
          />
          <p className="mt-4">Cargando...</p>
        </div>
      }>
      <Routes>
        <Route path='/' element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route path='categoria/:category' element={<Category />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/checkout' element={<Checkout />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
