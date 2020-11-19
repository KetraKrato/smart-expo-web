import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
// import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import DashboardCamera from 'src/views/reports/DashboardView/DashboardCamera/DashboardCamera';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/product/ProductListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import LoginPage from 'src/views/Login/LoginPage';
import RegisterPage from 'src/views/Register/RegisterPage';
import { element } from 'prop-types';

import LoginLayout from 'src/layouts/LoginLayout';
import ReviewPage from 'src/views/Review';
// import RegisterLayout from 'src/layouts/RegisterLayout';

const routes = [
  {

    // add route  dashboard login and  video  page
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'review', element: <ReviewPage /> },
      { path: 'register', element: <AccountView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'dashboardcamera', element: <DashboardCamera /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> },
      // { path: 'loginpage', element: <LoginPage /> },
    ]
  },
  {
    path: '/',
    element: <LoginLayout />,
    children: [
      { path: 'loginpage', element: <LoginPage /> },
      { path: 'registerpage', element: <RegisterPage /> },
    ]
  },
];

export default routes;
