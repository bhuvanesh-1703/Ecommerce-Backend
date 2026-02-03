const User = require("./users.model");
const bcrypt = require('bcryptjs');

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (err) {
        res.status(200).json({ success: false, message: "Failed to fetch users" });
    }
};

const createUser = async (req, res) => {

    const { username, email, password, phonenumber, role, status } = req.body;

    try {

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashPassword, phonenumber, role, status });
        res.json({ success: true, message: "User created", user });
        // console.log(user)
    } catch (err) {
        res.status(200).json({ success: false, message: "Failed to create user", error: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User updated", data: updatedUser });
    } catch (err) {
        res.status(200).json({ success: false, message: "Update failed", error: err.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        console.log("delete");

        if (!deleted) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.json({ success: true, message: "User deleted" });
    } catch (err) {
        res.status(200).json({ success: false, message: "Failed to delete user", error: err.message });
    }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
