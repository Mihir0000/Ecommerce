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

function App() {
    React.useEffect(() => {
        WebFont.load({
            google: {
                families: ["Roboto", "Droid Sans", "Chilanka"],
            },
        });
    }, []);
    return (
        <Router>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/product/:id" component={ProductDetails} />
            <Route exact path="/products" component={Products} />
            <Route path="/products/:keyword" component={Products} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/login" component={LoginSignUp} />
            <Footer />
        </Router>
    );
}

export default App;
