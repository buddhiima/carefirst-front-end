import React from 'react';
import orderConfirmed from '../../assets/order-confirmed.jpg';
import NavbarCustomer from './NavbarCustomer.js';
import Footer from '../Footer.js';
const OrderPlaced = () => {
  return (
    <>
      <header className="App-header">
        <NavbarCustomer />
      </header>

      <center>
        <p className="display-4" style={{ marginTop: '5rem' }}>
          We have received your order!
        </p>
        <small style={{ fontSize: '1.2rem' }}>
          One of our agents will get in touch with you soon..
        </small>
        <img src={orderConfirmed} style={{ height: '75.3vh' }}></img>
      </center>

      <div className="row">
        <Footer />
      </div>
    </>
  );
};

export default OrderPlaced;
