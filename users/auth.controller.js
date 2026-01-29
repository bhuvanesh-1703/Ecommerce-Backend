const User = require("./users.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const { username, email, phonenumber, password } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, phonenumber, password: hashPassword });

        if (user.email === email) {
            return res.status(400).json()({ success: false, message: "user already exists" })
        }
        res.status(201).json({ success: true, message: "User created", user });
        // console.log(user);
    } catch (err) {
        res.status(400).json({ success: false, message: "Failed to create user", error: err.message });
    }
};

const login = async (req, res) => {

    console.log(req.body);

    const { email, password } = req.body;

    const users = await User.findOne({ email });

    console.log("Users===", users);


    if (!users) {
        res.status(400).json({ success: false, message: "User not found" })
    }

    const isMatch = bcrypt.compare(users.password, password);

    if (!isMatch) {
        res.status(400).json({ success: false, message: "Invalid Password" })
    }

    const token = jwt.sign(
        { user_id: users._id, username: users.username },
        process.env.SECRET_KEY,
        { expiresIn: '1d' }
    )

    console.log(token);
    res.status(200).json({ success: true, message: "Login Successfully", data: { token: token, userData: users } })

}

module.exports = { register, login };
