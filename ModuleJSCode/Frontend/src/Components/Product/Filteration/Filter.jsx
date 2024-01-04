import React, { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { fetchallCategory } from "../../../Store/Actions/CategoryActions";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";

export default function Filter({
  value,
  setValue,
  isOpen,
  setisopen,
  selectedCategories,
  setSelectedCategories,
  rating,
  setrating,
}) {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, categories } = useSelector((state) => {
    return state.categories;
  });

  //Price Filteration
  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    Navigate("/products");
  };

  const valuetext = (value) => {
    return `${value}`;
  };

  const ChangeOpen = () => {
    setisopen(!isOpen);
  };

  const ResetFilter = () => {
    setValue([0, 40000]);
    setSelectedCategories([]);
    setrating(0);
  };

  useEffect(() => {
    dispatch(fetchallCategory());
  }, []);

  return (
    <>
      <div className="Filter-container-hading" onClick={ChangeOpen}>
        <h1>Filteration</h1>
        {isOpen ? (
          <BsFillArrowUpCircleFill></BsFillArrowUpCircleFill>
        ) : (
          <BsFillArrowDownCircleFill />
        )}
      </div>

      <div className={`Filter-container ${isOpen ? "FOpen" : "FClose"}`}>
        {/* Price Filteration  */}
        <p className="Filter-hading">Price Filteration</p>
        <div
          style={{
            width: "200px",
          }}
        >
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            min={0}
            max={40000}
          />
        </div>

        {/* Category Filteration */}
        <p className="Filter-hading">Category Filter</p>
        {categories?.category?.map((cat, i) => {
          return (
            <label className="category-label" key={cat._id}>
              <input
                type="checkbox"
                value={cat._id}
                checked={selectedCategories.includes(cat._id)}
                onChange={(e) => {
                  const categoryId = e.target.value;
                  setSelectedCategories((prevSelectedCategories) => {
                    if (prevSelectedCategories.includes(categoryId)) {
                      return prevSelectedCategories.filter(
                        (id) => id !== categoryId
                      );
                    } else {
                      return [...prevSelectedCategories, categoryId];
                    }
                  });
                }}
                className="custom-checkbox"
              />
              {cat.name}
            </label>
          );
        })}

        {/* Rating Filteration  */}
        {/* <p className="Filter-hading"></p> */}
        <fieldset>
          <legend className="Filter-hading l">Ratings Above </legend>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                if (newValue == null) {
                  setrating(0);
                } else {
                  setrating(newValue);
                }
              }}
            />
          </Box>
        </fieldset>

        <Button
          style={{ margin: "8px 0" }}
          className="resetbtn"
          color="secondary"
          disabled={false}
          size="medium"
          variant="outlined"
          onClick={ResetFilter}
        >
          Reset
        </Button>
      </div>
    </>
  );
}
