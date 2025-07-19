import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useSelector, useDispatch } from "react-redux";
import { addCategory } from "../actions/categoryActions";

const AddCategoryPage = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const dispatch = useDispatch();
  const categoryCreate = useSelector((state) => state.addCategory);
  const { loading, success, error } = categoryCreate;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const addCategoryhandler = (e) => {
    e.preventDefault();
    dispatch(addCategory(name, description));
  };

  return (
    <>
      <Container>
        {loading && (
          <AlertMessage variant="info" message="Category is being created..." />
        )}
        {error && <AlertMessage variant="danger" message={error} />}
        {success && <AlertMessage variant="success" message={success} />}
        <LinkContainer to="/admin/categories">
          <Button variant="primary" className="my-3">
            Categories List
          </Button>
        </LinkContainer>
        <Form>
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) => handleNameChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="description" className="mb-3">
            <Form.Label>Category Description</Form.Label>
            <Form.Control
              type="textarea"
              placeholder="Category Description"
              value={description}
              onChange={(e) => handleDescriptionChange(e)}
            />
          </Form.Group>

          <Button
            type="submit"
            variant="primary"
            className="mb-3"
            onClick={addCategoryhandler}
          >
            Add Category
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default AddCategoryPage;
