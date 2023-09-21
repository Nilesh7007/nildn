const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../model/userModel');

// Registration endpoint
userRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email }); // Use findOne with an object to match properties
        if (user) {
            res.status(400).json({ msg: "Email already exists" });
        } else {
            bcrypt.hash(password, 5, async (err, hash) => {
                const newUser = new UserModel({ name, email, password: hash });
                await newUser.save();
                res.status(201).json({ msg: "New user has been registered" });
            });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// Login endpoint
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user._id }, 'masai', { expiresIn: '1h' });
                    res.status(200).json({"msg":"Login sucesseful","token":token})
                } else {
                    res.status(400).json({ msg: "Password Mismatch !!" });
                }
            });
        } else {
            res.status(400).json({ msg: "Please create an account first !!" });
        }
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

module.exports = userRouter;
