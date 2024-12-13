import conf from '../conf/conf.js';
// import { Client, Account, ID } from "appwrite";

import axios from 'axios';
const API_BASE_URL = "http://localhost:8000/api/v1/users"


export class AuthService {
   

    constructor() {
            this.axios = axios.create({
                baseURL: API_BASE_URL,
                withCredentials: true // Important for handling cookies
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

            const response = await this.axios.post('/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

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
            const response = await this.axios.get('/current-user', {
                headers: this.#getAuthHeaders()
            });
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
            await this.axios.post('/logout', {}, {
                headers: this.#getAuthHeaders()
            });
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

