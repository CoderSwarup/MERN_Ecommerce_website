import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import MetaData from "../Layouts/MetaData/Metadata";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import ImagesIcon from "@mui/icons-material/Image";
import { CKEditor } from "ckeditor4-react";

import { fetchallCategory } from "../../Store/Actions/CategoryActions";
import { CreateNewProduct } from "../../Store/Actions/ProductActions";
import { toast } from "react-toastify";
import {
  ClearProductMsg,
  ClearProductsError,
} from "../../Store/Slice/ProductSlice";
import Loading from "../Layouts/Loader/Loading";
export default function NewProduct() {
  const dispatch = useDispatch();
  const Naviagte = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("<p>Product Discription</p>");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const { categories } = useSelector((state) => state.categories);
  const { loading, error, message } = useSelector((state) => state.products);

  const handleEditorChange = (event) => {
    const content = event.editor.getData();
    setDescription(content);
  };

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.info("Please Fill the Name");
    }
    if (category === "") {
      return toast.info("Please select Category ");
    }

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(CreateNewProduct(myForm));
  };

  const createProductImagesChange = (e) => {
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
  };

  const removeImagePreview = (index) => {
    const updatedImagesPreview = [...imagesPreview];
    updatedImagesPreview.splice(index, 1);
    setImagesPreview(updatedImagesPreview);

    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchallCategory());
    }
    if (error) {
      toast.error(error);
      dispatch(ClearProductsError());
    }
    if (message) {
      toast.success(message);
      dispatch(ClearProductMsg());
      Naviagte("/admin/products");
    }
  }, [dispatch, error, message]);

  return (
    <Fragment>
      <MetaData title="Create Product" />
      {loading ? (
        <Loading />
      ) : (
        <div className="dashboard">
          <SideBar />
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <h1>Create Product</h1>

              <div>
                <label htmlFor="">
                  {" "}
                  <SpellcheckIcon />
                  <Typography type="overline">Product Name</Typography>
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
                />
              </div>

              <div style={{ flexDirection: "column", width: "100%" }}>
                <label htmlFor="">
                  <DescriptionIcon />
                  <Typography type="overline">Product Description</Typography>
                </label>
                <CKEditor
                  initData={description}
                  onChange={handleEditorChange}
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
                />
              </div>

              <div id="createProductFormFile">
                <label htmlFor="">
                  <ImagesIcon></ImagesIcon>
                  <Typography type="overline">Product Images</Typography>
                </label>
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

              <Button
                id="createProductBtn"
                type="submit"
                disabled={loading ? true : false}
                onClick={createProductSubmitHandler}
              >
                Create
              </Button>
            </form>
          </div>
        </div>
      )}
    </Fragment>
  );
}
