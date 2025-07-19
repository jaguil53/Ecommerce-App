import React from "react";
import { Container } from "react-bootstrap";

const OrderSuccessPage = () => {
  return (
    <Container>
      <div class="col-md-15">
        <h1 class="text-center">
          <i class="bi bi-check-circle-fill"></i>
        </h1>
        <h1 class="text-center">Order is successfully placed.</h1>
      </div>
    </Container>
  );
};

export default OrderSuccessPage;
