// tripController.js

import Trip from '../models/Trip.js';
import User from '../models/User.js';

// Create a new trip
export async function createTrip(req, res) {
    try {
        const { name, destination, startDate, endDate } = req.body;
        const trip = await Trip.create({
            name,
            destination,
            startDate,
            endDate,
            createdBy: req.user._id, // Store the user who created the trip
        });

        // Update the user's trips array
        await User.findByIdAndUpdate(req.user._id, { $push: { trips: trip._id } });

        res.status(201).json({ trip });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create trip' });
    }
}

// Get all trips of a user
export async function getUserTrips(req, res) {
    try {
        const user = await User.findById(req.user._id).populate('trips');
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

// Update a trip
export async function updateTrip(req, res) {
    try {
        const { name, destination, startDate, endDate } = req.body;
        const trip = await Trip.findByIdAndUpdate(
            req.params.id,
            { name, destination, startDate, endDate },
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
