import User from "../models/user.model.js";

import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";


export const login = async (req, res, next) => {

    try {

        // Get data from request body
        const { email, username, password } = req.body;


        // Find user in MongoDB
        const user = await User.findOne({
            email: email.toLowerCase(),
            username: username.toLowerCase()
        }).select("+password");


        // Check user exists
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email, username or password"
            });
        }


        // Compare password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );


        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid email, username or password"
            });
        }


        // Generate JWT Token
        const token = jwt.sign(
            {
                id: user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        // Send response
        return res.status(200).json({
            success: true,
            message: "Login successful",

            token,

            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                username: user.username,
                gender: user.gender,
                mobile: user.mobile,
                address: user.address
            }
        });


    } catch (error) {

        next(error);

    }

};