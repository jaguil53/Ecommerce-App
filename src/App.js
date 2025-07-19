import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import ProductsListPage from "./pages/ProductsListPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import ProductsListPage from "./pages/ProductPage";
// import UserCartPage from "./pages/UserCartPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrdersPage from "./pages/OrdersPage";
import SignupPage from "./pages/SignupPage";
import UserProfilePage from "./pages/UserProfilePage";
import UsersListPage from "./pages/UsersListPage";
import UserEditPage from "./pages/UserEditPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import AddUserPage from "./pages/AddUserPage";
import AdminProductsListPage from "./pages/AdminProductsListPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import AdminOrdersListPage from "./pages/AdminOrdersListPage";
import CheckoutPage from "./pages/CheckoutPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<ProductsListPage />} exact />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/product/:id" element={<ProductPage />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/checkout" element={<CheckoutPage />}></Route>
            <Route path="/orders" element={<OrdersPage />}></Route>
            <Route path="/register" element={<SignupPage />}></Route>
            <Route path="/profile" element={<UserProfilePage />}></Route>
            <Route path="/admin/users" element={<UsersListPage />}></Route>
            <Route
              path="/admin/categories"
              element={<CategoriesListPage />}
            ></Route>
            <Route
              path="/admin/products"
              element={<AdminProductsListPage />}
            ></Route>
            <Route
              path="/admin/user/:id/edit"
              element={<UserEditPage />}
            ></Route>
            <Route
              path="/admin/category/new"
              element={<AddCategoryPage />}
            ></Route>
            <Route
              path="/admin/category/:id/edit"
              element={<EditCategoryPage />}
            ></Route>
            <Route path="/admin/user/new" element={<AddUserPage />}></Route>
            <Route
              path="/admin/product/new"
              element={<AddProductPage />}
            ></Route>
            <Route
              path="/admin/product/:id/edit"
              element={<EditProductPage />}
            ></Route>
            <Route
              path="/admin/orders"
              element={<AdminOrdersListPage />}
            ></Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
