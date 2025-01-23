import express from "express";
import { createpayment, verifypayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post('/create-order', createpayment);
router.post('/verify-payment', verifypayment);

export default router;
