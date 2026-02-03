
const User = require("./users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* ================= REGISTER ================= */
const register = async (req, res) => {
  const { username, email, phonenumber, password } = req.body;

  try {
    // 1️⃣ Check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // 2️⃣ Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Create user
    const user = await User.create({
      username,
      email,
      phonenumber,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to create user",
      error: err.message,
    });
  }
};

/* ================= LOGIN ================= */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await User.findOne({ email });
    if (!users) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, users.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign(
      { user_id: users._id, username: users.username },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      success: true,
      message: "Login successfully",
      data: { token, userData: users },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

module.exports = { register, login };
