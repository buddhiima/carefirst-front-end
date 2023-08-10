import React, { useState, useEffect } from 'react';
import Footer from '../Footer';
import NavbarCustomer from './NavbarCustomer';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import api from '../../api/axiosConfig';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [orderItems, setOrderItems] = useState();

  useEffect(() => {
    document.title = 'Cart';
    getorderItems('created', 'cust548');
  }, []);

  const getorderItems = async (status, customerID) => {
    var formData = new FormData();
    formData.append('customerID', customerID);
    formData.append('status', status);

    api({
      method: 'get',
      url: `http://localhost:8081/api/order/${status}/${customerID}`,
    }).then((response) => {
      console.log('res ', response.data.items);
      if (response.status == 200) {
        var data = response.data.items;
        setOrderItems(data);
        console.log('orderItems', orderItems);
      }
    });
  };

  const OrderItem = (props) => {
    // console.log('props ',props)
    const { id, productID, name, qty, unit_price, total } = props;

    return (
      <article>
        <Row>
          <Col>
            <p>{name}</p>
          </Col>
          <Col>
            <p>Rs. {unit_price}</p>
          </Col>
          <Col>
            <p>x{qty}</p>
          </Col>
          <Col>
            <p>Rs. {total}</p>
          </Col>
        </Row>
      </article>
    );
  };

  function OrderItemList() {
    return (
      <section>
        {orderItems &&
          orderItems.map((orderItem) => {
            return <OrderItem key={orderItem.id} {...orderItem}></OrderItem>;
          })}
      </section>
    );
  }

  const calcGrandTotal = (orderItems) => {
    const itms = Object.entries(orderItems || {});
    console.log('itms ', itms);
    var grandTotal = 0;
    for (let index = 0; index < itms.length; index++) {
      const element = itms[index];
      const totals = element[1].total;
      console.log('ele ', element[1].total);
      grandTotal = grandTotal + totals;
    }
    return grandTotal;
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/customer/orderplaced`;
    navigate(path);
  };

  return (
    <>
      <header className="App-header">
        <NavbarCustomer />
      </header>

      <body>
        <div className="main-section">
          <center>
            <Row style={{ marginTop: '2rem' }}>
              <Col>
                <p
                  className="display-4"
                  style={{
                    fontSize: '3rem',
                    marginLeft: '1rem',
                    marginBottom: '3rem',
                  }}
                >
                  MY CART
                </p>
              </Col>
            </Row>

            <Container>
              <Row>
                <OrderItemList />
                <h3
                  style={{
                    paddingLeft: '0rem',
                    padding: '0.7rem',
                    backgroundColor: '#90ee90',
                    borderRadius: '1rem',
                    color: 'black',
                    fontSize: '1.1rem',
                    marginTop: '5rem',
                  }}
                >
                  GRAND TOTAL &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Rs.{' '}
                  {calcGrandTotal(orderItems)}
                </h3>
              </Row>
              <Row>
                <Button
                  style={{ width: 'auto', margin: 'auto', marginTop: '1.5rem' }}
                  onClick={routeChange}
                >
                  PLACE ORDER
                </Button>
              </Row>
            </Container>

            <Container style={{ marginTop: '1rem' }}>
              <small>We only accept cash on delivery.</small>
            </Container>

            <Container>
              <Row></Row>
            </Container>
          </center>
        </div>

        <Row>
          <Footer />
        </Row>
      </body>
    </>
  );
};

export default Cart;
