import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.PORT || 5000;
//import TestData from './Data/TestData.js';
const app = express();

app.get('/', (req , res) => {
    res.send('Api is Running.....');
});

// ////Testing/////
// app.get('/api/test' , (req , res) => {
//     res.json(TestData);
// });

// app.get('/api/test/:id' , (req, res)=>{
//     const detail = TestData.find((p)=>p._id === req.params.id);
//     res.json(detail);
// });

// ///////////////////
app.listen(port , ()=> console.log(`server running on port ${port}`));