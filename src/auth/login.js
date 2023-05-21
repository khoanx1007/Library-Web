import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
const Login = (props) => {
    const [errors, setErrors] = useState({});
    useEffect(() => {
        document.title = "Đăng nhập";
    }, []); 
    const [user,setUser] = useState({});
    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setUser((prevState) => ({
        ...prevState,
        [id]: value,
        }));
    };
    const loginClick = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const newErrors = {};
        if (!username) {
            newErrors.username = 'Vui lòng nhập tên tài khoản';
          }
        if (!password) {
            newErrors.password = 'Vui lòng nhập mật khẩu';
        }
        if (Object.keys(newErrors).length === 0) {
            fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
            })
            .then(response => {
                if (response.ok) { 
                    return response.json(); 
                } else if (response.status === 401) {
                    response.text().then(errorMessage => {
                    newErrors.username = errorMessage;
                    setErrors(newErrors);
                }); 
            }
            })
            .then(data => {
                localStorage.setItem('token', JSON.stringify(data.token));
                localStorage.setItem('user', JSON.stringify(data.user));
                window.location.href = "http://localhost:3000"; 
            })
            .catch(error => console.error(error));
        }
        else {
            setErrors(newErrors);
        }
        
    }
    const navigate = useNavigate();
    return (
        <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
        data-sidebar-position="fixed" data-header-position="fixed">
            <div class="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
                <div class="d-flex align-items-center justify-content-center w-100">
                    <div class="row justify-content-center w-100">
                        <div class="col-md-8 col-lg-6 col-xxl-4">
                            <div class="card mb-0">
                                <div class="card-body">
                                    <p class="text-center h3 mb-3">Đăng nhập</p>
                                        <form>
                                            <div class="mb-3">
                                                <label for="username" class="form-label">Tài khoản</label>
                                                <input type="text" class="form-control" value={user.username || ''} onChange={handleInputChange} id="username"/>
                                                {errors.username && <div className="text-danger">{errors.username}</div>}
                                            </div>
                                            <div class="mb-4">
                                                <label for="password" class="form-label">Mật khẩu</label>
                                                <input type="password" class="form-control" value={user.password || ''} onChange={handleInputChange} id="password"/>
                                                {errors.password && <div className="text-danger">{errors.password}</div>}
                                            </div>
                                            <button type="button" onClick={loginClick} class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">
                                                Đăng nhập
                                            </button>
                                            <div class="d-flex align-items-center justify-content-center">
                                                <p class="fs-4 mb-0 fw-bold">Thành viên mới?</p>
                                                <a class="text-primary fw-bold ms-2" href="" onClick={() => navigate('/register')}>Tạo tài khoản</a>
                                            </div>
                                        </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
  );
};

export default Login;