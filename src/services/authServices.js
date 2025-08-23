import api from './api';

export const apisignup = async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
};

export const apilogin = async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
};

export const apilogout = async () => {
    const response = await api.post('/auth/logout');
    return response.data;
};

export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};


