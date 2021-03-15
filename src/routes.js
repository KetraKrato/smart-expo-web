import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import MainLayout from './layouts/MainLayout';
import LoginView from './views/auth/LoginView';
import RegisterView from './views/auth/RegisterView'
import NotFoundView from './views/errors/NotFoundView';
import MapView from "./views/map"
import DashboardView from "./views/reports/DashboardView"
import AccountView from "./views/account"
import AddAccountView from "./views/account/AddAccountView"
import Event from "./views/Event/EventView"
import Blacklist from "./views/Blacklist/pageBlacklist"
import AddBlacklist from "./views/Blacklist/AddBlacklist"
import ShowDetailBlacklist from './views/Blacklist/ShowDetailBlacklist'
import AddStaff from './views/Staff/AddStaff'
import EditBlacklist from "./views/Blacklist/EditBlacklist"
import Staff from './views/Staff/pageStaff'
import ShowDetailStaff from './views/Staff/ShowDetailStaff'
import EditStaff from './views/Staff/EditStaff'
import History from "./views/Event/History"
import  Locations from "./views/locations"
// import RemoteControl from "./views/remoteControl"
// import AppManager from "./views/adb/index"
const routes = [
  { 
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path:'map', element: <MapView />},
      { path:'dashboard', element: <DashboardView />},
      { path: 'account', element: < AccountView /> },
      { path: 'add_account', element: < AddAccountView /> },
      { path: 'blacklist', element: < Blacklist /> },
      { path: 'add_blacklist' , element: < AddBlacklist /> },
      { path: 'event' , element: < Event /> },
      { path: 'blacklist/detailblacklist/:id' , element: < ShowDetailBlacklist/> },
      { path: 'blacklist/editblacklist/:id', element: <EditBlacklist /> },
      { path: 'staff', element: <Staff /> },
      { path: 'add_staff', element: < AddStaff /> },
      { path: 'staff/detailstaff/:id' , element: < ShowDetailStaff/> },
      { path: 'staff/editstaff/:id', element: <EditStaff /> },
      { path: 'history', element: <History /> },
      { path: 'locations', element: <Locations /> },
      ,
        // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
    {
    path: '/',
      element: <MainLayout />,
      children: [
  
     
      { path: 'login' , element: <LoginView /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '404', element: <NotFoundView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '*', element: <Navigate to="/404" /> }
      // { path: '*', element: <Navigate to="/404" /> }
    ]
  },
    
];

export default routes;
