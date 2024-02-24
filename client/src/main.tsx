import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App.tsx';
import Home from './pages/home/home.tsx';
import Login from './pages/login/login.tsx';
import Dashboard from './pages/dashboard/dashboard.tsx';
import AppLayout from './pages/app-layout/app-layout.tsx';
import Register from './pages/register/register.tsx';
import AddFood from './pages/add-food/add-food.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={'/'} element={<App />}>
          <Route index element={<Home />} />
          <Route path={'login'} element={<Login />} />
          <Route path={'register'} element={<Register />} />
          <Route path={'app'} element={<AppLayout />}>
            <Route index element={<Dashboard />} />
            <Route path={'add-food'} element={<AddFood />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
