import "./App.css";
import Header from "./components/layout/Header/Header.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home";

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
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
