import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { placeOrderOfUser } from "../actions/orderActions";
import AlertMessage from "../components/AlertMessage";

const CheckoutPage = () => {
  const [ email, setEmail ] = useState("");
  const [ address, setAddress ] = useState("");
  const [ phoneNo, setPhoneNo ] = useState("");
  
  const handleEmailChange = (e) => {
    console.log(e.target)
    setEmail(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };

  const dispatch = useDispatch();
  const placeOrder = useSelector((state) => state.placeOrderOfUser);
  const { loading, success, error } = placeOrder;
  console.log(loading, success, error);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (email == "" || address == "" || phoneNo == "") {
      error = "Please fill all details";
    } else {
      console.log(email, address, phoneNo)
      const shippingDetails = {
        email: email,
        phoneNo: phoneNo,
        address: address,
      };
      dispatch(placeOrderOfUser(shippingDetails));
    }
  };
  return (
    <Container>
      {loading && (
        <AlertMessage variant="info" message="Your order is getting place" />
      )}
      {success && (
        <div class="col-md-15">
          <h1 class="text-center">
            <i class="bi bi-check-circle-fill"></i>
          </h1>
          <h1 class="text-center">Order is successfully placed.</h1>
        </div>
      )}

      {!success && !error && (
        <Form>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Id</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email Id"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="address" className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Address"
              value={address}
              onChange={(e) => handleAddressChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="phoneNo" className="mb-3">
            <Form.Label>Phone No</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone No"
              value={phoneNo}
              onChange={(e) => handlePhoneNoChange(e)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={(e) => handlePlaceOrder(e)}
          >
            Place Order
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default CheckoutPage;
