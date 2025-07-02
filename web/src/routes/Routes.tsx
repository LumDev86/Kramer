import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ShopLayout from '../layouts/ShopLayout';

// Lazy-loaded pages
const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Cart = lazy(() => import('../pages/Cart'));
const NotFound = lazy(() => import('../pages/NotFound'));

export const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <Routes>
        <Route path='/' element={<ShopLayout />}>
          <Route index element={<Home />} />
          <Route path='categoria/:category' element={<Category />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};