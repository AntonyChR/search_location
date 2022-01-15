import axios from 'axios';
const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        country:'pe',
        language: 'es',
        access_token: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    }
})

export default searchApi;