import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";


export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);

    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }

};

export const updateRoom = async (req, res, next) => {

    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    };
    
};


export const deleteRoom = async (req, res, next) => {

    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);

        try {
            await Hotel-findByIdAndUpdate(hotelid, { $pull: { rooms: req.params.id }});
        } catch (err) {
            next(err);
        };

        res.status(200).json("Room deleted successfully");
    } catch (err) {
        next(err);
    };


    try {
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        } catch (err) {
            next(err);
        }
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err);
    }

    
};


export const getRoom = async (req, res, next) => {

    try {
        const searchedRoom = await Room.findById(req.params.id);
        res.status(200).json(searchedRoom);
    } catch (err) {
        next(err);
    };
    
};


export const getAllRooms = async (req, res, next) => {

    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    };
    
};