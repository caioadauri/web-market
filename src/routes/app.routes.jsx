import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from '../pages/Home';
import { NewProduct } from '../pages/New';
import { Edit } from '../pages/Edit';
import { SellProduct } from '../pages/Sale'
import { Relatorio } from '../pages/Relatorio';

export function AppRoutes() {

  return (

  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/new" element={<NewProduct />}/>
    <Route path="/produto/:id/editar" element={<Edit />} />
    <Route path="/produto/:id/venda" element={<SellProduct />} />
    <Route path="/relatorio" element={<Relatorio />} />

    user && <Route path="*" element={<Navigate to="/"/>}/>
  </Routes>

  )
}