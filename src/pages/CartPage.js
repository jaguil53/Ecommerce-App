import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
  ListGroupItem,
} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserCart,
  deletProductFromUserCart,
} from "../actions/cartActions";

import { placeOrderOfUser } from '../actions/orderActions'

const CartPage = () => {
  const dispatch = useDispatch();
  const fetchCart = useSelector((state) => state.fetchUserCart);
  let { loading, fetchSuccess, fetchError, cart } = fetchCart;

  const deletProduct = useSelector(state => state.deleteProductFromUserCart)
  const {loadingDelete, success, error} = deletProduct
  let productsIncart = [];
  // console.log("User cart : ", cart, fetchSuccess, fetchError, typeof cart, Object.keys(cart).length);

  if (fetchSuccess && Object.keys(cart).length > 0) {
    // productsIncart = products;
    // productsIncart.forEach((product) => console.log(product._id));
    // console.log();

    Object.values(cart.products).forEach((product) =>
      productsIncart.push(product)
    );

    console.log("ProductsIn Cart : ", productsIncart);
  }

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      dispatch(fetchUserCart());
    } else {
      window.location.replace("/login");
    }
  }, [dispatch, success]);

  const removeFromCart = (id) => {
    dispatch(deletProductFromUserCart(id));
  };

  function display() {
    console.log("Latest Values ", Object.values(cart.products));
    return true;
  }

  return (
    <>
      {/* {productsIncart} */}
      <Container>
        {loading && <AlertMessage variant="info" message="Loading..." />}
        {fetchSuccess && Object.keys(cart).length === 0 && (
          <h5 class="text-center">
            <AlertMessage
              variant="info"
              message="You have no items in your cart"
            />
          </h5>
        )}
        {fetchSuccess && Object.keys(cart).length > 0 && (
          <>
          <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h2>Items In Cart</h2>
                  </Col>
                </Row>
                <Row><br/></Row>
              </ListGroup.Item>
              {/* <ListGroup.Item></ListGroup.Item> */}
            </ListGroup>
            <Row>
              <ListGroup variant="flush" className="text-center">
                {productsIncart.map((product) => (
                  // <ListGroup.Item>
                    <Row>
                      <Col md={1}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={100}
                          height={100}
                          fluid
                          rounded
                        />
                      </Col>
                      <Col md={2}>
                        <Link to={`/product/${product._id}`}>
                          {product.name}
                        </Link>
                      </Col>
                      <Col md={2}>
                        <i>
                          {product.units} * ${product.price}
                        </i>
                      </Col>
                      <Col md={3}>
                        <Button
                          variant="danger"
                          onClick={() => removeFromCart(product._id)}
                        >
                          Remove From Cart
                        </Button>
                      </Col>
                      <Row><br/></Row>
                    </Row>
                  // </ListGroup.Item>
                ))}
              </ListGroup>
            </Row>
            
            <Row>
              <Col md={6} className="text-center">
                <Card className="my-5">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h5>
                        There are {Object.keys(cart.products).length} items in
                        your cart
                      </h5>
                      Subtotal $ {cart.orderTotalPrice}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Link to="/checkout">
                        <Button
                          type="button"
                          className="btn-block"
                        >
                          Proceed To Checkout
                        </Button>
                      </Link>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default CartPage;
