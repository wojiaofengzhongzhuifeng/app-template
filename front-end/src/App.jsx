import {useEffect, useState} from 'react'
import './App.css'
import {Button, Card, Form, Input, message, Table, Upload} from 'antd';
import {isEmpty, useRequest} from "./utils/index.js";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Home from "./page/home/index.jsx";
import Category from "./page/category/index.jsx";
import Error from "./page/Error/index.jsx";





function App() {
  // const { loading: createLoading, error, result, fetchData } = useRequest({url: '/category', method: 'post'}, {autoFetch: false})

  return (
    <>
      <Router>

        <Routes>
          <Route path="/" element={<Home />} />  // 正确：Route 被包裹在 Routes 中
        </Routes>
        <Routes>
          <Route path="/category" element={<Category />} />  // 正确：Route 被包裹在 Routes 中
        </Routes>
        <Routes>
          <Route path="/error" element={<Error />} />  // 正确：Route 被包裹在 Routes 中
        </Routes>

      </Router>




    </>
  )
}

export default App
