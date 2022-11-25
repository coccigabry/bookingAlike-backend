import 'dotenv/config';
import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoute from './api/routes/auth.js';
import usersRoute from './api/routes/users.js';
import hotelsRoute from './api/routes/hotels.js';
import roomsRoute from './api/routes/rooms.js';


// DB connection
mongoose.connect(
    `${process.env.START_MONGODB}${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}${process.env.END_MONGODB}`, 
    (err) => {
        if (err) throw err;
        console.log("Connected to mongoose successfully");
    }
);


// Middleware
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });
});

app.get('/', (req, res) => {
    res.send("Hello World!");
});


app.listen(process.env.PORT || 4000, () => {
    console.log("Server listening");
});