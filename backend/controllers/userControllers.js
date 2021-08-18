const User = require('./../models/userModel');
const asyncHandler = require('express-async-handler');
const generate_token = require('../utils/generateToken');

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    console.log(req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("user Already Exist")
    }

    const user = await User.create({
        name,
        email,
        password,
        pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generate_token(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Error Occur!')
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            pic: user.pic,
            token: generate_token(user._id)
        })
    } else {
        res.status(400);
        throw new Error("Invalid Email or password!")
    }

});

module.exports = { registerUser, authUser };