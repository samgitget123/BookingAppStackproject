import asynHandler from '../middleware/asyncHandler.js';
import Ground from '../models/Ground.js';
import Booking from '../models/Booking.js';

// const createGround = asynHandler(async (req, res) => {
//     const { name, location, description } = req.body;
//     // Log request body and file for debugging
//   console.log('Request Body:', req.body);
//   console.log('Uploaded File:', req.file);

//   // Validate file
//   if (!req.file) {
//     return res.status(400).json({ message: 'Photo file is required' });
//   }
//     const photo = req.file ? req.file.filename : null;
  
//     // Log file information
//   console.log('File received:', req.file);
//     // Ensure the file exists in the request
//     if (!req.file) {
//       return res.status(400).json({ message: 'File is required' });
//     }
  
//     // Validate required fields
//     if (!name || !location || !description) {
//       res.status(404);
//       throw new Error('All Fields are required');
//     }
  
//     try {
//       // Create a new ground document
//       const newGround = new Ground({
//         name,
//         location,
//         photo,
//         description
//       });
  
//       // Save the new ground document to the database
//       await newGround.save();
  
//       // Respond with the newly created ground data
//       res.status(201).json({
//         message: 'Ground created successfully',
//         ground: {
//           ground_id: newGround.ground_id,
//           name: newGround.name,
//           location: newGround.location,
//           photo: newGround.photo,
//           description: newGround.description,
//         }
//       });
//     } catch (error) {
//       console.error('Error creating ground:', error);
//       res.status(500);
//       throw new Error('SERVER ERROR');
//     }
//   });
// const createGround = asynHandler(async (req, res) => {
//     const { name, location, country, state, stateDistrict, description } = req.body;
  
//     // Log request body and file for debugging
//     console.log('Request Body:', req.body);
//     console.log('Uploaded File:', req.file);
  
//     // Validate file
//     if (!req.file) {
//         return res.status(400).json({ message: 'Photo file is required' });
//     }
//     const photo = req.file ? req.file.filename : null;
  
//     // Log file information
//     console.log('File received:', req.file);
    
//     // Ensure the file exists in the request
//     if (!req.file) {
//         return res.status(400).json({ message: 'File is required' });
//     }
  
//     // Validate required fields including area, state, and district
//     if (!name || !location || !country || !state || !stateDistrict || !description) {
//         res.status(404);
//         throw new Error('All Fields (name, location, area, state, stateDistrict, description) are required');
//     }
  
//     try {
//         // Create a new ground document with state and stateDistrict
//         const newGround = new Ground({
//             name,
//             location,
//             country,
//             state,         // Save the state
//             stateDistrict, // Save the state district
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
//                 country: newGround.country,
//                 state: newGround.state,       // Include state in the response
//                 stateDistrict: newGround.stateDistrict, // Include state district in the response
//                 photo: newGround.photo,
//                 description: newGround.description,
//             }
//         });
//     } catch (error) {
//         console.error('Error creating ground:', error);
//         res.status(500);
//         throw new Error('SERVER ERROR');
//     }
//   });
  
// const getGroundsByLocation = asynHandler(async(req, res) => {
//     try {
//         const { location } = req.query; // Get the location from query parameter
//         const grounds = await Ground.find({ location }); // Find grounds by location
//         const response = grounds.map(ground => ({
//             ground_id: ground.ground_id,
//             data: {
//                 name: ground.name,
//                 location: ground.location,
//                 photo: ground.photo,
//                 description: ground.description,
//             },
//         }));

//         res.json(response);
//     } catch (err) {
//         res.status(404);
//         throw new Error('SERVER ERROR')
//     }
// });

