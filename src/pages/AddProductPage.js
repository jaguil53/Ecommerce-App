import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Button,
  FormGroup,
  Form,
  Dropdown,
  Image,
  Container,
} from "react-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../actions/productActions";
import { listCategories } from "../actions/categoryActions";

const AddProductPage = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [image, setImage] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [selectedCategoryName, setSelectedCategoryName] = React.useState("");
  const [categoryId, setCategoryId] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const categories = useSelector((state) => state.categoryList.categories);
  console.log(categories);
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategories());
    } else {
      window.location.replace("/login");
    }
  }, []);
  console.log(categories);

  const products = JSON.parse(localStorage.getItem("products")) || [];

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.target.value);
  };

  const handleCategoryChange = (categoryId) => {
    setCategoryId(categoryId);
    const selectedCategory = categories.filter((category)=>category._id==categoryId);
    console.log(selectedCategory);
    setSelectedCategoryName(selectedCategory[0].name)
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  const handleImageChange = (event) => {
      setImage(event.target.value);
  };

  const dispatch = useDispatch();
  const productCreate = useSelector((state) => state.addProduct);
  const { loading, success, error } = productCreate;

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  const createProductHandler = (event) => {
    event.preventDefault();
    if (userInfo && userInfo.isAdmin) {
      console.log(name, description, price, quantity, image, categoryId)
      dispatch(
        addProduct(name, description, price, quantity, image, categoryId)
      );
    } else {
      window.location.replace("/login");
    }
  };

  return (
    <>
      {loading && <AlertMessage variant="info" message="Loading..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      <LinkContainer to="/admin/products">
        <Button variant="primary" className="my-3">
          Show Products List
        </Button>
      </LinkContainer>
      {success && <AlertMessage variant="success" message={success} />}
      <Container>
        {image && (
          <div className="text-center">
            <Image src={image} width={200} height={200} rounded></Image>
          </div>
        )}
      </Container>
      <Form onSubmit={createProductHandler}>
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
            value={quantity}
            onChange={(e) => handleQuantityChange(e)}
          ></Form.Control>
        </FormGroup>
        
        <FormGroup controlId="category" className="my-3">
          <Form.Label>Category</Form.Label>
          <Dropdown onSelect={(eventKey) => handleCategoryChange(eventKey)}>
            <Dropdown.Toggle variant="primary" id={categoryId}>
              {selectedCategoryName? selectedCategoryName:"Select Category"}
            </Dropdown.Toggle>
          
          <Dropdown.Menu >
            {categories &&
              categories.map((category) => (
                
                <Dropdown.Item key={category._id} eventKey={category._id}>
                  {category.name}
                </Dropdown.Item>
              ))}
          </Dropdown.Menu>
          </Dropdown>
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
        <Button variant="primary" type="submit">
          {" "}
          Add Product{" "}
        </Button>
      </Form>
    </>
  );
};

export default AddProductPage;
