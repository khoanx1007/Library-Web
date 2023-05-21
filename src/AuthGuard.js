import { Link, Navigate, Outlet, Route } from 'react-router-dom';

const AuthGuard = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/" />: <Outlet/>;
};

export default AuthGuard;
