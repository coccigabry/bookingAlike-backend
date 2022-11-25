import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createError } from '../utilities/error.js';

import User from "../models/User.js";


export const registerCtrl = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash
        });
        await newUser.save();
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    };
};


export const loginCtrl = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) 
            return next(createError(404, "User doesn't exist"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if(!isPasswordCorrect) 
            return next(createError(400, "Wrong password"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET
        );

        res
            .cookie("access_token", token, { httpOnly: true })
            .status(200)
            .send(`Welcome back ${user.username}`);
    } catch (err) {
        next(err);
    };
};