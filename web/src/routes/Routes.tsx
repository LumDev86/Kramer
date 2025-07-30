import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ShopLayout from '../layouts/ShopLayout';
import Logo from '../assets/logos/logo.webp';
import AuthLayout from '../layouts/Auth';
import DashboardLayout from '../layouts/Dashboard';

const Home = lazy(() => import('../pages/Home'));
const Category = lazy(() => import('../pages/Category'));
const Cart = lazy(() => import('../pages/Cart'));
const Checkout = lazy(() => import('../pages/Checkout'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Auth = lazy(() => import('../pages/admin/Auth'));
const Dashboard = lazy(() => import('../pages/admin/Dashboard'));
const Products = lazy(() => import('../pages/admin/Products'));
const Promotions = lazy(() => import('../pages/admin/Promotions'))

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

        <Route path="/admin">
          <Route index element={<Navigate to="auth" replace />} />

          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Auth />} />
          </Route>

          <Route element={<DashboardLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="promotions" element={<Promotions />} />
          </Route>
        </Route>

        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
