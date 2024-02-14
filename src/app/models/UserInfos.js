import mongoose from "mongoose";

const UserInfos = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    streetAddress: { type: String },
    postalCode: { type: String },
    city: { type: String },
    country: { type: String },
    phone: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models?.UserInfos ||
  mongoose.model("UserInfos", UserInfos);
