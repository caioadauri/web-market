import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewProduct } from '../pages/New';
import { Edit } from '../pages/Edit';

export function AppRoutes() {

  return (

  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/new" element={<NewProduct />}/>
    <Route path="/produto/:id/editar" element={<Edit />} />

    user && <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>

  )
}