import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  FormGroup,
  Form,
  Image,
  Dropdown,
  Container,
} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  updateProductDetails,
} from "../actions/productActions";

const EditProductPage = () => {
  const { id } = useParams();
  console.log(id);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState(0);
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [quantityInStock, setQuantityInStock] = React.useState(0);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantityInStock(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.value);
  };

  const editProductHandler = (event) => {
    event.preventDefault();
  };

  const dispatch = useDispatch();
  const { loading, success, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setName(product.name);
      setDescription(product.description);
      setImage(product.image);
      setPrice(product.price);
      setQuantityInStock(product.quantityInStock);
      setCategory(product.categoryId);
    }
  }, [success]);

  const dispatchProductUpdate = useDispatch();
  const { successUpdate, errorUpdate } = useSelector(
    (state) => state.productDetailsUpdate
  );

  const editProductDetails = (e) => {
    e.preventDefault();
    dispatchProductUpdate(
      updateProductDetails(
        id,
        name,
        description,
        parseInt(quantityInStock),
        price,
        category,
        image
      )
    );
  };
  return (
    <>
      <LinkContainer to="/admin/products">
        <Button variant="primary" className="my-3">
          Show Products List
        </Button>
      </LinkContainer>
      {loading && (
        <AlertMessage variant="info" message="Laoding product details..." />
      )}
      {error && <AlertMessage variant="success" message={success} />}
      {successUpdate && (
        <AlertMessage variant="success" message={successUpdate} />
      )}
      {errorUpdate && <AlertMessage variant="danger" message={errorUpdate} />}
      <Container>
        <div className="text-center">
          <Image src={image} width={200} height={200} rounded></Image>
        </div>
      </Container>

      <Form onSubmit={editProductHandler}>
        <FormGroup controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => handleNameChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="description" className="my-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="textarea"
            placeholder="Enter description"
            value={description}
            onChange={(e) => handleDescriptionChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="price" className="my-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            min={0}
            placeholder="Enter Price"
            value={price}
            onChange={(e) => handlePriceChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="quantity" className="my-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            min={0}
            placeholder="Enter Quantity In Stock"
            value={quantityInStock}
            onChange={(e) => handleQuantityChange(e)}
          ></Form.Control>
        </FormGroup>
        {/* <FormGroup controlId="category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="category">
              Select Category
            </Dropdown.Toggle>
          </Dropdown>
          <Dropdown.Menu>
            {categories.length > 0 &&
              categories.map((category) => {
                console.log(category);
                <Dropdown.Item
                  accessKey={category.id}
                  onClick={(e) => handleCategoryChange(e)}
                >
                  {category.name}
                </Dropdown.Item>;
              })}
          </Dropdown.Menu>
        </FormGroup> */}
        <FormGroup controlId="category">
          <Form.Label>Category</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Category"
            value={category}
            onChange={(e) => handleCategoryChange(e)}
          ></Form.Control>
        </FormGroup>
        <FormGroup controlId="image" className="my-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Image URL"
            value={image}
            onChange={(e) => handleImageChange(e)}
          />
        </FormGroup>
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => editProductDetails(e)}
        >
          Edit Product
        </Button>
      </Form>
    </>
  );
};

export default EditProductPage;
