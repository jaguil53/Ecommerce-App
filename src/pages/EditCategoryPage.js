import React, { useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import AlertMessage from "../components/AlertMessage";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategoryDetails , updateCategory} from "../actions/categoryActions";

const EditCategoryPage = () => {
  const { id } = useParams();
  console.log(id);

  const dispatch = useDispatch();
  const { loading, success, error, category } = useSelector(
    (state) => state.categoryDetails
  );

  console.log(success, error, category)

  const dispatchForCategoryUpdate = useDispatch();
  const { successUpdate, errorUpdate } = useSelector(
    (state) => state.categoryUpdate
  );

  console.log(successUpdate, errorUpdate)

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      window.location.replace("/login");
    } else {
      dispatch(fetchCategoryDetails(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setName(category.name);
      setDescription(category.description);
    }
  }, [success, successUpdate]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const editCategoryhandler = (e) => {
    e.preventDefault();
    dispatchForCategoryUpdate(updateCategory(name, description, id))
  };

  return (
    <>
      <Container>
      {loading && (
          <AlertMessage variant="info" message="Loading Category details..." />
        )}
        {error && <AlertMessage variant="danger" message={error} />}
        {errorUpdate && <AlertMessage variant="danger" message={errorUpdate} />}
        {successUpdate && (
          <AlertMessage variant="success" message={successUpdate} />
        )}
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
            onClick={(e) => editCategoryhandler(e, id)}
          >
            Edit Category
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default EditCategoryPage;
