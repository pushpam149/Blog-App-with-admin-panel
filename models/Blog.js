import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["Published", "Draft"],
      default: "Published",
    },

    author: {
      type: String,
      default: "Pushpam",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Blog ||
  mongoose.model("Blog", BlogSchema);