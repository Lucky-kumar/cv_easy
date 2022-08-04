import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";

export const register = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong Email or Password !"));
    else {
        res.status(200).json({details : {id: user._id, email: user.email, password: user.password}});

        // res.send("Succesfully Logged in!");
    }
   
  } catch (err) {
    next(err);
  }
};


export const DeleteUser = async (req, res, next) => {
  try {
    // remove all users whose email start withb"legitUser"
    await User.deleteMany({ email: { $regex: /^legitUser/ } });
    // await User.deleteOne({ email: req.body.email });
   res.status(200).send("User has been deleted.");
   
  } catch (err) {
    next(err);
  }
}