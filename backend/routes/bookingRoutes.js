import express from "express";
const router = express.Router();

import { bookingGround } from "../controllers/bookingController.js";

router.route('/book-slot').post(bookingGround);

export default router;
