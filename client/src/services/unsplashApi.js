import axios from "axios";

//Unsplash api key
const unsplashApiKey = import.meta.env.UNSPLASH_API_KEY;

export const fetchImages = (location) => {
    const API_KEY = unsplashApiKey;
    const API_URL = `https://api.unsplash.com/search/photos?page=1&query=${location}&per_page=5&client_id=${API_KEY}`;

    axios
        .get(API_URL)
        .then((response) => {
            return response.data.results;
        })
        .catch((error) => {
            console.error("Error fetching images:", error);
        });
};