import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: 'https://localhost:62869/api', // Update with your actual API port
    headers: {
        'Content-Type': 'application/json',
    },
});

// API functions for filters
export const getFilters = async () => {
    try {
        const response = await api.get('/filters/all');
        console.log('getFilters', response);
        return response.data;
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};

// API functions for table data
export const queryTableData = async (queryParams) => {
    try {
        const response = await api.post('/tabledata/query', queryParams);
        console.log('queryTableData', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching table data:', error);
        throw error;
    }
};

export default api;