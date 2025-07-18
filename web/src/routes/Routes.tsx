import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ShopLayout from '../layouts/ShopLayout';
import Logo from '../assets/logos/logo.webp';
import AdminLayout from '../layouts/AdminLayout';

const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Auth = lazy(() => import('../pages/Auth'))

export const AppRoutes = () => {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-screen w-screen">
        <img src={Logo} alt="Cargando..." className="..." />
        <p className="mt-4">Cargando...</p>
      </div>
    }>
      <Routes>
        <Route path='/' element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route path='categoria/:category' element={<Category />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>

        <Route path='/auth' element={<AdminLayout />}>
          <Route index element={<Auth />} />
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
