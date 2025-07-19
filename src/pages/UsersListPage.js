import React, { useEffect } from "react";
import { Table, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AlertMessage from "../components/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { listUsers, deleteUser } from "../actions/userActions";

const UsersListPage = () => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { successDelete, errorDelete } = userDelete;

  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
      console.log(users);
    } else {
      window.location.replace("/login");
    }
  }, [dispatch, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure, you want to delete the user?")) {
      dispatch(deleteUser(id));
    }
  };
  return (
    <>
      {loading && <AlertMessage variant="info" message="Loding..." />}
      {error && <AlertMessage variant="danger" message={error} />}
      {users && users.length == 0 && (
        <AlertMessage variant="info" message="No users found" />
      )}
      <Container>
        {!loading && (<LinkContainer to="/admin/user/new">
          <Button variant="primary" className="my-3">
            Add User
          </Button>
        </LinkContainer>)}
        {users && users.length > 0 && (
          <Table striped hover bordered className="table-sm">
            <thead>
              <tr className="text-center">
                <th>Id</th>
                <th>Username</th>
                <th>Email</th>
                <th>isAdmin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td>{user._id}</td>
                  <td>{user.username}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.isAdmin ? "True" : "False"}</td>
                  <td>
                    {/* <LinkContainer to={`/admin/user/${user._id}/edit`}> */}
                      <Button variant="info" className="mb-3" onClick={() => window.location.href=`/admin/user/${user._id}/edit`}>
                        Edit User
                      </Button>
                    {/* </LinkContainer> */}
                    <Button
                      variant="danger"
                      className="mb-3"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete User
                    </Button>
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

export default UsersListPage;
