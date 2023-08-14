import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";

//@desc auth user
//@route POST api/users/login
//@access Public
const auth = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).exec();
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error("Incorrect Email or Password");
  }
});

//@desc logout user + clear cookie
//@route POST api/users/logout
//@access Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully !" });
});

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
    generateToken(res, createdUser._id);
    res.status(201).json(createdUser);
  } else {
    throw new Error("Invalid data for user");
  }
});

export { getUsers, getUserById, register, auth, logoutUser };
