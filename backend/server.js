import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
//const groundRoutes = require('./routes/groundRoutes'); 
import groundRoutes from './routes/groundRoutes.js';
import Booking from './routes/bookingRoutes.js';
const port = process.env.PORT || 5001;
import { notfound , errorHandler } from './middleware/errorMiddleware.js';
//import TestData from './Data/TestData.js';
// Import path and define __dirname for ES modules
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes
connectDB();

app.use('/uploads', express.static('uploads')); // Serve uploaded images
//Ground Routes
app.use('/api/ground' , groundRoutes)

//Booking Route
app.use('/api/booking' , Booking);

//make it for build
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*' , (req, res) => 
    res.sendFile(path.resolve(__dirname, '../frontend', 'build' , 'index.html')));
}else{
    app.get('/', (req , res) => {
        res.send('Api is Running.....');
    });
}
//Error handlers
app.use(notfound);
app.use(errorHandler);

app.listen(port , ()=> console.log(`server running on port ${port}`));