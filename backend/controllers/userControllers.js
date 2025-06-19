import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../modals/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/createToken.js";
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide user details");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({ name, email, password: hashedPassword });

  await newUser.save();

  generateToken(res, newUser._id);

  res.status(201).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    isAdmin: newUser.isAdmin,
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Please provide email and password");
  }

  const userExisting = await User.findOne({ email });

  if (!userExisting) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, userExisting.password);

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  generateToken(res, userExisting._id);

  res.status(200).json({
    _id: userExisting._id,
    name: userExisting.name,
    email: userExisting.email,
    isAdmin: userExisting.isAdmin,
  });
});

const loggedOutUser = asyncHandler(async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(200).json(users);
});

const getCurrentUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json(user);
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error("User not found!");
  }

  const { name, email, password } = req.body;

  user.name = name?.trim() || user.name;
  user.email = email?.trim() || user.email;

  if (password?.trim) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
  }

  const updatedUser = await user.save();

  res.status(200).json({
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    isAdmin: updatedUser.isAdmin,
  });
});

const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found!");
  }
  if (user.isAdmin) {
    res.status(400);
    throw new Error("Can not delete Admin user");
  }
  await user.deleteOne();
  res.json({ message: "User Removed from application" });
});

const getUserById = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id).select("-password")
  if(!user){
    res.status(400)
    throw new Error("User not found")
  }

  res.status(200).json(user);
})

const updateUserById = asyncHandler(async(req, res) => {
  const user = await User.findById(req.params.id)

  if(!user){
    res.status(400)
    throw new Error("User not found!")
  }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (typeof req.body.isAdmin === "boolean"){
        user.isAdmin = req.body.isAdmin
    }
    
  const updatedUser = await user.save()

  res.status(200).json({
    _id : updatedUser._id,
    name :updatedUser.name,
    email : updatedUser.email,
    isAdmin : updatedUser.isAdmin
  })

})
export {
  createUser,
  loginUser,
  loggedOutUser,
  getAllUser,
  getCurrentUserProfile,
  updateUserProfile,
  deleteUserById,
  getUserById,
  updateUserById
};
