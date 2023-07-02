import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

//Create new trip
export async function createTrip(tripData) {
    try {
        const response = await instance.post('/api/trips/create', tripData);
        return response.data.trip;
    } catch (error) {
        alert("Failed to create trip");
        throw new Error('Failed to create trip');
    }
}

//Trip by id
export async function getTripById(tripId) {
    try {
        const response = await instance.get(`/api/trips/${tripId}`);
        return response.data.trip;
    } catch (error) {
        alert("Failed to get trip");
        throw new Error('Failed to get trip');
    }
}

//Get user trips
export async function getUserTrips(userId) {
    try {
        const response = await instance.get(`/api/trips/user-trips/${userId}`);
        return response.data.trips;
    } catch (error) {
        alert("Failed to get user trips");
        throw new Error('Failed to get user trips');
    }
}

//Delete trip
export async function deleteTrip(tripId) {
    try {
        const response = await instance.delete(`/api/trips/${tripId}`);
        return response.data.trip;
    } catch (error) {
        alert("Failed to delete trip");
        throw new Error('Failed to delete trip');
    }
}

//Update trip
export async function updateTrip(tripId, tripData) {
    try {
        const response = await instance.put(`/api/trips/update/${tripId}`, tripData);
        return response.data.trip;
    } catch (error) {
        alert("Failed to update trip");
        throw new Error('Failed to update trip');
    }
}

