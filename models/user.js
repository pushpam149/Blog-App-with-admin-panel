import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["Admin", "Manager", "Editor", "Viewer"],
      default: "Viewer",
    },

    team: {
      type: String,
      default: "General",
    },

    status: {
      type: String,
      enum: ["Active", "Pending", "Suspended"],
      default: "Active",
    },

    avatar: {
      type: String,
      default: "",
    },

    joined: {
      type: Date,
      default: Date.now,
    },

    bio: {
      type: String,
      default: "",
    },
    resetPasswordToken: {
  type: String,
  default: null,
  select: false,
},

resetPasswordExpires: {
  type: Date,
  default: null,
  select: false,
},
  },
  {
    timestamps: true,
  }
);

const User =
  mongoose.models.User ||
  mongoose.model("User", userSchema);

export default User;



