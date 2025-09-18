import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendMail } from "../lib/email/sendMail.js";
import { forgotPasswordTemplate } from "../lib/email/templates/forgotPasswordTemplate.js";
import { triggerAsyncId } from "async_hooks";
//steps
// validate user input required fields
// check if user already exist or not
// hash the password
// save
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(name, email, password);
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const login = async (req, res) => {
  // email password both required validate
  // user exists or not check
  // password compare
  // token generate
  // send response
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.status(400).json({
      message: "User does not exist with this email",
    });
  }

  const isMatch = await bcrypt.compare(password, existUser.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: existUser._id, email: existUser.email },
    "jwtsecret",
    {
      expiresIn: "1d",
    }
  );

  res.status(200).json({
    message: "Login success",
    user: existUser,
    token: token,
  });
};

const getMyProfile = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    const isOldPasswordCorrect = await bcrypt.compare(
      oldPassword,
      user.password
    );
    if (!isOldPasswordCorrect) {
      return res.status(400).json({
        message: "Incorrect old password",
      });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({
      message: "Password changed",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const forgotPassword = async (req, res) => {

  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(404).json({ message: "User does not exist" });
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  await user.save();

  await sendMail({
    to: user.email,
    subject: "Password Reset Request",
    text: "Password reset request",
    html: forgotPasswordTemplate(user.name, token),
  });

  res.status(200).json({
    message: "Password reset token sent to email",
  });
};

const verifyResetToken = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token);
    const user = await User.findOne({
      resetPasswordToken: token,
      // resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    res.status(200).json({
      message: "Token is valid",
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// {
//   email, password;
// }

// /reset-password

export {
  createUser,
  login,
  getMyProfile,
  changePassword,
  forgotPassword,
  verifyResetToken,
};
