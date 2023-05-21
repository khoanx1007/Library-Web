import React, { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import Footer from './footer';
import './../App.css'; 
import toastr from 'toastr';

function Book(props) {
  const params = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [book, setBook] = useState({ category: "none"});
  const [img, setImg] = useState();
  const bookid = params.id;
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const formData = new FormData();
  formData.append('book', JSON.stringify(book));
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setImg(file);
    }
  };
  formData.append('image', img);
  const onSaveClick = () => {
    const { title, author, releaseDate, pageCount , category, image} = book;
    const newErrors = {};
    if (!title) {
      newErrors.title = "Vui lòng nhập tiêu đề";
    }
    if (!author) {
      newErrors.author = "Vui lòng nhập tác giả";
    }
    if (!releaseDate) {
      newErrors.releaseDate = "Vui lòng nhập ngày phát hành";
    }
    if (pageCount && isNaN(pageCount)) {
      newErrors.pageCount = "Số trang phải là một số";
    }
    if (!category){
      newErrors.category = "Vui lòng chọn danh mục";
    }
    if (!image && !selectedImage){
      newErrors.image = "Vui lòng chọn ảnh bìa sách";
    }
    if (Object.keys(newErrors).length === 0) {
      fetch(`http://localhost:8080/book/save/${bookid}`, {
      method: "PUT",
      mode: "cors",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          toastr.success('Cập nhật thành công');
        } else {
          console.log("Error updating book");
        }
      })
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          window.location.href = "http://localhost:3000/";
        }, 2000);
      })
      .catch((err) => console.log(err));;
      }
    else{
      setErrors(newErrors);
    }
  };
  const onAddClick = () => {
      const { title, author, releaseDate, pageCount , category, image} = book;
      const newErrors = {};
      if (!title) {
        newErrors.title = "Vui lòng nhập tiêu đề";
      }
      if (!author) {
        newErrors.author = "Vui lòng nhập tác giả";
      }
      if (!releaseDate) {
        newErrors.releaseDate = "Vui lòng nhập ngày phát hành";
      }
      if (pageCount && isNaN(pageCount)) {
        newErrors.pageCount = "Số trang phải là một số";
      }
      if (!category){
        newErrors.category = "Vui lòng chọn danh mục";
      }
      if (!image && !selectedImage){
        newErrors.image = "Vui lòng chọn ảnh bìa sách";
      }
      if (Object.keys(newErrors).length === 0) {
        fetch(`http://localhost:8080/book/save`, {
        method: "POST",
        mode: "cors",
        body: formData, 
        })
        .then((response) => {
          if (response.ok) {
            toastr.success('Thêm thành công');
          } else {
            console.log("Error updating book");
          }
        })
        .then((data) => {
          setTimeout(() => {
            window.location.href = "http://localhost:3000/";
          }, 2000);
          })
        .catch((err) => console.log(err));
        }
      else{
        setErrors(newErrors);
      }
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    document.title = "Thông tin sách";
    fetch('http://localhost:8080/categories')
      .then(response => response.json())
      .then(data => setCategories(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8080/book/${bookid}`)
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
          data-sidebar-position="fixed" data-header-position="fixed">
        <div class="body-wrapper">
            <div class="container-fluid">
              <form>
                <div class="row">
                  <div class="col-6">
                    <div class="row">
                      <div class="mb-3 col-6">
                        <label for="name" class="form-label">Tiêu đề*</label>
                        <input 
                          type="text" 
                          class="form-control" id="name" 
                          disabled={!isEditing && book.id>0} 
                          value={book.title} 
                          onChange={(e) => setBook({ ...book, title: e.target.value })}
                        />
                        {errors.title && <div className="text-danger">{errors.title}</div>}
                      </div>
                      <div class="mb-3 col-6">
                        <label for="tacgia" class="form-label">Tác giả*</label>
                        <input 
                          type="text"
                          class="form-control" id="tacgia" 
                          disabled={!isEditing && book.id>0} 
                          value={book.author}
                          onChange={(e) => setBook({ ...book, author: e.target.value })}
                        />
                        {errors.author && <div className="text-danger">{errors.author}</div>}
                      </div>
                      <div class="mb-3 col-12">
                          <label for="mota" class="form-label">Mô tả</label>
                          <textarea 
                            class="form-control" id="mota" rows="6" 
                            disabled={!isEditing && book.id>0} 
                            value={book.description} 
                            onChange={(e) => setBook({ ...book, description: e.target.value })}>
                          </textarea>
                          {errors.description && <div className="text-danger">{errors.description}</div>}
                      </div>  
                      <div class="mb-3 col-6">
                          <label for="ngayphathanh" class="form-label">Ngày phát hành*</label>
                          <input 
                            type="text" 
                            class="form-control" id="ngayphathanh" 
                            disabled={!isEditing && book.id>0} 
                            value={book.releaseDate}
                            onChange={(e) => setBook({ ...book, releaseDate: e.target.value })}
                          />
                          {errors.releaseDate && <div className="text-danger">{errors.releaseDate}</div>}
                      </div>
                      <div class="mb-3 col-6">
                          <label for="sotrang" class="form-label">Số trang</label>
                          <input 
                            type="text" 
                            class="form-control" 
                            id="sotrang" 
                            disabled={!isEditing && book.id>0} 
                            value={book.pageCount === 0 ? '' : book.pageCount}
                            onChange={(e) => setBook({ ...book, pageCount: e.target.value })}
                          />
                          {errors.pageCount && <div className="text-danger">{errors.pageCount}</div>}
                      </div>
                      <div class="mb-3 col-6">
                          <label for="theloai" class="form-label">Thể loại</label>
                          <select class="form-select form-control" id="selectBox" disabled={!isEditing && book.id>0} onChange={(e) => setBook({ ...book, category: e.target.value })} value={book.category}>
                            <option value="none" disabled selected>--Chọn thể loại--</option>
                            {categories.map(category => (
                              <option key={category.id} value={category.name}>{category.name}</option>
                            ))}
                          </select>
                          {errors.category && <div className="text-danger">{errors.category}</div>}
                      </div>   
                    </div>                                        
                  </div>
                  <div class="col-6 mb-3">
                      <button class="btn btn-primary" type="button" disabled={!isEditing && book.id>0} onClick={handleButtonClick}>Tải lên</button>
                      <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={handleFileChange}/>
                      {errors.image && <div className="text-danger">{errors.image}</div>}
                      <div className="d-flex">
                        {book.image && (
                          <div>
                            <b>Ảnh hiện tại:</b>
                            <p><img style={{ width: '150px', height: 'auto' , marginRight:'150px'}} src={`/img/${book.image}`}  alt="Selected" /></p>
                          </div>
                        )}
                        {selectedImage && (
                          <div>
                            <b>Ảnh được chọn:</b>
                            <p><img style={{ width: '150px', height: 'auto' }} src={selectedImage} alt="Selected" /></p>
                          </div>
                        )}
                      </div>
                  </div>                                    
                </div>     
                <div className="horizontal-line"></div>
                <Footer onSaveClick={onSaveClick} onAddClick={onAddClick} isEditing={isEditing} setIsEditing={setIsEditing}/>                
              </form> 
            </div>
          </div>
       </div>
  );
}

export default Book;
