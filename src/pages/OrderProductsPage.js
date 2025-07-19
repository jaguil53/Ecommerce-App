import React, { useState } from "react";
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
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AlertMessage from "../components/AlertMessage";
import { changeUserOrderStatus } from "../actions/orderActions";

const OrderProductsPage = (props) => {
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  let productsList = [];

  const {
    products,
    shippingDetails,
    orderId,
    orderValue,
    status,
    isAdminView,
  } = props;
  console.log(props);

  const [orderStatus, setOrderStatus] = useState(status);

  const handleOrderStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };

  Object.values(products).forEach((product) => productsList.push(product));
  const showAllOrders = (e) => {
    e.preventDefault();
    window.location.reload();
  };

  const dispatch = useDispatch();
  const { loading, successChangeStatus, errorChangeStatus } = useSelector(
    (state) => state.changeUserOrderStatus
  );

  function changeOrderStatusHandler (e) {
    e.preventDefault();
    dispatch(changeUserOrderStatus(orderId, orderStatus));
  };

  return (
    <>
      {/* {productsIncart} */}
      <Container>
        {successChangeStatus && (
          <AlertMessage variant="success" message={successChangeStatus} />
        )}
        <LinkContainer to="/orders">
          <Button
            variant="primary"
            className="my-3"
            onClick={(e) => showAllOrders(e)}
          >
            Show All Orders
          </Button>
        </LinkContainer>
        <ListGroup variant="flush">
          <ListGroup.Item>
            <Row className="text-left">
              <Col>
                <h4>Order Details</h4>
              </Col>
            </Row>
            {/* <Row>
                <br />
              </Row> */}
          </ListGroup.Item>
          <ListGroup.Item>
            <Row className="text-left">
              <Col>Order Id</Col>
              <Col>{orderId}</Col>
            </Row>
            {!isAdminView && (
              <Row className="text-left">
                <Col>Order Status</Col>
                <Col>{orderStatus}</Col>
              </Row>
            )}
            <Row className="text-left">
              <Col>Order Value</Col>
              <Col>{orderValue}</Col>
            </Row>
            <Row className="text-left">
              <Col>Shipping Address</Col>
              <Col>{shippingDetails.address}</Col>
            </Row>
            <Row className="text-left">
              <Col>Shipping EmailId</Col>
              <Col>{shippingDetails.email}</Col>
            </Row>
            <Row className="text-left">
              <Col>Shipping Phone No</Col>
              <Col>{shippingDetails.phoneNo}</Col>
            </Row>
          </ListGroup.Item>
          {isAdminView && (
            <ListGroup.Item>
              <Row className="text-left">
                <Col>
                  <h4>Order Status</h4>
                </Col>
              </Row>
            </ListGroup.Item>
          )}
          {isAdminView && (
            <ListGroup.Item>
              <Row>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Enter Order Status"
                    value={orderStatus}
                    onChange={(e) => handleOrderStatusChange(e)}
                  ></Form.Control>
                </Col>
                <Col>
                  <Button
                    variant="info"
                    className="mb-3"
                    onClick={(e) => changeOrderStatusHandler(e)}
                  >
                    Change Order Status
                  </Button>
                </Col>
                <Col></Col>
              </Row>
            </ListGroup.Item>
          )}
          <ListGroup.Item></ListGroup.Item>
        </ListGroup>
        {productsList && Object.keys(productsList).length > 0 && (
          <>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row className="text-left">
                  <Col>
                    <h4>Products Ordered</h4>
                  </Col>
                </Row>
                <Row>
                  <br />
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <Row>
              <ListGroup variant="flush" className="text-center">
                {productsList.map((product) => (
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
                      <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </Col>
                    <Col md={2}>
                      <i>
                        {product.units} * ${product.price}
                      </i>
                    </Col>
                    <Row>
                      <br />
                    </Row>
                  </Row>
                  // </ListGroup.Item>
                ))}
              </ListGroup>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default OrderProductsPage;
