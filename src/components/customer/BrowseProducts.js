import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Footer from '../Footer';
import NavbarCustomer from './NavbarCustomer';
import DataTable from 'react-data-table-component';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

import Button from 'react-bootstrap/Button';
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import carouselimg1 from '../../assets/carousel-img-1.png';
import carouselimg2 from '../../assets/carousel-img-2.png';
import carouselimg3 from '../../assets/carousel-img-3.png';
import api from '../../api/axiosConfig';
import ViewProductModal from './ViewProductModal';

const BrowseProducts = () => {
  const [products, setProducts] = useState();
  const [openViewProductModal, setOpenViewProductModal] = useState(false);
  const [product, setProduct] = useState();
  const [existingOrCreatedOrderID, setExistingOrCreatedOrderID] = useState();

  useEffect(() => {
    document.title = 'Browse';
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const response = await api.get('/api/product/activeproducts');
      // console.log(response.data);
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const checkForExistingOrder = async (status, customerID) => {
    var formData = new FormData();
    formData.append('customerID', customerID);
    formData.append('status', status);

    api({
      method: 'get',
      url: `http://localhost:8081/api/order/${status}/${customerID}`,
    })
      .then((response) => {
        // console.log('res ', response);
        if (response.status == 200) {
          // if an order does not exist
          if (response.data === '') {
            console.log('an order does not exist for this customer');

            // creating a new order and return the order ID

            var formData = new FormData();
            formData.append('customerID', customerID);
            formData.append('status', status);

            api({
              method: 'post',
              url: 'http://localhost:8081/api/order/new',
              data: formData,
              headers: { 'Content-Type': 'multipart/form-data' },
            })
              .then((res) => {
                if (response.status == 201) {
                  setExistingOrCreatedOrderID(res.data);
                  console.log('createdOrderID ', existingOrCreatedOrderID);
                }
              })
              .catch(function (error) {
                console.log(error);
                alert('Could not create order!');
              });

            // if an order exists, return the order ID
          } else {
            console.log('an order exists for this customer');
            setExistingOrCreatedOrderID(response.data.orderID);
            console.log('existingOrderID ', existingOrCreatedOrderID);
          }
          // [to do] add the order item to db here
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createOrderItem = async (
    existingOrCreatedOrderID,
    id,
    name,
    qty,
    price,
    total
  ) => {
    console.log('existingOrCreatedOrderID ', existingOrCreatedOrderID);

    api({
      method: 'post',
      url: 'http://localhost:8081/api/orderitems',
      data: {
        id: existingOrCreatedOrderID.existingOrCreatedOrderID,
        productID: existingOrCreatedOrderID.id,
        name: existingOrCreatedOrderID.name,
        qty: '1',
        unit_price: existingOrCreatedOrderID.price,
        total: '',
      },
      headers: {},
    })
      .then((response) => {
        if (response.status == 201) {
          alert('Item added to cart!');
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const Product = (props) => {
    // console.log('props ',props)
    const {
      id,
      name,
      description,
      prescription_drug,
      price,
      imageURL,
      isDeleted,
    } = props;

    return (
      <article className="product">
        <h5>{name}</h5>
        <button
          id="product-img"
          onClick={() => {
            setOpenViewProductModal(true);
            setProduct(props);
          }}
        >
          <img src={imageURL} alt={name}></img>
        </button>
        <h6>Rs. {price}</h6>

        {prescription_drug.toString() == 'true' ? (
          <p
            style={{
              color: '#FFFFFF',
              backgroundColor: '#FFB031',
              width: '10rem',
              margin: 'auto',
              marginBottom: '1rem',
              padding: '0.3rem',
            }}
          >
            Prescription needed
          </p>
        ) : (
          <p
            style={{
              color: '#FFFFFF',
              backgroundColor: '#FFB031',
              width: '10rem',
              margin: 'auto',
              marginBottom: '1rem',
              padding: '0.3rem',
              visibility: 'hidden',
            }}
          >
            Prescription needed
          </p>
        )}

        <span className="product-span">
          <p>Qty</p>
          <input type="number" max={100} min={0} value={1}></input>
          <button
            className="btn btn-success"
            style={{ backgroundColor: 'green' }}
            onClick={() => {
              checkForExistingOrder('created', 'cust548');
              createOrderItem({
                existingOrCreatedOrderID,
                id,
                name,
                qty: '1',
                price,
                total: '',
              });
            }}
          >
            Add to cart
          </button>
        </span>
      </article>
    );
  };

  function ProductList() {
    return (
      <section className="product-list">
        {products &&
          products.map((product) => {
            return <Product key={product.id} {...product}></Product>;
          })}
      </section>
    );
  }

  return (
    <>
      <header className="App-header">
        <NavbarCustomer />
      </header>

      <body>
        {openViewProductModal && (
          <ViewProductModal
            setOpenViewProductModal={setOpenViewProductModal}
            product={product}
          />
        )}

        <div className="main-section">
          <Carousel autoPlay showThumbs={false} infiniteLoop={true}>
            <div>
              <img src={carouselimg1} />
            </div>
            <div>
              <img src={carouselimg2} />
            </div>
            <div>
              <img src={carouselimg3} />
            </div>
          </Carousel>

          <Row>
            <center>
              <p
                style={{
                  marginTop: '8rem',
                  fontSize: '2rem',
                  color: '#04004a',
                }}
                className="display-4"
              >
                BROWSE OUR STORE
              </p>
            </center>
          </Row>
        </div>

        <Container>
          <Row>
            <ProductList />
          </Row>
        </Container>

        <Row>
          <Footer />
        </Row>
      </body>
    </>
  );
};

export default BrowseProducts;
