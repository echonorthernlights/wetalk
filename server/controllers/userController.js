import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";

//@desc get users
//@route GET api/users/
//@access Private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").lean();
  if (users) {
    res.status(200).json(users);
  } else {
    throw new Error("No users found !!");
  }
});

//@desc get user by Id
//@route GET api/users/:id
//@access Private
const getUserById = asyncHandler(async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findById(userId).select("-password").lean();
  if (user) {
    res.status(200).json(user);
  } else {
    throw new Error("No user found with given ID !!");
  }
});

//@desc register user
//@route POST api/users/register
//@access Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = {
    firstName,
    lastName,
    email,
    password,
  };
  const createdUser = await User.create(newUser);
  if (createdUser) {
    createdUser.password = null;
    res.status(201).json(createdUser);
  } else {
    throw new Error("Invalid data for user");
  }
});

export { getUsers, getUserById, register };
