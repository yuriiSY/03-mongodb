import { Schema, model } from "mongoose";
import { handleDBError, setUpdateSettings } from "./hooks.js";
const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleDBError);

userSchema.pre("findOneAndUpdate", setUpdateSettings);

userSchema.post("findOneAndUpdate", handleDBError);

const User = model("user", userSchema);

export default User;
