import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from './header';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import toastr from 'toastr';


function Books(props) {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const token = JSON.parse(localStorage.getItem('token'));
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    document.title = "Quản lý sách";
    fetch("http://localhost:8080/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
  }, []); 

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const onDeleteClick = (bookId) => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xoá?',
      text: "Xoá không thể hoàn tác!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#539bff',
      cancelButtonColor: '#fa896b',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Huỷ bỏ'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/book/delete/${bookId}`, {
          method: "DELETE",
          mode: "cors",
          headers: {
            'Content-Type': 'application/json; charset=ISO-8859-1',
          }
        })
          .then((response) => {
            if (response.ok) {
              toastr.success('Xóa thành công!'); 
              setBooks(books.filter((book) => book.id !== bookId));
            } else {
              console.log("Error deleting book");
            }
          })
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
    });
    
  };

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
          data-sidebar-position="fixed" data-header-position="fixed">
        <div class="body-wrapper">
          <Header/>
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12 d-flex align-items-stretch">
                <div class="card w-100">
                  <div class="card-body p-4">
                    <h5 class="card-title fw-semibold mb-4">Quản lý thư viện</h5>
                    <div class="search-box">
                      <div class="search-bar">
                        <input type="text" class="form-control search-input" placeholder="Tìm kiếm..." value={searchTerm} onChange={handleChange}/>
                      </div>
                      {token && user && <Link type="button" class="btn btn-success" to={`/book/-1`}>Thêm</Link>}
                    </div>                
                    <div class="table-responsive">
                      <table class="table align-middle">
                        <thead class="text-dark fs-4">
                          <tr>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0"></h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Tiêu đề</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Tác giả</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Thể loại</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Ngày phát hành</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0">Số trang</h6>
                            </th>
                            <th class="border-bottom-0">
                                <h6 class="fw-semibold mb-0 text-center"></h6>
                            </th>
                          </tr>
                        </thead>                    
                        <tbody>
                        {filteredBooks.map((book) => (
                          <tr>
                            <td class="border-bottom-0">
                                <p class="fw-semibold mb-0">
                                  <img style={{ width: '70px', height: 'auto' }} src={`/img/${book.image}`} />
                                </p>
                            </td>
                            <td class="border-bottom-0">
                                <p class="fw-semibold mb-0">{book.title}</p>
                            </td>                     
                            <td class="border-bottom-0">
                                <p class="mb-0 fw-normal">{book.author}</p>
                            </td>
                            <td class="border-bottom-0">
                                <p class="mb-0 fw-normal">{book.category}</p>
                            </td>
                            <td class="border-bottom-0">
                                <p class="mb-0 fw-normal">{book.releaseDate}</p>
                            </td>
                            <td class="border-bottom-0">
                              <p class="mb-0 fw-normal">{book.pageCount?book.pageCount:"N/A"}</p>
                            </td>
                            <td class="border-bottom-0">
                            {token && user ? (
                                <>
                                  <Link type="button" class="btn btn-info" to={`/book/${book.id}`}>Xem</Link>
                                  &nbsp;
                                  <button type="button" class="btn btn-danger" onClick={() => onDeleteClick(book.id)}>Xoá</button>
                                </>
                            ) : null}
                            </td>
                          </tr>
                          ))}
                        </tbody>                    
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
       </div>
    
  );
}

export default Books;