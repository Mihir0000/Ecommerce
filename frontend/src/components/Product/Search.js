import React, { Fragment, useState } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
// import { useNavigate } from "react-router-dom";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        // e.preventDefault();
        if (keyword.trim()) {
            history.push(`/products/${keyword}`);
        } else {
            history.push("/products");
        }
        console.log(history.pathname);
    };
    return (
        <Fragment>
            <MetaData title="Search A Product -- ECOMMERCE(Baidya Store)" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Products ..."
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;
