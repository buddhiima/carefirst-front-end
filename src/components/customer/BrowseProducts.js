import React from 'react'
import Row from "react-bootstrap/Row";
import Footer from "../Footer";
import NavbarCustomer from "./NavbarCustomer";
import DataTable from "react-data-table-component";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Carousel } from 'react-responsive-carousel';
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import carouselimg1 from '../../assets/carousel-img-1.png'
import carouselimg2 from '../../assets/carousel-img-2.png'
import carouselimg3 from '../../assets/carousel-img-3.png'


function BrowseProducts() {
  return (
    <>
    <header className="App-header">
        <NavbarCustomer />
    </header>

    <body>

        <Container className="main-section">

            <Row>
                <Carousel autoPlay>
                    <div>
                    <img src={carouselimg1}/>
                </div>
                <div>
                    <img src={carouselimg2} />
                </div>
                <div>
                    <img src={carouselimg3} />
                </div>
                </Carousel>
            </Row>

            <Row>
                <center><p style={{fontWeight:"bold"}}>BROWSE OUR PRODUCTS</p></center>
            </Row>

            <Row>
                
            </Row>

        </Container>

    <Row>
        <Footer />
    </Row>

    </body>
    </>
  )
}

export default BrowseProducts