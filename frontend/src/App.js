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
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route exact path="/search" component={Search} />
            <ProtectedRoute exact path="/account" component={Profile} />
            <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
            <ProtectedRoute
                exact
                path="/password/update"
                component={UpdatePassword}
            />
            <Route exact path="/password/forgot" component={ForgotPassword} />
            <Route
                exact
                path="/password/reset/:token"
                component={ResetPassword}
            />
            <Route exact path="/login" component={LoginSignUp} />
            <Route exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/shipping" component={Shipping} />
            {stripeApiKey && (
                <Elements stripe={loadStripe(stripeApiKey)}>
                    <ProtectedRoute
                        exact
                        path="/process/payment"
                        component={Payment}
                    />
                </Elements>
            )}
            <ProtectedRoute exact path="/success" component={OrderSuccess} />
            <ProtectedRoute exact path="/orders" component={MyOrders} />
            <Switch>
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
            </Switch>
            <Footer />
        </Router>
    );
}

export default App;
