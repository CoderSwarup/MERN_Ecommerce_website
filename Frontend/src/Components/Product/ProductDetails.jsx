import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDetails } from "../../Store/Actions/ProductActions";
import Loading from "../Layouts/Loader/Loading";
import { toast } from "react-toastify";
import Metadata from "../Layouts/MetaData/Metadata";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import { clearError } from "../../Store/Slice/ProductSlice";

export default function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );

  const Ratingoptions = {
    count: 5,
    edit: false,
    value: product.ratings,
    isHalf: true,
    size: window.innerWidth < 600 ? 20 : 25,
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  if (error) {
    toast.error(error);
    dispatch(clearError());
  }

  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, []);

  const metaTitle = product?.name || "Product Details - Sam Ecommerce";
  const metaDescription =
    product?.description || "Discover the details of this amazing product.";
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Metadata title={metaTitle} description={metaDescription} />

          <div className="ProductDetails">
            {/* Prduct img container  */}

            <div>
              <Carousel className="Carousel">
                {product.images &&
                  product.images.map((item, i) => (
                    <img
                      className="carouselImage"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product?.name}</h2>
                <p>Product is : {product?._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...Ratingoptions}></ReactStars>{" "}
                <span className="detailsBlock-2-span">
                  {product?.numofreviews} Reviews
                </span>
              </div>

              <div className="detailsBlock-3">
                <h1>₹{product?.price}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button disabled={product.stock < 1 ? true : false}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product?.reviews && product?.reviews[0] ? (
            <div className="reviews">
              {product.reviews.map((review) => {
                return (
                  <ReviewCard key={review._id} review={review}></ReviewCard>
                );
              })}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
}
