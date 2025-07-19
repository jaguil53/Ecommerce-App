import React, { useState, useEffect } from "react";
import { Row, Col, Image, Button, ListGroup, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { LinkContainer } from "react-router-bootstrap";
import { fetchProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Spinner from 'react-bootstrap/Spinner';



const ProductPage = () => {
  const { id } = useParams();
  

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, success, error, product } = productDetails;
  const loggedInUser = JSON.parse(sessionStorage.getItem('userInfo'));
  console.log(loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch]);

  const quantityDropdownOptions = [];
  for (let i = 1; i <= 10; i++) {
    quantityDropdownOptions.push(<option key={i} value={i}>{i}</option>);
  }

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  return (
    <>
      {loading && <Spinner animation="grow" />}
      {error && (
        <AlertMessage
          variant="danger"
          message="Not able to load product details"
        />
      )}

      <LinkContainer to="/">
        <Button variant="primary" className="mb-4">
          Show All Products
        </Button>
      </LinkContainer>
      {success && product && (
        <Row>
          <Col md={4}>
            <Image src={product.image} width={300} height={300} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.title}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Description : {product.description}</h4>
              </ListGroup.Item>
              <ListGroup.Item>
                <h4>Category : {product.category}</h4>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Price : </h4>
                  </Col>
                  <Col>
                    <h4>
                      <strong>${product.price}</strong>
                    </h4>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Status : </h4>
                  </Col>
                  <Col>
                    <h4>
                      <strong>{"Available"}</strong>
                    </h4>
                  </Col>
                </Row>
              </ListGroup.Item>

              {loggedInUser && 
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h4>Select Quantity : </h4>
                  </Col>
                  <Col>
                    <Form.Control
                      as="select"
                      value={selectedQuantity}
                      onChange={(e) => setSelectedQuantity(e.target.value)}
                    >
                      {quantityDropdownOptions}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroup.Item>
              }
              {loggedInUser && 
              <ListGroup.Item>
                <Button className="btn-block" type="button">
                  Add To Cart
                </Button>
              </ListGroup.Item>
              }
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductPage;
