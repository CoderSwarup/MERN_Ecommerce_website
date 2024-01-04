import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  NewReview,
  getProductDetails,
} from "../../Store/Actions/ProductActions";
import Loading from "../Layouts/Loader/Loading";
import { toast } from "react-toastify";
import Metadata from "../Layouts/MetaData/Metadata";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard";
import {
  clearError,
  clearReviewError,
  clearReviewMsg,
} from "../../Store/Slice/ProductSlice";
import { AddtoCart } from "../../Store/Slice/CartSlice";
import Typography from "@mui/material/Typography";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import Rating from "@mui/material/Rating";
export default function ProductDetails() {
  const params = useParams();
  const dispatch = useDispatch();

  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { cartItems } = useSelector((state) => {
    return state.cart;
  });

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

  // Add To cart Options
  const AddtoCartSubmit = (e) => {
    let newProduct = cartItems.filter((cartI) => {
      return cartI.product === params.id;
    });
    if (newProduct[0]) {
      const netqantity = newProduct[0].quantity + quantity;
      if (netqantity > newProduct[0].stock) {
        console.log(newProduct[0].quantity);
        toast.error("Product Stock Is Not Left Already Product Added In Card");
        return false;
      }
    }
    let cartitem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0].url,
      stock: product?.stock,
      quantity,
    };
    dispatch(AddtoCart(cartitem));
    setQuantity(1);
    toast.success("Product Added");
  };

  //Review Submission
  const { Rerror, Rmessage } = useSelector((state) => {
    return state.review;
  });
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", params.id);

    dispatch(NewReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (Rerror) {
      toast.error(Rerror);
      dispatch(clearReviewError());
    }
    if (Rmessage) {
      toast.success(Rmessage);
      dispatch(clearReviewMsg());
    }
  }, [Rerror, Rmessage]);

  const metaTitle = product?.name || "Product Details - Sam Ecommerce";
  const metaDescription = "Discover the details of this amazing product.";
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
                  <button
                    onClick={AddtoCartSubmit}
                    disabled={product.stock < 1 ? true : false}
                  >
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

              <div
                className="detailsBlock-4"
                dangerouslySetInnerHTML={{ __html: product.description }}
              >
                {/* Description : <p>{product.description}</p> */}
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          {/*  */}
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>
              <Typography variant="overline">Submit Review</Typography>
            </DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(+e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

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
