import asynHandler from '../middleware/asyncHandler.js';
import Ground from '../models/Ground.js';
import Booking from '../models/Booking.js';


// const createGround = asynHandler(async(req, res) => {
//     const { name, location , description } = req.body;
//     const photo = req.file ? req.file.filename : req.file.path;
//     console.log(photo, 'photo')
//     // Validate required fields
//     if (!name || !location || !description) {
//         res.status(404);
//         throw new Error('All Fields are required!!!------fkfkfk------------')
//     }
//     try {
//         // Create a new ground document
//         const newGround = new Ground({
//             name,
//             location,
//             photo,
//             description
//         });

//         // Save the new ground document to the database
//         await newGround.save();

//         // Respond with the newly created ground data
//         res.status(201).json({
//             message: 'Ground created successfully',
//             ground: {
//                 ground_id: newGround.ground_id,
//                 name: newGround.name,
//                 location: newGround.location,
//                 photo: newGround.photo,
//                 description: newGround.description,
//             }
//         });
//     } catch (error) {
//         res.status(404);
//         throw new Error('SERVER ERROR')
//     }
// });
// const createGround = asynHandler(async (req, res) => {
//     const { name, location, description } = req.body;

//     // Check if a file was uploaded
//     const photo = req.file ? req.file.filename : null;

//     // Validate required fields
//     if (!name || !location || !description || !photo) {
//         res.status(400);
//         throw new Error('All fields, including photo, are required!');
//     }

//     try {
//         // Create a new ground document
//         const newGround = new Ground({
//             name,
//             location,
//             photo,
//             description,
//         });

//         // Save the new ground document to the database
//         await newGround.save();

//         // Respond with the newly created ground data
//         res.status(201).json({
//             message: 'Ground created successfully',
//             ground: {
//                 ground_id: newGround.ground_id,
//                 name: newGround.name,
//                 location: newGround.location,
//                 photo: newGround.photo,
//                 description: newGround.description,
//             },
//         });
//     } catch (error) {
//         console.error('Error creating ground:', error.message);
//         res.status(500);
//         throw new Error('Server error while creating ground');
//     }
// });
// const createGround = asynHandler(async(req, res) => {
//     const { name, location , description } = req.body;
//     const photo = req.file ? req.file.filename : null;
//     // Validate required fields
//     if (!name || !location || !description) {
//         res.status(404);
//         throw new Error('All Fields are required!!!------fkfkfk------------')
//     }
//     try {
//         // Create a new ground document
//         const newGround = new Ground({
//             name,
//             location,
//             photo,
//             description
//         });

//         // Save the new ground document to the database
//         await newGround.save();

//         // Respond with the newly created ground data
//         res.status(201).json({
//             message: 'Ground created successfully',
//             ground: {
//                 ground_id: newGround.ground_id,
//                 name: newGround.name,
//                 location: newGround.location,
//                 photo: newGround.photo,
//                 description: newGround.description,
//             }
//         });
//     } catch (error) {
//         res.status(404);
//         throw new Error('SERVER ERROR')
//     }
// });
const createGround = asynHandler(async (req, res) => {
    const { name, location, description } = req.body;
    // Log request body and file for debugging
  console.log('Request Body:', req.body);
  console.log('Uploaded File:', req.file);

  // Validate file
  if (!req.file) {
    return res.status(400).json({ message: 'Photo file is required' });
  }
    const photo = req.file ? req.file.filename : null;
  
    // Log file information
  console.log('File received:', req.file);
    // Ensure the file exists in the request
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }
  
    // Validate required fields
    if (!name || !location || !description) {
      res.status(404);
      throw new Error('All Fields are required');
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
      res.status(500);
      throw new Error('SERVER ERROR');
    }
  });
  
const getGroundsByLocation = asynHandler(async(req, res) => {
    try {
        const { location } = req.query; // Get the location from query parameter
        const grounds = await Ground.find({ location }); // Find grounds by location
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
        res.status(404);
        throw new Error('SERVER ERROR')
    }
});


const getGroundsByIdandDate = asynHandler(async(req , res)=>{
     const { ground_id } = req.params;
        const { date } = req.query;
    try {
        // Find the ground
        const ground = await Ground.findOne({ ground_id });
        if (!ground) {
            return res.status(404).json({ message: 'Ground not found.' });
        }

        // Validate and format the date
        const selectedDate = date ? new Date(date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

        // Find all bookings for the selected date and ground
        const bookings = await Booking.find({ ground_id, date: selectedDate });

        // Aggregate booked slots
        const bookedSlots = bookings.reduce((acc, booking) => acc.concat(booking.slots), []);

        // Respond with ground details and booked slots
        res.status(200).json({
            name: ground.name,
            location: ground.location,
            data: {
                image: ground.photo,
                desc: ground.description,
            },
            slots: {
                booked: bookedSlots,
            },
        });
    } catch (error) {
        console.error('Error fetching ground details:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export {createGround , getGroundsByLocation , getGroundsByIdandDate};