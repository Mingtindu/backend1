import User from "../model/user.model.js";
import bcrypt from "bcrypt";
const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User created",
    });
  } catch (error) {
    
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
export { createUser };
