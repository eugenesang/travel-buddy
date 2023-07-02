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
