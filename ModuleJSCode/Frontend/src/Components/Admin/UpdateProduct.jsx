import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CKEditor } from "ckeditor4-react";
import { Button, ImageList, Typography } from "@mui/material";
import MetaData from "../Layouts/MetaData/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchallCategory } from "../../Store/Actions/CategoryActions";
import {
  UpdateProdcutAction,
  getProductDetails,
} from "../../Store/Actions/ProductActions";
import { clearError, clearMessage } from "../../Store/Slice/ProductSlice";
import Loading from "../Layouts/Loader/Loading";
import "./UpdateProduct.css";
import ImagesIcon from "@mui/icons-material/Image";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const params = useParams();

  const { categories } = useSelector((state) => state.categories);

  const { error, product, loading, message } = useSelector(
    (state) => state.productDetails
  );

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const productId = params.id;

  function convertHtmlToPlainText(html) {
    const parser = new DOMParser();

    // Parse the HTML content into a DOM document
    const doc = parser.parseFromString(html, "text/html");

    // Extract the plain text content from the parsed document
    const plainText = doc.body.textContent || "";
    setDescription(plainText);
  }

  useEffect(() => {
    if (product && product?._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product?.name);
      // setDescription(product?.description);
      convertHtmlToPlainText(product.description);
      setPrice(product?.price);
      setCategory(product?.category?._id);
      setStock(product?.stock);
      setOldImages(product?.images);
    }
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (message) {
      toast.success(message);
      Navigate("/admin/products");
      dispatch(clearMessage());
    }
    if (categories.length === 0) {
      dispatch(fetchallCategory());
    }
  }, [dispatch, toast, productId, product, message]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(UpdateProdcutAction([productId, myForm]));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

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

    console.log(images);
  };

  const removeImagePreview = (index) => {
    const updatedImagesPreview = [...imagesPreview];
    updatedImagesPreview.splice(index, 1);
    setImagesPreview(updatedImagesPreview);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <Fragment>
      <MetaData title="Create Product" />
      {loading ? (
        <Loading></Loading>
      ) : (
        <div className="Updatedashboard">
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={updateProductSubmitHandler}
            >
              <h1>Update Product</h1>

              <div>
                <label htmlFor="">
                  {" "}
                  <SpellcheckIcon />
                  <Typography type="overline">Product Price</Typography>
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="">
                  {" "}
                  <AttachMoneyIcon />{" "}
                  <Typography type="overline">Product Price</Typography>
                </label>
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
              </div>

              <div>
                <label htmlFor="">
                  <DescriptionIcon />
                  <Typography type="overline">Product Description</Typography>
                </label>
                {/* <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea> */}
                <CKEditor
                  initData={product.description}
                  onChange={(event) => {
                    setDescription(event.editor.getData());
                  }}
                />
              </div>

              <div>
                <label htmlFor="">
                  {" "}
                  <AccountTreeIcon />
                  <Typography type="overline">Product Category</Typography>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {categories?.map((cate) => (
                    <option key={cate?._id} value={cate?._id}>
                      {cate?.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="">
                  <StorageIcon />
                  <Typography type="overline">Product Stocks</Typography>
                </label>
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                  value={Stock}
                />
              </div>

              <div>
                <label htmlFor="">
                  <ImagesIcon></ImagesIcon>
                  <Typography type="overline">Product Images</Typography>
                </label>
                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  />
                </div>

                <div id="createProductFormImage">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                      />
                    ))}
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image} alt="Product Preview" />
                      <button
                        className="remove-image-button"
                        onClick={() => removeImagePreview(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
              >
                Update
              </Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default UpdateProduct;
