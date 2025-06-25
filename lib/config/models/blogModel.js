import mongoose from "mongoose";
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  authorImg: {
    type: String,
    required: true,
  },
  upload_date: {
    type: Date,
    default: Date.now(),
  },
});
export const blogModel =
  mongoose.models.Blogs || mongoose.model("Blogs", blogSchema);
