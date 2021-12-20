import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePic from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
    const options = {
        edit: false,
        color: "rgba(20,20,20,0.4)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 17 : 20,
        value: review.rating,
        isHalf: true,
    };
    return (
        <div className="reviewCard">
            <img src={profilePic} alt="User" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
    );
};

export default ReviewCard;
