import ReactStars from "react-rating-stars-component";
import React from "react";
import profilePng from "../../assets/react.svg";

const ReviewCard = ({ review }) => {
  const Ratingoptions = {
    count: 5,
    edit: false,
    value: review.rating,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <ReactStars {...Ratingoptions} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
