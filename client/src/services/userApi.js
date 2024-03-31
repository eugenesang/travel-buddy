import axios from 'axios';

const baseURL =  import.meta.env.VITE_API_BASE_URL;

const instance = axios.create({
    baseURL
});

// Register a new user
export async function registerUser(userData) {

    try {
        const response = await instance.post('/api/users/register', userData);

        response.data.user.profilePhoto = baseURL + response.data.user.profilePhoto;
        return response.data.user;
    } catch (error) {
        throw new Error('Failed to register user');
    }
}

// Login user
export async function loginUser(credentials) {
    try {
        const response = await instance.post('/api/users/login', credentials);
        return response.data.user;
    } catch (error) {
        throw new Error('Failed to login user');
    }
}


export const updateUser = {
    async name(name, id){
        try {
            const response = await instance.post("/api/users/name", {name, id});
            return response.data.user;
        } catch (error) {
            throw new Error("Failed to update user's name")
        }
    },

    async location(city, country, id){
        try {
            const response = await instance.post("/api/users/location", {city, country, id});
            return response.data.user;
        } catch (error) {
            throw new Error("Failed to update user's name")
        }
    },
    async about(about, id){
        try {
            const response = await instance.post("/api/users/about", {about, id});
            return response.data.user;
        } catch (error) {
            throw new Error("Failed to update user's about")
        }
    }
}


