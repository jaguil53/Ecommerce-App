import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { getUserOrdersHistory } from "../actions/orderActions";
import OrderProductsPage from "./OrderProductsPage";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const listUserOrders = useSelector((state) => state.getUserOrdersHistory);
  const { loading, success, error, orders } = listUserOrders;
  console.log(loading, success, error, orders);
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  useEffect(() => {
    dispatch(getUserOrdersHistory(userInfo._id));
  }, [dispatch]);

  const [showProducts, setShowProducts] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({});
  const [status, setStatus] = useState("");
  const [orderValue, setOrderValue] = useState(0);
  const [orderId, setOrderId] = useState(0);

  const showOrderInformation = (
    e,
    products,
    shippingDetails,
    orderTotalPrice,
    status,
    orderId
  ) => {
    e.preventDefault();
    setShowProducts(products);
    setShippingDetails(shippingDetails);
    setStatus(status);
    setOrderValue(orderTotalPrice);
    setOrderId(orderId);
  };


  return (
    <>
      {!showProducts && (
        <Container>
          {loading && (
            <AlertMessage variant="info" message="Loading previous orders" />
          )}
          {success && !orders && (
            <h4 class="text-center">
              <AlertMessage
                variant="info"
                message="You haven't ordered any items yet."
              />
            </h4>
          )}
          <>
            {!loading && orders && orders.length > 0 && (
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <h2>Order History</h2>
                    </Col>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            )}
            <Row>
              {orders && orders.length > 0 && (
                <Table striped hover bordered className="table-sm">
                  <thead>
                    <tr class="text-center">
                      <th>Order Id</th>
                      <th>Number of Items</th>
                      <th>Order Total</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Address</th>
                      <th>Status</th>
                      <th>View Products</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders &&
                      orders.length > 0 &&
                      orders.map((order, index) => (
                        <tr key={order._id} class="text-center">
                          <td>{order._id}</td>
                          <td>{Object.keys(order.products).length}</td>
                          <td>{order.orderTotalPrice}</td>
                          <td>
                            <a href={`mailto:${order.shippingDetails.email}`}>
                              {order.shippingDetails.email}
                            </a>
                          </td>
                          <td>{order.shippingDetails.phoneNo}</td>
                          <td>{order.shippingDetails.address}</td>
                          <td>{order.status}</td>
                          <td>
                            <LinkContainer to={`/order/${order._id}/`}>
                              <Button
                                variant="info"
                                className="mb-3"
                                onClick={(e) =>
                                  showOrderInformation(
                                    e,
                                    order.products,
                                    order.shippingDetails,
                                    order.orderTotalPrice,
                                    order.status,
                                    order._id
                                  )
                                }
                              >
                                View Products
                              </Button>
                            </LinkContainer>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              )}
            </Row>
          </>
        </Container>
      )}
      {showProducts && (
        <OrderProductsPage
          products={showProducts}
          orderId={orderId}
          shippingDetails={shippingDetails}
          orderValue={orderValue}
          status={status}
          isAdminView={false}
        />
      )}
    </>
  );
};

export default OrdersPage;
