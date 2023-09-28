import axios from "axios";

//Rapid api keys
const rapidApiKey = import.meta.env.VITE_RAPID_API_KEY;

export const travelData = async (location) => {

    const options = {
        method: 'POST',
        url: 'https://travel-advisor.p.rapidapi.com/locations/v2/search',
        params: {
            currency: 'USD',
            units: 'km',
            lang: 'en_US'
        },
        headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': '9457f0eec1msha0ab45c45f03fafp1b3d9cjsn9c3be8e4084d',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        },
        data: {
            query: 'chiang mai',
            updateToken: ''
        }
    };

    try {
        const response = await axios.request(options);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

export const fetchTouristPlaces = async (location) => {
    const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
        params: {
            name: location,
            locale: "en-gb",
        },
        headers: {
            "X-RapidAPI-Key":
                rapidApiKey,
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
    };

    // Fetch tourist places
    try {
        const response = await axios.request(options);
        return response.data; // Return tourist places
    } catch (error) {
        console.error("Error fetching tourist places:", error);
    }
};

export const fetchPlaceLocation = async (location) => {
    const options = {
        method: "GET",
        url: "https://opentripmap-places-v1.p.rapidapi.com/en/places/geoname",
        params: { name: location },
        headers: {
            "X-RapidAPI-Key":
                rapidApiKey,
            "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
        },
    };

    try {
        const response = await axios.request(options);
        return response.data; // Return placeProperty
    } catch (error) {
        console.error("Error fetching place location:", error);
        throw error; // Throw error to be caught in the caller function
    }
};

export const fetchHotels = async (lat, lon) => {
    const options = {
        method: "GET",
        url: "https://booking-com.p.rapidapi.com/v1/hotels/search-by-coordinates",
        params: {
            units: "imperial",
            room_number: "1",
            longitude: lon,
            latitude: lat,
            filter_by_currency: "AED",
            order_by: "popularity",
            locale: "en-gb",
            checkout_date: "2023-09-28",
            adults_number: "2",
            checkin_date: "2023-09-27",
            children_ages: "5,0",
            include_adjacency: "true",
            children_number: "2",
            page_number: "0",
            categories_filter_ids: "class::2,class::4,free_cancellation::1",
        },
        headers: {
            "X-RapidAPI-Key":
                rapidApiKey,
            "X-RapidAPI-Host": "booking-com.p.rapidapi.com",
        },
    };

    // Fetch hotels
    try {
        const response = await axios.request(options);
        return response.data.result; // Return hotels
    } catch (error) {
        console.error("Error fetching hotels:", error);
    }
};