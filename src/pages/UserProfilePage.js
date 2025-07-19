import React from "react";
import { Form, Container, Button } from "react-bootstrap";

const UserProfilePage = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("userInfo"));

  console.log(loggedInUser);

  const [username, setUserName] = React.useState(loggedInUser.username);
  const [fullname, setFullName] = React.useState(loggedInUser.fullname);
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [email, setEmail] = React.useState(loggedInUser.email);

  if (!loggedInUser) {
    window.location.replace("/login");
  }

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

  return (
    <>
      <Container>
        <Form>
          <Form.Group controlId="username" className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              disabled
              onChange={(e) => handleUsernameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="fullname" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Full Name"
              value={fullname}
              disabled
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
          <Button type="submit" variant="primary" className="mb-3">
            Update Details
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default UserProfilePage;
