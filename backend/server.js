import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
//const groundRoutes = require('./routes/groundRoutes'); 
import groundRoutes from './routes/groundRoutes.js';
const port = process.env.PORT || 5000;
//import TestData from './Data/TestData.js';
connectDB();
const app = express();

app.get('/', (req , res) => {
    res.send('Api is Running.....');
});

app.use('/api/ground' , groundRoutes)

app.listen(port , ()=> console.log(`server running on port ${port}`));