import asyncHandler from "../middleware/asyncHandler.js";
import Booking from "../models/Booking.js";
// const Ground = require('../models/Ground');
import Ground from "../models/Ground.js";
//const { generateBookingID } = require('../Utils');
import generateBookingID from "../Utils.js";

const bookingGround =  asyncHandler(async (req, res) => {
    const { ground_id, date, slots, comboPack } = req.body;

    const bookingDateformat = new Date(date);
    const bookingDate = bookingDateformat.toISOString().slice(0, 10); // '2025-01-29'

    const ground = await Ground.findOne({ ground_id });
    if (!ground) {
      return res.status(404).json({ message: "Ground not found" });
    }

    // Ensure the slots field is initialized if not present
    if (!ground.slots) {
      ground.slots = new Map();
    }

    // Access the slot for the selected date
    let dateSlotEntry = ground.slots.get(bookingDate);

    if (!dateSlotEntry) {
      // If no slots exist for this date, initialize with an empty array
      dateSlotEntry = { bookedSlots: [] };
      ground.slots.set(bookingDate, dateSlotEntry);
    }

    

    // Check if any of the selected slots are already booked
    const alreadyBooked = dateSlotEntry.bookedSlots.filter((slot) =>
      slots.includes(slot)
    );

    if (alreadyBooked.length > 0) {
      return res.status(409).json({
        message: "Some slots are already booked",
        conflicts: alreadyBooked,
      });
    }

    // Update the bookedSlots array with the selected slots
    dateSlotEntry.bookedSlots.push(...slots);

    // Ensure uniqueness of booked slots (optional, in case of any duplication)
    dateSlotEntry.bookedSlots = [...new Set(dateSlotEntry.bookedSlots)];
    if(dateSlotEntry.bookedSlots){
      console.log("Updated Booked Slots: ", dateSlotEntry.bookedSlots);
      ground.markModified('slots');
      // Save the updated ground document with booked slots
      await ground.save();
    }
  
    // Calculate total price based on slots and combo pack
    const pricePerSlot = 800 * 0.5; // Slot duration = 0.5 hours
    const totalPrice = slots.length * pricePerSlot + (comboPack ? 80 : 0);
   
    // Generate booking ID
    const booking_id = generateBookingID();

    // Create the booking entry
    const booking = new Booking({
      ground_id,
      date,
      slots,
      comboPack,
      book: { booking_id, price: totalPrice },
    });
    await booking.save();

    // Return the success response
    res.status(201).json({
      success: true,
      data: { ground_id, date, slots, comboPack, price: totalPrice, booking_id },
      message: "Slot booked successfully",
    });
});

export { bookingGround };



