import logo from './logo.svg';
import './App.css';
import './assets/css/styles.min.css';
import './assets/css/style.css';
import './assets/js/sidebarmenu.js';
import './assets/js/app.min.js';
import { Routes,Router, Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Books from './manage/books';
import Book from './manage/savebook';
import React from 'react';
import 'toastr/build/toastr.min.css';

function App() {
  return (
        <Routes>
          <Route path='/' element={<Books/>}></Route>
          <Route path='/book/:id' element={<Book/>}></Route>
        </Routes> 
  );
}


export default App;
