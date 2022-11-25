import express from "express";
import { registerCtrl, loginCtrl } from "../controllers/auth.js";

const router = express.Router();

router.get('/', (req, res) => {
    res.send("Auth Endpoint");
});

router.post('/register', registerCtrl);
router.post('/login', loginCtrl);


export default router;