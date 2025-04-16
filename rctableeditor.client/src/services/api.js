import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get session ID from localStorage
const getSessionId = () => {
    return localStorage.getItem('rc_table_editor_session_id');
};

// Add request interceptor to include session ID
api.interceptors.request.use(
    config => {
        const sessionId = getSessionId();
        if (sessionId) {
            config.headers['X-Session-ID'] = sessionId;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// API functions for filters
export const getFilters = async () => {
    try {
        const response = await api.get('/filters/all');
        return response.data;
    } catch (error) {
        console.error('Error fetching filters:', error);
        throw error;
    }
};

// src/services/api.js - Update the queryTableData function
export const queryTableData = async (queryParams) => {
    try {
        console.log('Querying table data with params:', queryParams);
        const response = await api.post('/tabledata/query', queryParams);
        return response.data;
    } catch (error) {
        console.error('Error querying table data:', error);
        throw error;
    }
};

// Save draft changes
export const saveDraftChanges = async (changes) => {
    try {
        const sessionId = getSessionId();
        const response = await api.post(`/drafts/${sessionId}`, { changes });
        return response.data;
    } catch (error) {
        console.error('Error saving draft changes:', error);
        throw error;
    }
};

// Get all draft changes for a session
export const getDraftChanges = async () => {
    try {
        const sessionId = getSessionId();
        const response = await api.get(`/drafts/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting draft changes:', error);
        throw error;
    }
};

// Discard all draft changes
export const discardDraftChanges = async () => {
    try {
        const sessionId = getSessionId();
        const response = await api.delete(`/drafts/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error discarding draft changes:', error);
        throw error;
    }
};

// Submit changes for approval
export const submitChanges = async (notes) => {
    try {
        const sessionId = getSessionId();
        const response = await api.post(`/submit/${sessionId}`, { notes });
        return response.data;
    } catch (error) {
        console.error('Error submitting changes:', error);
        throw error;
    }
};

export default api;