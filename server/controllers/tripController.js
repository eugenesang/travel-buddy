// tripController.js

import Trip from '../models/Trip.js';
import User from '../models/User.js';

import { countDays } from '../utils/formatDate.js';


// Create a new trip
export async function createTrip(req, res) {
    try {
        const { name, destination, startDate, endDate, cost, createdBy, invitations, description } = req.body;
        console.log(req.body);
        const trip = await Trip.create({
            name,
            destination,
            startDate,
            endDate,
            cost,
            totalDays: countDays(startDate, endDate),
            description,
            invitations,
            createdBy, // Store the user who created the trip
        });

        // Update the user's trips array
        await User.findByIdAndUpdate(createdBy, { $push: { trips: trip._id } });

        res.status(201).json({ message: 'Trip created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create trip' });
        console.log(error);
    }
}

// Get all trips of a user
export async function getUserTrips(req, res) {
    try {
        const user = await User.findById(req.params.id).populate('trips');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ trips: user.trips });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get user trips' });
    }
}

// Get a trip by ID
export async function getTrip(req, res) {
    try {
        const trip = await Trip.findById(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get trip' });
    }
}

// Get all trips
export async function getAllTrips(req, res) {
    try {
        const trips = await Trip.find();
        res.json({ trips });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get trips' });
    }
}

// Update a trip
export async function updateTrip(req, res) {
    try {
        const { name, destination, startDate, endDate, description, cost } = req.body;
        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            { name, destination, startDate, endDate, description, cost },
            { new: true }
        );
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update trip' });
    }
}

// Delete a trip
export async function deleteTrip(req, res) {
    try {
        const trip = await Trip.findByIdAndDelete(req.params.id);
        if (!trip) {
            return res.status(404).json({ error: 'Trip not found' });
        }
        res.json({ message: 'Trip deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete trip' });
    }
}
