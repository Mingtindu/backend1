import User from "../model/user.model.js";

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    await User.create({
      name,
      email,
      password,
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
