import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/login/login.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import AppLayout from './pages/app-layout/app-layout.tsx';
import Register from './pages/register/register.tsx';
import AddFood from './pages/add-food/add-food.tsx';
import AddMeal from './pages/add-meal/add-meal.tsx';
import FoodLogs from './pages/food-logs/food-logs.tsx';
import WeightLog from './pages/weight-log/weight-log.tsx';
import { AuthProvider } from './contexts/auth-context.tsx';
import ProtectedRoute from './pages/protected-route/protected-route.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path={'/'}
          element={
            <AuthProvider>
              <App />
            </AuthProvider>
          }
        >
          <Route index element={<Home />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route
            path={'app'}
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to={'dashboard'} />} />
            <Route path={'dashboard'} element={<Dashboard />} />
            <Route path={'add-meal'} element={<AddMeal />} />
            <Route path={'food-logs'} element={<FoodLogs />} />
            <Route path={'weight-log'} element={<WeightLog />} />
            <Route path={'add-food'} element={<AddFood />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
