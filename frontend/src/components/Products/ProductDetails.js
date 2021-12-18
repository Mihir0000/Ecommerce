import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import ReactsStars from "react-rating-stars-component";

const ProductDetails = ({ match }) => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.4)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 17 : 20,
        value: product.ratings,
        isHalf: true,
    };

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel className="CarouselImage">
                        {product.images &&
                            product.images.map((item, index) => (
                                <img
                                    src={item.url}
                                    key={item.url}
                                    alt={`${index} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product #{product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactsStars {...options} />
                        <span>({product.numOfReviews} Reviews)</span>
                    </div>
                    <div className="detailsBlock-3">
                        <h1>{`₹${product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button>-</button>
                                <input value="1" type="number" />
                                <button>+</button>
                            </div>
                            <button>Add to Cart</button>
                        </div>
                        <p>
                            Status :
                            <b
                                className={
                                    product.stock < 1
                                        ? "redColor"
                                        : "greenColor"
                                }
                            >
                                {product.stock < 1 ? "OutOfStock" : "InStock"}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description : <p>{product.description}</p>
                    </div>
                    <button className="submitReview">Submit Review</button>
                </div>
            </div>
        </Fragment>
    );
};

export default ProductDetails;
