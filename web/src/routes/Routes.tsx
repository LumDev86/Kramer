import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ShopLayout from '../layouts/ShopLayout';

const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const AppRoutes = () => {
  return (
    // TODO cambiar por loader circular
    <Suspense fallback={<div>Cargando...</div>}>
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
