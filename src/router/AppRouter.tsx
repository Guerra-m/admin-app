import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '../modules/auth/components/LoginPage';
import { PrivateRoute } from '../modules/auth/components/PrivateRoute';
import { RoleRoute } from '../modules/auth/components/RoleRoute';

import { MainLayout } from '../shared/layouts/MainLayout';

import { ProductsPage } from '../modules/products/pages/ProductsPage';
import { ProductDetailPage } from '../modules/products/pages/ProductDetailPage';
import { IngredientsPage } from '../modules/ingredients/pages/IngredientsPage';
import { CategoriesPage } from '../modules/categories/pages/CategoriesPage';
import { OrdersPage } from '../modules/orders/pages/OrdersPage';
import { ProfilePage } from '../modules/profile/pages/ProfilePage';
export const AppRouter = () => {

  return (

    <Routes>

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route element={<PrivateRoute />}>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Navigate to="/perfil" replace />}
          />

          {/* PRODUCTOS */}
          <Route
            path="/productos"
            element={
              <RoleRoute roles={["ADMIN", "STOCK"]}>
                <ProductsPage />
              </RoleRoute>
            }
          />

          {/* DETALLE PRODUCTO */}
          <Route
            path="/productos/:id"
            element={
              <RoleRoute roles={["ADMIN", "STOCK"]}>
                <ProductDetailPage />
              </RoleRoute>
            }
          />

          {/* CATEGORIAS */}
          <Route
            path="/categorias"
            element={
              <RoleRoute roles={["ADMIN"]}>
                <CategoriesPage />
              </RoleRoute>
            }
          />

          {/* INGREDIENTES */}
          <Route
            path="/ingredientes"
            element={
              <RoleRoute roles={["ADMIN", "STOCK"]}>
                <IngredientsPage />
              </RoleRoute>
            }
          />

          {/* EMPLEADOS */}
          <Route
            path="/pedidos"
            element={
              <RoleRoute roles={["ADMIN"]}>
                <OrdersPage />
              </RoleRoute>
            }
          />
          {/* PERFIL */}
          <Route
            path="/perfil"
            element={
              <RoleRoute roles={["ADMIN", "STOCK", "CLIENT", "PEDIDOS"]}>
                <ProfilePage />
              </RoleRoute>
            }
          />
        </Route>

      </Route>

    </Routes>

  );
};