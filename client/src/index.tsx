import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import HomePage from './HomePage';

import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  //
    <App />
);
