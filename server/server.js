import express, { json } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';

const app = express();

// Config
connectDB();
dotenv.config();

// Middleware
app.use(cors());
app.use(json());

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
