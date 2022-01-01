import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Products from "./components/Product/Products";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import Store from "./Store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./components/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/User/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard";
import ProductList from "./components/Admin/ProductList";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UsersList from "./components/Admin/UsersList";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import About from "./components/layout/About/About";
import Contact from "./components/layout/Contact/Contact";
import NotFound from "./components/layout/NotFound/NotFound";

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [stripeApiKey, setStripeApiKey] = useState("");

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");

        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        Store.dispatch(loadUser());
        getStripeApiKey();
    }, []);
    return (
        <Router>
            <Header />
            {isAuthenticated && <UserOptions user={user} />}
            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute
                        exact
                        path="/process/payment"
                        component={Payment}
                    />
                </Elements>
            )}
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/product/:id" component={ProductDetails} />
                <Route exact path="/products" component={Products} />
                <Route path="/products/:keyword" component={Products} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <ProtectedRoute exact path="/account" component={Profile} />
                <ProtectedRoute
                    exact
                    path="/me/update"
                    component={UpdateProfile}
                />
                <ProtectedRoute
                    exact
                    path="/password/update"
                    component={UpdatePassword}
                />
                <Route
                    exact
                    path="/password/forgot"
                    component={ForgotPassword}
                />
                <Route
                    exact
                    path="/password/reset/:token"
                    component={ResetPassword}
                />
                <Route exact path="/login" component={LoginSignUp} />
                <Route exact path="/cart" component={Cart} />
                <ProtectedRoute exact path="/shipping" component={Shipping} />
                <ProtectedRoute
                    exact
                    path="/success"
                    component={OrderSuccess}
                />
                <ProtectedRoute exact path="/orders" component={MyOrders} />
                <ProtectedRoute
                    exact
                    path="/order/confirm"
                    component={ConfirmOrder}
                />
                <ProtectedRoute
                    exact
                    path="/order/:id"
                    component={OrderDetails}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/dashboard"
                    component={Dashboard}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/products"
                    component={ProductList}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/product"
                    component={NewProduct}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/product/:id"
                    component={UpdateProduct}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/orders"
                    component={OrderList}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/order/:id"
                    component={ProcessOrder}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/users"
                    component={UsersList}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/user/:id"
                    component={UpdateUser}
                />
                <ProtectedRoute
                    isAdmin={true}
                    exact
                    path="/admin/reviews"
                    component={ProductReviews}
                />
                <Route
                    component={
                        window.location.pathname === "/process/payment"
                            ? null
                            : NotFound
                    }
                />
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
