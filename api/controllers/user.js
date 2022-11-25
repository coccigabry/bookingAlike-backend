import User from '../models/User.js';


export const updateUser = async (req, res, next) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    };

};


export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User deleted successfully");
    } catch (err) {
        next(err);
    };

};


export const getUser = async (req, res, next) => {

    try {
        const searchedUser = await User.findById(req.params.id);
        res.status(200).json(searchedUser);
    } catch (err) {
        next(err);
    };

};


export const getAllUsers = async (req, res, next) => {

    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    };

};