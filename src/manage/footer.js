import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import { useParams } from "react-router-dom";
  
const Footer = (props) => {
    const params = useParams();
    const bookid = params.id;
    const navigate = useNavigate();
    const isEditing = props.isEditing;
    const setIsEditing = props.setIsEditing;
    const onSaveClick = props.onSaveClick;
    const onAddClick = props.onAddClick;
    function render(bookid) {
        if(bookid>0){
          return <div class="d-flex justify-content-end">
                    {!isEditing && <button type="button" class="btn btn-primary" onClick={() => setIsEditing(true)}>Sửa</button>}
                    {isEditing && <button type="button" class="btn btn-primary" onClick={onSaveClick}>Lưu</button>}
                    &nbsp;
                    <button type="button" class="btn btn-danger" onClick={() => navigate('/')}>Huỷ</button>
                </div>;
        }
        else{
          return <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-info" onClick={onAddClick}>Thêm</button>
                    &nbsp;
                    <button type="button" class="btn btn-danger" onClick={() => navigate('/')}>Huỷ</button>
                </div>;
        }
    }
    return (
        render(bookid)
    );
}
export default Footer;