import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import FoodLogEdit from './components/food-log-edit/food-log-edit.tsx';
import FoodLog from './components/food-log/food-log.tsx';
import { AuthProvider } from './contexts/auth-context.tsx';
import AddFood from './pages/add-food/add-food.tsx';
import AddMeal from './pages/add-meal/add-meal.tsx';
import AppLayout from './pages/app-layout/app-layout.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import FoodLogs from './pages/food-logs/food-logs.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/login/login.tsx';
import ProtectedRoute from './pages/protected-route/protected-route.tsx';
import Register from './pages/register/register.tsx';
import UserPage from './pages/user/user.tsx';
import Settings from './components/settings/settings.tsx';
import Account from './components/account/account.tsx';
import CreatedFoods from './components/created-foods/created-foods.tsx';

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
            <Route path={'food-logs/:foodLogId'} element={<FoodLog />} />
            <Route
              path={'food-logs/:foodLogId/edit/:mealId'}
              element={<FoodLogEdit />}
            />
            <Route path={'add-food'} element={<AddFood />} />
            <Route path={'user'} element={<UserPage />}>
              <Route index element={<Navigate replace to={'settings'} />} />
              <Route path={'settings'} element={<Settings />} />
              <Route path={'account'} element={<Account />} />
              <Route path={'created-foods'} element={<CreatedFoods />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
