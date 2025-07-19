import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Header = () => {
  const loggedInUser = useSelector((state) => state.login.userInfo);

  const dispatch = useDispatch();

  const handleSignOut = (event) => {
    console.log("Inside signOut Function")
    event.preventDefault();
    dispatch(logout());
  };
  console.log(loggedInUser);
  return (
    <header>
      <Navbar
        bg="primary"
        navbar="light"
        variant="dark"
        expand="lg"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>ECart</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            {loggedInUser && !loggedInUser.isAdmin && (<LinkContainer to="/cart">
                <Nav.Link>
                  <i className="bi bi-cart"> Cart</i>
                </Nav.Link>
              </LinkContainer>)}

              {loggedInUser && !loggedInUser.isAdmin && (
                <LinkContainer to="/orders">
                  <Nav.Link>
                    <i className="bi bi-bucket-fill"> Orders</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {loggedInUser && (
                <LinkContainer to="/profile">
                  <Nav.Link>
                    <i className="bi bi-bucket-fill"> Profile</i>
                  </Nav.Link>
                </LinkContainer>
              )}

              {loggedInUser && loggedInUser.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/users">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/products">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/categories">
                    <NavDropdown.Item>Categories</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orders">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {!loggedInUser && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"> Log In</i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {loggedInUser && (
                <LinkContainer to="/" onClick={handleSignOut}>
                  <Nav.Link>
                    <i className="bi bi-box-arrow-in-right"> Sign Out</i>
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
