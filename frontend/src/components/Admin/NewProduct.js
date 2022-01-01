import React, { Fragment, useEffect, useState } from "react";
import "./NewProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMonyeIcon from "@material-ui/icons/AttachMoney";
import Sidebar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { clearErrors, createProduct } from "../../actions/productAction";

const NewProduct = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, success } = useSelector(
        (state) => state.newProduct
    );

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footware",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Product Created Successfully");
            history.push("/admin/dashboard");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [alert, dispatch, error, history, success]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("stock", stock);
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
    };

    const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        encType="multipart/form-data"
                        className="createProductForm"
                        onSubmit={createProductSubmitHandler}
                    >
                        <h1>Create Product</h1>
                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMonyeIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div>
                            <DescriptionIcon />
                            <textarea
                                placeholder="Product Description"
                                cols="30"
                                rows="1"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div>
                            <AccountTreeIcon />
                            <select
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Choose Category</option>
                                {categories &&
                                    categories.map((cate) => (
                                        <option key={cate} value={cate}>
                                            {cate}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                            />
                        </div>
                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={createProductImagesChange}
                                multiple
                            />
                        </div>
                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img
                                    src={image}
                                    key={index}
                                    alt="Product preview"
                                />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Create
                        </Button>
                    </form>
                </div>
            </div>
        </Fragment>
    );
};

export default NewProduct;
