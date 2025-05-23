import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewProduct } from '../pages/New';

export function AppRoutes() {

  return (

  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/new" element={<NewProduct />}/>

    user && <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>

  )
}