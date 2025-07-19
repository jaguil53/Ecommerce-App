import React, { useEffect } from "react";
import { Table, Container, Button, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { listCategories, deletCategory } from "../actions/categoryActions";

const CategoriesListPage = () => {
  const dispatch = useDispatch();

  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, categories } = categoryList;
  console.log(categoryList);
  const categoryDelete = useSelector((state) => state.categoryDelete);
  const { successDelete, errorDelete } = categoryDelete;

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listCategories());
    } else {
      window.location.replace("/login");
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure, you want to delete the category?")) {
      dispatch(deletCategory(id));
    }
  };

  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      <Container>
        {!loading && (
          <LinkContainer to="/admin/category/new">
            <Button className="my-3">Add Category</Button>
          </LinkContainer>
        )}
        {!categories ||
          (categories.length === 0 && (
            <AlertMessage variant="info" message="No category created" />
          ))}

        {categories && categories.length > 0 && (
          // <Container>
          // <LinkContainer to="/admin/category/new">
          // <Button className="my-3">Add Category</Button></LinkContainer>
          <Table striped hover bordered className="table-sm">
            <thead>
              <tr class="text-center">
                <th>Id</th>
                <th>Category Name</th>
                <th>Category Description</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id} class="text-center">
                  <td>{category._id}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <Col>
                      {/* <LinkContainer
                        to={`/admin/category/${category._id}/edit`}
                      > */}
                        <Button variant="info" className="mb-3" onClick={() => window.location.href=`/admin/category/${category._id}/edit`}>
                          Edit Category
                        </Button>
                      {/* </LinkContainer> */}
                    </Col>
                    <Col>
                      <Button
                        variant="danger"
                        className="mb-3"
                        onClick={() => deleteHandler(category._id)}
                      >
                        Delete Category
                      </Button>
                    </Col>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
    </>
  );
};

export default CategoriesListPage;
