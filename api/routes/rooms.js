import express from "express";
import { createRoom, updateRoom, deleteRoom, getRoom, getAllRooms } from "../controllers/room.js";
import { verifyAdmin } from "../utilities/verifyToken.js";


const router = express.Router();

// CREATE
router.post('/:hotelid', verifyAdmin, createRoom);

// UPDATE
router.put('/:id', verifyAdmin, updateRoom);

// DELETE
router.delete('/:id/:hotelid', verifyAdmin, deleteRoom);

// GET
router.get('/:id', getRoom);

//  GET ALL
router.get('/', getAllRooms);


export default router;