import { Routes, Route, Navigate } from 'react-router-dom';

import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Active } from '../pages/Active';

export function AuthRoutes() {
  const user = localStorage.getItem('@web-market:user')

  return (
    <Routes>
      <Route path="/" element={<SignIn />}/>
      <Route path="/register" element={<SignUp />}/>
      <Route path="/active" element={<Active />}/>

      {!user && <Route path="*" element={<Navigate to="/"/>}/> }
    </Routes>
  )
}