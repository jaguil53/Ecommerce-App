import React, { useEffect } from "react";
import { Button, Image, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, deletProduct } from "../actions/productActions";
import AlertMessage from "../components/AlertMessage";
import { listCategories } from "../actions/categoryActions";
import { Link } from 'react-router-dom'

const AdminProductsListPage = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, success, error, products } = productList;
  console.log(loading, success, error, products);

  const productDelete = useSelector((state) => state.productDelete);
  const { successDelete, errorDelete } = productDelete;

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts());
      dispatch(listCategories())
    } else {
      window.location.replace("/login");
    }
  }, [dispatch, successDelete]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure, you want to delete the product?")) {
      dispatch(deletProduct(id));
    }
  };

  
  return (
    <>
      {/* <Container> */}
      {loading && <AlertMessage variant="info" message="Loading..." />}
      {!loading && (
        <LinkContainer to="/admin/product/new">
          <Button variant="primary" className="my-3">
            Add Product
          </Button>
        </LinkContainer>
      )}
      {!loading && (!products || (products && products.length === 0)) && (
        <AlertMessage variant="info" message="No category created" />
      )}
      {success && products.length != 0 && (
        <Table striped hover bordered className="table-sm">
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Product Name</th>
              <th>Product Image</th>
              <th>Product Description</th>
              <th>Product Category</th>
              <th>Product Price</th>
              <th>Stock Left</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id} className="text-center">
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>
                  <Image
                    src={product.image}
                    width={200}
                    height={200}
                    rounded
                  ></Image>
                </td>
                <td>{product.description}</td>
                <td><Link to={'/admin/category/'+product.categoryId+'/edit'}>{product.categoryId}</Link></td>

                <td>{product.price}</td>
                <td>{product.quantityInStock}</td>
                <td>
                  {/* <LinkContainer to={`/admin/product/${product._id}/edit`}> */}
                    <Button variant="info" className="mb-3" onClick={() => window.location.href=`/admin/product/${product._id}/edit`}>
                      Edit
                    </Button>
                  {/* </LinkContainer> */}
                  <Button
                    variant="danger"
                    className="mb-3"
                    onClick={() => deleteProductHandler(product._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {/* </Container> */}
    </>
  );
};

export default AdminProductsListPage;
