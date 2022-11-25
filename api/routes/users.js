import express from "express";
import { updateUser, deleteUser, getUser, getAllUsers } from "../controllers/user.js";
import { verifyUser, verifyAdmin } from "../utilities/verifyToken.js";


const router = express.Router();

//UPDATE
router.put('/:id', verifyUser, updateUser);

//DELETE
router.delete('/:id', verifyUser, deleteUser);

//GET
router.get('/:id', verifyUser, getUser);

//GET ALL
router.get('/', verifyAdmin, getAllUsers);


export default router;