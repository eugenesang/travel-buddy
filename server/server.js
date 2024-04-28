import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

//Routes
import userRoutes from './routes/user.routes.js';
import tripRoutes from './routes/trip.routes.js';
import destinationRoutes from "./routes/destination.routes.js"

const app = express();

app.use(express.static('public'));

// Config
connectDB();
dotenv.config();

// Middleware
app.use(cors());
app.use(json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/users', userRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/destination', destinationRoutes)

// Error handling
app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
