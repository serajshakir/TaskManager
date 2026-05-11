// src/configurations/createAxios.js
import axios from 'axios';

export const createAxios = () => axios.create({
    baseURL: "https://localhost:7213/api"  // Your Task API
});

export const createAxiosWithToken = (token) => axios.create({
    baseURL: "https://localhost:7213/api",  // Your Task API
    headers: {
        Authorization: `Bearer ${token}`
    }
});