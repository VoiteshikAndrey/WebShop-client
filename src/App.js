import React from 'react';
import {useRoutes} from './routes.js';
// import {useAuth} from './hooks/auth.hook';
import { render } from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./reset.css";

import {Flash} from './components/flash-message/flash-message';
import Bus from './Utils/Bus';

// import {AuthContext} from './context/AuthContext';
// import {Loader} from './components/loader'
// import './public/css/reset.css';


function App() {
  // const {token, userId, login, logout, role, userName, userAvatar, ready} = useAuth();
  // const {token, userId, login, logout, role, userName, userAvatar} = 0;
  // const isAuthenticated = !!token;
  // const routes = useRoutes(isAuthenticated, role);
  console.log("Start!");
  const routes = useRoutes();
  // if(!ready){
  //   return (<Loader/>)
  // }

  window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

  return (
    <BrowserRouter>
      <Flash/>
      {routes}
    </BrowserRouter>
  );
}

export default App;
