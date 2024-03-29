import React from 'react';
import { useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home.js';
import Products from './components/staff/Products';
import BrowseProducts from './components/customer/BrowseProducts';
import OrderPlaced from './components/customer/OrderPlaced';
import Cart from './components/customer/Cart';

function App() {
  useEffect(() => {
    document.title = 'Home';
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/staff/products" element={<Products />}></Route>
          <Route path="/customer/browse" element={<BrowseProducts />}></Route>
          <Route path="/customer/cart" element={<Cart />}></Route>
          <Route path="/customer/orderplaced" element={<OrderPlaced />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
