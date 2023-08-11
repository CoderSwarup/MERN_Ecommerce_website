const slugify = require("slugify");
const categoryModel = require("../Model/category.model");
//create controller for categories
exports.categorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({
        sucess: false,
        message: "Name is Required",
      });
    }

    const existing_Category = await categoryModel.findOne({ name });
    if (existing_Category) {
      return res
        .status(400)
        .send({ success: true, message: "Already  Category    exists" });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      sucess: true,
      message: "New Category is Created",
      category,
    });
  } catch (error) {
    // console.log(error.message);
    res.status(500).send({
      success: false,
      error,
      message: "Internal server Error",
    });
  }
};

//update conntroller
exports.updatecategorycontroller = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const updatecategory = await categoryModel.findByIdAndUpdate(
      id,
      {
        name,
        slug: slugify(name),
      },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Category is Updated",
      updatecategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While updating category",
    });
  }
};

//all category controller

exports.categoryallcontroller = async (req, res) => {
  try {
    const category = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "All Category Lists",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Category Not Found ",
    });
  }
};

exports.singlecategorycontroller = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    res.status(200).send({
      success: true,
      message: `Category ${slug} is Founded`,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Category Not Found",
    });
  }
};

//delete controller

exports.deleteCategorycontroller = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    await categoryModel.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: `Category is Deleted sucessfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Deleting Category",
    });
  }
};
