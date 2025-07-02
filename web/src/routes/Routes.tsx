import { Routes, Route } from 'react-router-dom';
import ShopLayout from '../layouts/ShopLayout';
import Home from '../pages/Home';
import Category from '../pages/Category';
import NotFound from '../pages/NotFound';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<ShopLayout />}>
        <Route index element={<Home />} />
        <Route path='categoria/:category' element={<Category />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};
