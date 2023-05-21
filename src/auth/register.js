import { data } from 'jquery';
import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import toastr from 'toastr';
  const Register = (props) => {
  useEffect(() => {
    document.title = "Đăng ký thành viên";
  }, []); 
  const [errors, setErrors] = useState({});
  const [user,setUser] = useState({});
  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUser((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhoneNumber = (phoneNum) => {
    const regex = /^\d{10}$/;
    return regex.test(phoneNum);
  };
  const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_]+$/; 
    return regex.test(username);
  };
  const onAddClick = () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const rpassword = document.getElementById('rpassword').value;
    const phoneNum = document.getElementById('phoneNum').value;
    const newErrors = {};

    if (!name) {
      newErrors.name = 'Vui lòng nhập tên';
    }
    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
    }
    if (!username) {
      newErrors.username = 'Vui lòng nhập tên tài khoản';
    }
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    }
    if (!rpassword) {
      newErrors.rpassword = 'Vui lòng nhập lại mật khẩu';
    }
    if (!phoneNum) {
      newErrors.phoneNum = 'Vui lòng nhập số điện thoại';
    }
    
    if (email && !validateEmail(email)) {
      newErrors.email = 'Địa chỉ email không hợp lệ';
    }
    if (username && !validateUsername(username)) {
      newErrors.username = 'Tên tài khoản không chứa ký tự đặc biệt';
    }
    if (password && password.length < 8) {
      newErrors.password = 'Mật khẩu phải ít nhất 8 ký tự';
    }

    if (password !== rpassword) {
      newErrors.password = 'Mật khẩu không khớp';
    }

    if (phoneNum && !validatePhoneNumber(phoneNum)) {
      newErrors.phoneNum = 'Số điện thoại phải là 10 chữ số';
    }

    if (Object.keys(newErrors).length === 0) {
        fetch("http://localhost:8080/register", {
          method: "POST",
          mode: "cors",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => {
            if (response.ok) {
              toastr.success("Đăng ký tài khoản thành công");
              setTimeout(() => {
                window.location.href = "http://localhost:3000/login";
              }, 2000);
            } else if (response.status === 409) {
              response.text().then(errorMessage => {
                toastr.danger("Có lỗi xảy ra")
                newErrors.username = errorMessage;
                setErrors(newErrors);
            });
            } else {
              console.log("Error");
            }
            return null;
          })
          .then(() => {
            console.log(data);
          })
          .catch((err) => console.log(err));
    }    
    else {
      setErrors(newErrors);
    }
  };

  

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
                                  <p class="text-center h3 mb-3">Đăng ký thành viên</p>
                                  <form>
                                      <div class="mb-3">
                                          <label for="exampleInputtext1" class="form-label">Tên</label>
                                          <input type="text" value={user.name || ''} onChange={handleInputChange} class="form-control" id="name"/>
                                          {errors.name && <div className="text-danger">{errors.name}</div>}
                                      </div>                  
                                      <div class="mb-3">
                                          <label for="exampleInputEmail1" class="form-label">Địa chỉ Email</label>
                                          <input type="text" value={user.email || ''} onChange={handleInputChange} class="form-control" id="email"/>
                                          {errors.email && <div className="text-danger">{errors.email}</div>}
                                      </div>
                                      <div class="mb-3">
                                          <label for="username" class="form-label">Tên tài khoản</label>
                                          <input type="text" value={user.username || ''} onChange={handleInputChange} class="form-control" id="username"/>
                                          {errors.username && <div className="text-danger">{errors.username}</div>}
                                      </div>
                                      <div class="mb-3">
                                          <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
                                          <input type="password" value={user.password || ''} onChange={handleInputChange}  class="form-control" id="password"/>
                                          {errors.password && <div className="text-danger">{errors.password}</div>}
                                      </div>
                                      <div class="mb-3">
                                          <label for="exampleInputPassword2" class="form-label">Nhập lại mật khẩu</label>
                                          <input type="password" value={user.rpassword || ''} onChange={handleInputChange}  class="form-control" id="rpassword"/>
                                          {errors.rpassword && <div className="text-danger">{errors.rpassword}</div>}
                                      </div>
                                      <div class="mb-4">
                                          <label for="phoneNum" class="form-label">Số điện thoại</label>
                                          <input type="text" value={user.phoneNum || ''} onChange={handleInputChange} class="form-control" id="phoneNum"/>
                                          {errors.phoneNum && <div className="text-danger">{errors.phoneNum}</div>}
                                      </div>
                                      <button type="button" onClick={onAddClick} class="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2">Đăng ký</button>
                                      <div class="d-flex align-items-center justify-content-center">
                                          <p class="fs-4 mb-0 fw-bold">Đã có tài khoản?</p>
                                          <a class="text-primary fw-bold ms-2" href="" onClick={() => navigate('/login')}>Đăng nhập</a>
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

export default Register;