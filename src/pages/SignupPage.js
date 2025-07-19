import React from "react";
import { Form, Col, Row, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import {useDispatch, useSelector} from 'react-redux'
import { registerUser } from "../actions/userActions";

const SignupPage = () => {
  const [username, setUserName] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)
  const {loading, success, error} = userRegister
  console.log(loading, success, error)
  
  const registerHandler = (event) => {
    event.preventDefault();
    dispatch(registerUser(username, fullName, email, password, false))
  };

  return (
    <>
      <Container>
        {error && <AlertMessage variant="danger" message={error} />}
        {success && <AlertMessage variant="success" message={success} />}
        <Form>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => handleUsernameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="fullname" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => handleFullNameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="pasword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => handlePasswordChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={registerHandler}
          >
            Signup
          </Button>
        </Form>

        <Row>
          <Col>
            Have an Account ? <Link to="/login">Login</Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignupPage;
