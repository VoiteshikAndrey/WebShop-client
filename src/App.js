import React from 'react';
import {useRoutes} from './routes.js';
// import {useAuth} from './hooks/auth.hook';
import { render } from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./reset.css";

import {Flash} from './components/flash-message/flash-message';
import Bus from './Utils/Bus';

function App() {
 
  const routes = useRoutes();

  window.flash = (message, type="success") => Bus.emit('flash', ({message, type}));

  return (
    <BrowserRouter>
      <Flash/>
      {routes}
    </BrowserRouter>
  );
}

export default App;
