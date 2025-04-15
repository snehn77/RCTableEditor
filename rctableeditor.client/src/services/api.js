import axios from 'axios';

// Create axios instance with base URL pointing to your ASP.NET Core API
const api = axios.create({
    baseURL: '/api', // This will use the proxy configuration from vite.config.js
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
    console.log('Starting API Request:', request);
    return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('API Response:', response);
        return response;
    },
    error => {
        console.error('API Error:', error);
        return Promise.reject(error);
    }
);

// API functions for filters
export const getFilters = async () => {
    try {
        console.log('Fetching filters...');
        const response = await api.get('/filters/all');
        console.log('Filters response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};

// Add to your existing api.js file

// API function for querying table data
export const queryTableData = async (queryParams) => {
    try {
        console.log('Querying with params:', queryParams);
        const response = await api.post('/tabledata/query', queryParams);
        return response.data;
    } catch (error) {
        console.error('Error querying table data:', error);
        throw error;
    }
};

// Save draft changes
export const saveDraftChanges = async (sessionId, changes) => {
    try {
        const response = await api.post(`/drafts/${sessionId}`, { changes });
        return response.data;
    } catch (error) {
        console.error('Error saving draft changes:', error);
        throw error;
    }
};

// Get all draft changes for a session
export const getDraftChanges = async (sessionId) => {
    try {
        const response = await api.get(`/drafts/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting draft changes:', error);
        throw error;
    }
};

export default api;