import conf from '../conf/conf.js';
// ...existing code...

import axios from 'axios';
const path= import.meta.env.VITE_API_BASE_URL

export class AuthService {
   

    constructor() {
            this.axios = axios.create({
                baseURL: `${path}/users`,
                withCredentials: true // Important for handling cookies
            });

            this.axios.interceptors.request.use((config) => {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            });
            
    }

    async createAccount({email, password, name}) {
        try {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);
            formData.append('username', name);
            // if (avatar) formData.append('avatar', avatar);
            // if (coverImage) formData.append('coverImage', coverImage);
            // formData.append('username', email.split('@')[0]); // Creating username from email

            const response = await this.axios.post('/register', formData);
            console.log(response)

            if (response.data) {
                // Automatically log in after successful registration
                return this.login({ email, password });
            }
            return response.data;
        } catch (error) {
            console.error("Registration error:", error.response?.data || error.message);
            throw error;
        }
    }

    async login({email, password}) {
         try {
            const response = await this.axios.post('/login', {
                email,
                password
            });

            // Store the tokens if your frontend needs them
            const { accessToken, refreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            
            return response.data;
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            // const response = await this.axios.get('/current-user', {
            //     headers: this.#getAuthHeaders()
            // });
            const response = await this.axios.get('/current-user');
            return response.data.data;
        } catch (error) {
            console.error("Get current user error:", error.response?.data || error.message);
            if (error.response?.status === 401) {
                // Try to refresh the token
                const refreshed = await this.refreshToken();
                if (refreshed) {
                    // Retry getting current user
                    return this.getCurrentUser();
                }
            }
            return null;
        }
    }

    async logout() {

        try {
            await this.axios.post('/logout');
            // await this.axios.post('/logout', {}, {
            //     headers: this.#getAuthHeaders()
            // });
            localStorage.removeItem('accessToken');
        } catch (error) {
            console.error("Logout error:", error.response?.data || error.message);
            throw error;
        }
    }

    async refreshToken() {
        try {
            const response = await this.axios.post('/refresh-token');
            const { accessToken, refreshToken } = response.data.data;
            localStorage.setItem('accessToken', accessToken);
            return true;
        } catch (error) {
            console.error("Token refresh error:", error.response?.data || error.message);
            return false;
        } }

    #getAuthHeaders() {
            const token = localStorage.getItem('accessToken');
            return token ? { Authorization: `Bearer ${token}` } : {};
        }
}

const authService = new AuthService();

export default authService

