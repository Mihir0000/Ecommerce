import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
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

function App() {
    const { isAuthenticated, user } = useSelector((state) => state.user);

    React.useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });

        Store.dispatch(loadUser());
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
            <Footer />
        </Router>
    );
}

export default App;
