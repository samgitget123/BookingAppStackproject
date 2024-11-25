
// module.exports = router;
import express from 'express';
const router = express.Router();
// const Booking = require('../models/Booking');
import Booking from '../models/Booking.js';
// const Ground = require('../models/Ground');
import Ground from '../models/Ground.js';
//const { generateBookingID } = require('../Utils');
import  generateBookingID  from '../Utils.js';

router.post('/book-slot', async (req, res) => {
    console.log("Request body:", req.body);

    const { ground_id, date, slots, comboPack } = req.body;

    console.log("Extracted values - ground_id:", ground_id, "date:", date, "slots:", slots, "comboPack:", comboPack);
    
    try {
        // Convert the requested date to a JavaScript Date object
        const bookingDate = new Date(date);
        const currentDate = new Date();

        // If the booking date is in the past, deny the booking
        if (bookingDate < currentDate.setHours(0, 0, 0, 0)) {
            return res.status(400).json({ message: 'You cannot book a slot for a past date.' });
        }

        // Check if the selected slots are in the past on the same day
        const currentTime = new Date();
        const [currentHour, currentMinute] = [currentTime.getHours(), currentTime.getMinutes()];
        
        const isSlotInPast = slots.some(slot => {
            const [slotHour, slotHalf] = slot.split('.').map(Number);
            const slotMinute = slotHalf === 0 ? 0 : 30;
            
            // If booking for today, compare slot times with the current time
            if (bookingDate.toDateString() === currentTime.toDateString()) {
                if (slotHour < currentHour || (slotHour === currentHour && slotMinute <= currentMinute)) {
                    return true; // Slot is in the past
                }
            }
            return false;
        });

        if (isSlotInPast) {
            return res.status(400).json({ message: 'Cannot book past time slots.' });
        }

        // Calculate price for slots and combo pack
        const pricePerHour = 800;
        const slotDurationInHours = 0.5;
        const pricePerSlot = pricePerHour * slotDurationInHours;
        const totalPriceForSlots = slots.length * pricePerSlot;
        
        // Combo pack price
        const comboPackPrice = comboPack ? 80 : 0;
        
        // Total price
        const totalPrice = totalPriceForSlots + comboPackPrice;

        // Generate unique booking ID
        const booking_id = generateBookingID();

        // Create a new booking
        const newBooking = new Booking({
            ground_id,
            date,
            slots,
            comboPack,
            book: {
                booking_id,
                price: totalPrice,
            },
        });

        // Save the booking
        await newBooking.save();

        // Find the ground and update booked slots
        const ground = await Ground.findOne({ ground_id });
        if (!ground) {
            return res.status(404).json({ message: 'Ground not found' });
        }

        const alreadyBookedSlots = ground.slots.booked.filter(slot => slots.includes(slot));
        if (alreadyBookedSlots.length > 0) {
            return res.status(400).json({
                message: 'Requested slots have already been booked',
                bookedSlots: alreadyBookedSlots,
            });
        }

        const updatedBookedSlots = [...new Set([...ground.slots.booked, ...slots])];
        console.log('Updated booked slots:', updatedBookedSlots);

        ground.slots.booked = updatedBookedSlots;
        await ground.save();

        // Respond with the booking details
        res.json({
            ground_id,
            date,
            slots,
            comboPack,
            book: {
                booking_id,
                price: totalPrice,
            },
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default  router;
