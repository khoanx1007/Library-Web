import './App.css';
import { Routes, Route, Router } from 'react-router-dom';
import Login from './auth/login';
import AuthGuard from './AuthGuard';
import Register from './auth/register';
function Authentication() {
  return (
      <Routes>
        
        <Route element={<AuthGuard/>}>
          <Route path='/login' element={<Login/>} exact/>
          <Route path='/register' element={<Register/> } exact/>
        </Route>      
    </Routes>
  );
}

export default Authentication;
