import mongoose from "mongoose";
import bcryptjs from "bcryptjs"

const userSchma = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchma.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next()
    try {
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(user.password, salt);
      next();
    } catch (error) {
      throw new Error(`Fallo el error: ${error.message}`);
    }
});

userSchma.methods.comparePassword = async function (canPassword){
  return await bcryptjs.compare(canPassword, this.password);
}

export const User = mongoose.model("User", userSchma);
