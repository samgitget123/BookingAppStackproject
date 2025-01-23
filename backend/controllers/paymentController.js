import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import asyncHandler from "../middleware/asyncHandler.js";

dotenv.config();

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log(razorpayInstance, 'razorpayInstance');  // Should log the Razorpay instance with the correct keys

// Payment creation route
const createpayment = asyncHandler(async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const options = {
      amount: amount * 100, // Amount in paise (1 INR = 100 paise)
      currency: currency || "INR",
      receipt: receipt || "order_rcptid_11",
    };

    const order = await razorpayInstance.orders.create(options);
    console.log(order, 'paymentorder'); // Check the order object

    res.status(200).json(order); // Return the order details back to the client
  } catch (error) {
    console.error("Error creating Razorpay order:", error.message); // Log the error message
    res.status(500).json({ error: "Unable to create order." });
  }
});

// Payment verification route
const verifypayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  console.log(req.body, 'payment-verification-request');  // Log the request body to check if data is correct

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log(body, 'paymentbody');  // Log the body used for signature verification

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    res.status(200).json({ success: true, message: "Payment Verified!" });
  } else {
    res.status(400).json({ success: false, message: "Payment Verification Failed!" });
  }
});

export { createpayment, verifypayment };
