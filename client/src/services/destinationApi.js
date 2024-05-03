import axios from 'axios';

const baseURL =  import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
    baseURL
});

// Register a new user
export async function getDestinationById(id) {

    try {
        const response = await instance.get('/api/destination/get/'+id);
        return response.data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

export async function searchDestinations(q){
    try {
        const response = await instance.get("/api/destination/search?q="+q);
        return response.data;
    } catch (error) {
        throw new Error("Failed to get search results")
    }
}