const createGround = asynHandler(async (req, res) => {
    const { name, location, city, country, state, stateDistrict, description } = req.body;

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

    // Validate required fields, including city, state, and district
    if (!name || !location || !city || !country || !state || !stateDistrict || !description) {
        res.status(404);
        throw new Error(
            'All fields (name, location, city, country, state, stateDistrict, description) are required'
        );
    }

    try {
        // Create a new ground document with all the required fields
        const newGround = new Ground({
            name,
            location,
            city,         // Save the city
            country,
            state,         // Save the state
            stateDistrict, // Save the state district
            photo,
            description,
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
                city: newGround.city,       // Include city in the response
                country: newGround.country,
                state: newGround.state,     // Include state in the response
                stateDistrict: newGround.stateDistrict, // Include state district in the response
                photo: newGround.photo,
                description: newGround.description,
            },
        });
    } catch (error) {
        console.error('Error creating ground:', error);
        res.status(500);
        throw new Error('SERVER ERROR');
    }
});


// const getGroundsByLocation = asynHandler(async (req, res) => {
//     try {
//         const { location, state } = req.query; // Get query parameters

//         // Build query object dynamically
//         const query = {};
//         if (location) query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive
//         if (state) query.state = { $regex: new RegExp(state, "i") }; // Case-insensitive

//         // Fetch grounds
//         const grounds = await Ground.find(query);

//         if (!grounds || grounds.length === 0) {
//             res.status(404).json({ message: "No grounds found for the specified filters" });
//             return;
//         }

//         // Map response
//         const response = grounds.map((ground) => ({
//             ground_id: ground.ground_id,
//             data: {
//                 name: ground.name,
//                 location: ground.location,
//                 photo: ground.photo,
//                 description: ground.description,
//             },
//         }));

//         res.json(response);
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// });
// const getGroundsByLocation = asynHandler(async (req, res) => {
//     try {
//         const { location, state, city } = req.query; // Get query parameters

//         // Build query object dynamically
//         const query = {};
        
//         if (location) query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive
//         if (state) query.state = { $regex: new RegExp(state, "i") }; // Case-insensitive
//         if (city) query.city = { $regex: new RegExp(city, "i") }; // Case-insensitive

//         // Fetch grounds based on the query
//         const grounds = await Ground.find(query);

//         if (!grounds || grounds.length === 0) {
//             res.status(404).json({ message: "No grounds found for the specified filters" });
//             return;
//         }

//         // Map response to match the required format
//         const response = grounds.map((ground) => ({
//             ground_id: ground.ground_id,
//             data: {
//                 name: ground.name,
//                 location: ground.location,
//                 city: ground.city, // Include city in the response
//                 photo: ground.photo,
//                 description: ground.description,
//             },
//         }));

//         res.json(response);
//     } catch (err) {
//         res.status(500).json({ message: "Server Error", error: err.message });
//     }
// });
const getGroundsByLocation = asynHandler(async (req, res) => {
    try {
        const { location, state, city } = req.query; // Get query parameters

        // Build query object dynamically
        const query = {};

        // Check if 'location' is provided, and add it to the query object if it is
        if (location) query.location = { $regex: new RegExp(location, "i") }; // Case-insensitive
        
        // Check if 'state' is provided, and add it to the query object
        if (state) query.state = { $regex: new RegExp(state, "i") }; // Case-insensitive
        
        // Check if 'city' is provided, and add it to the query object
        if (city) query.city = { $regex: new RegExp(city, "i") }; // Case-insensitive

        // Fetch grounds based on the query
        const grounds = await Ground.find(query);

        if (!grounds || grounds.length === 0) {
            if (state && city) {
                // If both state and city are provided and no results are found
                res.status(404).json({ message: "No grounds found for the specified state and city combination" });
            } else if (state) {
                // If only state is provided and no results are found
                res.status(404).json({ message: "No grounds found for the specified state" });
            } else {
                // If no grounds are found for any reason
                res.status(404).json({ message: "No grounds found for the specified filters" });
            }
            return;
        }

        // Map response to match the required format
        const response = grounds.map((ground) => ({
            ground_id: ground.ground_id,
            data: {
                name: ground.name,
                location: ground.location,
                city: ground.city, // Include city in the response
                photo: ground.photo,
                description: ground.description,
            },
        }));

        res.json(response);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
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