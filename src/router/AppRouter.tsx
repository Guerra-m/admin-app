import { Routes, Route, Navigate } from 'react-router-dom';

import { LoginPage } from '../modules/auth/components/LoginPage';
import { PrivateRoute } from '../modules/auth/components/PrivateRoute';

import { MainLayout } from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';


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
              path="/shopping"
              element={<HomePage />}
            />

          </Route>

        </Route>

        <Route
          path="/*"
          element={<Navigate to="/shopping" />}
        />

      </Routes>

  );
};