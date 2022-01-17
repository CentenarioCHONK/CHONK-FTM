import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css';
import Header from "./Views/Header/Header";
import Home from "./Views/Home/Home";
import Exchange from './Views/Exchange/Exchange';
import { DAppProvider } from '@usedapp/core'
import { config }  from "./SmartContract/config";
import { CookiesProvider } from 'react-cookie';



ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}><CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header/>}>
            <Route index element={<Home/>} />
            <Route path="swap" element={<Exchange/>} />
            <Route path="*" element={<Home/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider></DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
