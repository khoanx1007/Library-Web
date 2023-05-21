import React from "react";
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
const token = JSON.parse(localStorage.getItem('token'));
const user = JSON.parse(localStorage.getItem('user'));    
const logoutClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
};
const navigate = useNavigate();
    return (
    <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-light d-flex justify-content-between">
            <a href="" onClick={() => navigate('/')}>
                    <span id="logo-name" style={{fontSize: '20px',fontWeight: 'bold',color: '#17a2b8'}}>SACHTRUYEN.ADMIN</span>
            </a>
            {token && user ? (
                <a href="" onClick={logoutClick}>Xin chào <b>{user.name}</b>, <span className="text-danger">Đăng xuất</span></a>
            ) : (
                <a href="" onClick={() => navigate('/login')}> Đăng nhập</a>
            )}
        </nav>
    </header>
  );
};

export default Header;