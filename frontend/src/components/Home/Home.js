import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCT BELLOW</h1>
                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>
        </Fragment>
    );
};

export default Home;
