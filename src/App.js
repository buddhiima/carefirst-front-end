import React from "react";
import { useEffect } from "react";
import {Routes, Route, Link} from 'react-router-dom'
import Layout from './components/Layout';
import Home from './components/Home.js'
import Dashboard from './components/staff/Products'
import Products from "./components/staff/Products";

function App() {

  useEffect(() => {
    document.title = 'Home'
  }, [])


  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/" element={<Home/>}></Route>
              <Route path="/staff/dashboard" element={<Dashboard/>}></Route>
              <Route path="/staff/products" element={<Products/>}></Route>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
