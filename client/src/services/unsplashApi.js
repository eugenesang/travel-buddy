import axios from "axios";

// Unsplash api key
const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export const fetchImages = async (location) => {

    const API_URL = `https://api.unsplash.com/search/photos?page=1&query=${location}&per_page=5&client_id=${API_KEY}`;

    try {
        const response = await axios
            .get(API_URL);
        return response.data.results;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
};
