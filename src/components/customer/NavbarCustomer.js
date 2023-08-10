import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { Cart } from 'react-bootstrap-icons';
import logo from '../../assets/logo.png';
import '../../index.css';

const NavbarCustomer = () => {
  return (
    <Navbar bg="light" variant="light" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="brand logo" height="36"></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse>
          <Nav
            className="me-auto my-2 my-lg-2"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <NavLink className="nav-link" to="/">
              HOME
            </NavLink>
            <NavLink className="nav-link" to="/customer/browse">
              BROWSE
            </NavLink>
            <NavLink className="nav-link" to="/">
              ABOUT US
            </NavLink>
          </Nav>
          <NavLink className="nav-link" to="/">
            ACCOUNT
          </NavLink>
          <NavLink className="nav-link cart-icon" to="/customer/cart">
            <a href="#">
              <Cart />
            </a>
          </NavLink>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarCustomer;
