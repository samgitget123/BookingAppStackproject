import express from 'express';
const router = express.Router();
// const Ground = require('../models/Ground');
import Ground from '../models/Ground.js';
//const Booking = require('../models/Booking');
import Booking from '../models/Booking.js';
//create new grounds 
// Route to create a new ground
router.post('/createGround', async (req, res) => {
    const { name, location, photo, description } = req.body;

    // Validate required fields
    if (!name || !location || !description) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create a new ground document
        const newGround = new Ground({
            name,
            location,
            photo,
            description
        });

        // Save the new ground document to the database
        await newGround.save();

        // Respond with the newly created ground data
        res.status(201).json({
            message: 'Ground created successfully',
            ground: {
                ground_id: newGround.ground_id,
                name: newGround.name,
                location: newGround.location,
                photo: newGround.photo,
                description: newGround.description,
            }
        });
    } catch (error) {
        console.error('Error creating ground:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Ground lists based on location
router.get('/', async (req, res) => {
    try {
        const { location } = req.query; // Get the location from query parameters
        console.log('Requested location:', location);
        const grounds = await Ground.find({ location }); // Find grounds by location
        console.log('Available grounds:', grounds);
        const response = grounds.map(ground => ({
            ground_id: ground.ground_id,
            data: {
                name: ground.name,
                location: ground.location,
                photo: ground.photo,
                description: ground.description,
            },
        }));

        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Get Ground Details By Ground Id
router.get('/:ground_id', async (req, res) => {
    try {
        const { ground_id } = req.params;
        const { date } = req.query;  // Use query parameter for date

        // Find the ground by ground ID
        const ground = await Ground.findOne({ ground_id });
        console.log('groundData :', ground);
        if (!ground) {
            return res.status(404).json({ message: 'Ground not found' });
        }

        // Set date to today if not provided
        const selectedDate = date ? date : new Date().toISOString().split('T')[0];
        console.log('Ground ID:', ground_id);
        console.log('Selected Date:', selectedDate);
        // Find the booking for the selected ground and date
        const bookings = await Booking.find({ ground_id, date: selectedDate });
        // Aggregate booked slots from all bookings
        const bookedSlots = bookings.reduce((acc, booking) => {
            return acc.concat(booking.slots);
        }, []);
        console.log('bookings------ :', bookings);
        //console.log(booking.slots , 'bookedslots')
        // const bookedSlots = booking ? booking.slots : [];
        console.log('bookedslots :', bookedSlots);
        // Format the response according to the specified structure
        const response = {
            name: ground.name,
            location: ground.location,
            data: {
                image: ground.photo,
                desc: ground.description,
            },
            slots: {
                booked: bookedSlots,  // Based on booking data
            },
        };

        // Send response only once
        res.json(response);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

export default router;
