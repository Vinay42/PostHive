
import axios from 'axios';
const path = import.meta.env.VITE_API_BASE_URL;

export class Service {
    constructor() {
        this.axios = axios.create({
            baseURL: `${path}/post`,
            withCredentials: true,
        });

        // Add request interceptor to include token
        this.axios.interceptors.request.use((config) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                // Don't override content-type for multipart/form-data
                if (!config.headers['Content-Type']?.includes('multipart/form-data')) {
                    config.headers['Content-Type'] = 'application/json';
                }
            }
            return config;
        });

        // Add response interceptor for error handling
        this.axios.interceptors.response.use(
            (response) => response.data,
            (error) => {
                console.error('API Error:', error.response?.data?.message || error.message);
                throw error;
            }
        );
    }


    getFilePreview(fileId) {
        return 0;
    }

    async createPost(formData) {
        // for (let pair of formData.entries()) {
        //     console.log(pair[0], pair[1]);
        // }
        // console.log(req.file)
        // console.log(req.user)
        try {
            // console.log(formData)
            const response = await this.axios.post('/posts', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response)
            return response.data;
        } catch (error) {
            console.error("Create post error:", error);
            throw error;
        }
    }

    async updatePost(slug,formData) {
        try {
            

            const response = await this.axios.patch(`/posts/${slug}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response)

            return response.data;
        } catch (error) {
            console.error("Update post error:", error);
            throw error;
        }
    }

    async deletePost(slug) {
        try {
            const response = await this.axios.delete(`/posts/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Delete post error:", error);
            throw error;
        }
    }

    async getPost(slug) {
        try {
            const response = await this.axios.get(`/get-post/${slug}`);
            return response.data;
        } catch (error) {
            console.error("Get post error:", error);
            throw error;
        }
    }


    async getPosts() {
                try {
                    const response = await this.axios.get("/posts");
        
                    // Return the fetched post data
                    return response.data;
        
                } catch (error) {
                    console.log("Appwrite serive :: getPost :: error", error)
                    return false
                }
            }

    async getUserPosts() {
        try {
            // console.log("at GetuserPosts")
            const response = await this.axios.get("/my-posts");
            // console.log(response.data)
            return response.data;
        } catch (error) {
            console.error("Get user posts error:", error);
            throw error;
        }
    }
}

const service = new Service();

export default service;
