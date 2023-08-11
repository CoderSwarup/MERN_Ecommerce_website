import React, { useEffect, useState } from "react";
import Metadata from "../Layouts/MetaData/Metadata";
import Loading from "../Layouts/Loader/Loading";
import Siderbar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import "./Category.css";
import {
  CreateNewCategory,
  DeleteCategoryAction,
  UpdateCategoryAction,
  fetchallCategory,
} from "../../Store/Actions/CategoryActions";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Input,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
export default function CategoryPage() {
  const { categories, loading, error, message } = useSelector(
    (state) => state.category
  );
  const [categoryDisable, setcatDisable] = useState(false);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [title, settitle] = useState("");

  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const handleOpenUpdateDialog = (category) => {
    setSelectedCategory(category);
    setUpdatedCategoryName(category.name);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedCategory(null);
  };

  const handleClose = () => {
    setUpdatedCategoryName(initialValue);
    onClose();
  };

  const handleSubmit = (id, name) => {
    // e.pr

    // console.log(selectedCategory.name, updatedCategoryName);
    console.log(name, id);
    if (selectedCategory.name === updatedCategoryName) {
      return toast("Category Name is Not Updated Because Of same ");
    }
    if (name == "") {
      return toast.info("Name Not empty");
    }
    setcatDisable(true);
    dispatch(UpdateCategoryAction([id, name]));
    handleCloseUpdateDialog();
  };

  const handleOpenCreateDialog = () => {
    setOpenCreateDialog(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setNewCategoryName("");
  };

  const handleCreateCategory = () => {
    // Implement category creation logic here
    handleCloseCreateDialog();
  };

  const handleOpenDeleteDialog = (category) => {
    setSelectedCategory(category);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedCategory(null);
  };

  const dispatch = useDispatch();

  const SubmitCreateNewCat = () => {
    if (newCategoryName === "") {
      return toast.error("Please Fill Field");
    }
    dispatch(CreateNewCategory(newCategoryName));
    handleCloseCreateDialog();
  };

  const DeleteCategorySubmit = (id) => {
    console.log(id);
    dispatch(DeleteCategoryAction(id));
    handleCloseDeleteDialog();
  };

  useEffect(() => {
    dispatch(fetchallCategory());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }

    if (error) {
      toast.error(error);
    }
  }, [message, error]);
  return (
    <>
      <Metadata title="Sam-Ecomm Admin Category Page" />

      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <div className="CategoryContainer">
            <Siderbar></Siderbar>
            <Container maxWidth="md">
              <Typography
                variant="overline"
                style={{ fontSize: "20px", display: "block" }}
                gutterBottom
              >
                Category Management
              </Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenCreateDialog}
              >
                Create Category
              </Button>

              <List>
                {categories.map((category, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={category.name} />
                    <Button
                      onClick={() => handleOpenUpdateDialog(category)}
                      variant="outlined"
                      color="primary"
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleOpenDeleteDialog(category)}
                    >
                      Delete
                    </Button>
                  </ListItem>
                ))}
              </List>

              {/* Create Category Dialog */}
              <Dialog open={openCreateDialog} onClose={handleCreateCategory}>
                <DialogTitle>Create Category</DialogTitle>
                <DialogContent>
                  {/* <DialogContentText>
                    Enter the name of the new category:
                  </DialogContentText> */}
                  <FormControl fullWidth>
                    <InputLabel>Name</InputLabel>
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </FormControl>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseCreateDialog} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={SubmitCreateNewCat} color="primary">
                    Create
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Delete Category Dialog */}
              <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Category</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Are you sure you want to delete the category:{" "}
                    <b style={{ color: "red" }}>{selectedCategory?.name}</b> ?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteDialog} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => DeleteCategorySubmit(selectedCategory?._id)}
                    color="secondary"
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>

              {/* Update Category dilog  */}
              <Dialog open={openUpdateDialog} onClose={handleClose}>
                <DialogTitle>Update Category</DialogTitle>
                <DialogContent>
                  <DialogContentText style={{ marginBottom: "10px" }}>
                    Update the category name: {selectedCategory?.name}
                  </DialogContentText>
                  <FormControl fullWidth style={{ marginTop: "4px" }}>
                    <InputLabel>Name</InputLabel>
                    <Input
                      value={updatedCategoryName}
                      onChange={(e) => setUpdatedCategoryName(e.target.value)}
                    />
                  </FormControl>
                </DialogContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "16px",
                  }}
                >
                  <Button
                    onClick={handleCloseUpdateDialog}
                    color="primary"
                    style={{ marginRight: "8px" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() =>
                      handleSubmit(selectedCategory?._id, updatedCategoryName)
                    }
                    color="primary"
                    variant="contained"
                    disabled={categoryDisable}
                  >
                    Update
                  </Button>
                </div>
              </Dialog>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
