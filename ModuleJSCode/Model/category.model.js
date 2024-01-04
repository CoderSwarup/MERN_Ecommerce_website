import mongoose from "mongoose";

const CategotySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowerCase: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const categoryModel = mongoose.model("Category", CategotySchema);
export default categoryModel;
