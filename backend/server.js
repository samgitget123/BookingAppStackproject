import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
//const groundRoutes = require('./routes/groundRoutes'); 
import groundRoutes from './routes/groundRoutes.js';
import Booking from './routes/bookingRoutes.js';
const port = process.env.PORT || 5000;
//import TestData from './Data/TestData.js';

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
connectDB();
app.get('/', (req , res) => {
    res.send('Api is Running.....');
});

//Ground Routes
app.use('/api/ground' , groundRoutes)

//Booking Route
app.use('/api/booking' , Booking);

app.listen(port , ()=> console.log(`server running on port ${port}`));