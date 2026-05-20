import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '../modules/auth/components/LoginPage';
import { PrivateRoute } from '../modules/auth/components/PrivateRoute';

import { MainLayout } from '../shared/layouts/components/MainLayout';
import { ProductsPage } from '../modules/products/pages/ProductsPage';
import { ProductDetailPage } from '../modules/products/pages/ProductDetailPage';
import { IngredientsPage } from '../modules/ingredients/pages/IngredientsPage';
import { CategoriesPage } from '../modules/categories/pages/CategoriesPage';

export const AppRouter = () => {

  return (

    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<PrivateRoute />}>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/productos/:id" element={<ProductDetailPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/ingredientes" element={<IngredientsPage />} />

        </Route>

      </Route>
    </Routes>

  );
};