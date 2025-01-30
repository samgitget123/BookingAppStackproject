import express from "express";
const router = express.Router();

import { bookingGround , getBookings} from "../controllers/bookingController.js";

router.route('/book-slot').post(bookingGround);
router.route('/getbookingdetails').get(getBookings);

export default router;
