import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'swiper/swiper.min.css';
import './App.scss';
import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/grid/css/grid.css'

import RouteUser from './config/RouteUser';
import RouteAdmin from './config/RouteAdmin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/*' element={<RouteUser />} />
        <Route path='/admin/*' element={<RouteAdmin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
