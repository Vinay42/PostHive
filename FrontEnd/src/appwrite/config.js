// import conf from "../conf/conf";
// import axios from 'axios';
// const API_BASE_URL = "http://localhost:8000/api/v1/users"
// import { Client,Databases,ID,Storage,Query } from "appwrite";

// export class Service{
//     client = new Client()
//     databases;
//     bucket;

//     constructor(){
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId)
//         this.databases = new Databases(this.client)  
//         this.bucket = new Storage(this.client)                                             
//     }

//     async createPost({title,slug,content,featuredImg,status,userId}){
//         try{

//             return await this.databases.createDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredImg,
//                     status,
//                     userId

//                 }
//             )

//         }catch(error){
//             console.log("Error : ",error)
//         }
//     }

//     async updatePost(slug,{title,content,featuredImg,status}){
//         try{
//             return await this.databases.updateDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug,
//                 {
//                     title,
//                     content,
//                     featuredImg,
//                     status
//                 }
//             )

//         }catch(error){
//             console.log("Appwrite serive :: updatePost :: error",error);
//         }
//     }

//     async deletePost(slug){
//         try{
//             await this.databases.deleteDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             )
//             return true
//         }catch(error){
//             console.log("Appwrite serive :: deletePost :: error",error)
//             return false
//         }
//     }

//     async getPost(slug){
//         try{
//             return await this.databases.getDocument(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 slug
//             )

//         }catch(error){
//             console.log("Appwrite serive :: getPost :: error",error)
//             return false
//         }
//     }

//     async getPosts(queries = [Query.equal("status","active")]){
//         try{
//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 queries
//             )
//         }catch(error){
//             console.log("Appwrite serive :: getPosts :: error",error)
//             return false
//         }
//     }

//     // async getUserPosts(userId) {
//     //     try {
//     //         // Add a query to filter by the current user's ID
//     //         queries.push(queries = [Query.equal("userId", userId)]);

//     //         return await this.databases.listDocuments(
//     //             conf.appwriteDatabaseId,
//     //             conf.appwriteCollectionId,
//     //             queries
//     //         );
//     //     } catch (error) {
//     //         console.log("Appwrite service :: getPosts :: error", error);
//     //         return false;
//     //     }
//     // }

//     async getUserPosts(userId) {
//         try {
//             const queries = [
//                 Query.equal("userId", userId), // Filter by the userId field
//                 Query.equal("status", "active") // Optional: add more filters if needed
//             ];

//             return await this.databases.listDocuments(
//                 conf.appwriteDatabaseId,
//                 conf.appwriteCollectionId,
//                 queries
//             );
//         } catch (error) {
//             console.log("Appwrite service :: getUserPosts :: error", error);
//             return false;
//         }
//     }



//     // file upload service 

//     async uploadFile(file){
//         try{

//             return await this.bucket.createFile(
//                 conf.appwriteBucketId,
//                 ID.unique(),
//                 file
//             )

//         }catch(error){
//             console.log("Appwrite serive :: uploadFile :: error",error)
//             return false
//         }
//     }

//     async delteFile(fileId){
//         try{

//             await this.bucket.deleteFile(
//                 conf.appwriteBucketId,
//                 fileId
//             )
//             return true

//         }catch(error){
//             console.log("Appwrite serive :: delteFile :: error",error)
//             return false
//         }
//     }

//     getFilePreview(fileId){
//         return this.bucket.getFilePreview(
//             conf.appwriteBucketId,
//             fileId
//         )
//     }

// }

// const service = new Service()

// export default service

// export class Service {
//     constructor() {
//         this.axios = axios.create({
//             baseURL: API_BASE_URL,
//             withCredentials: true // Important for handling cookies
//         });

//     }

//     async createPost({ title, slug, content, featuredImg, status, owner }) {
//         try {
//             const postData = {
//                 title,
//                 slug,
//                 content,
//                 featuredImg, // This is a URL or text, not a file
//                 status,
//                 owner,
//             };

//             await this.axios.post('/posts', postData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//         } catch (error) {
//             console.log("Error:", error);
//         }
//     }

//     async updatePost(slug, { title, content, featuredImg, status }) {
//         try {
//             const postData = {
//                 title,
//                 content,
//                 featuredImg, // This is a URL or text, not a file
//                 status
//             };

//             await this.axios.post(`/posts/${slug}`, postData, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//         } catch (error) {
//             console.log("Appwrite serive :: updatePost :: error", error);
//         }
//     }

//     async deletePost(slug) {
//         try {
//             // Send DELETE request to backend to delete the post
//             const response = await this.axios.delete(`/posts/${slug}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     // If needed, add Authorization header here
//                 }
//             });

//             // Return success response (or handle it as needed)
//             return response.data;



//             return true
//         } catch (error) {
//             console.log("Appwrite serive :: deletePost :: error", error)
//             return false
//         }
//     }

//     async getPost(slug) {
//         try {
//             const response = await this.axios.get(`/posts/${slug}`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//             // Return the fetched post data
//             return response.data;

//         } catch (error) {
//             console.log("Appwrite serive :: getPost :: error", error)
//             return false
//         }
//     }

//     async getPosts() {
//         try {
//             const response = await this.axios.get("/posts", {
//                 headers: {
//                     'Content-Type': 'application/json',
//                 }
//             });

//             // Return the fetched post data
//             return response.data;

//         } catch (error) {
//             console.log("Appwrite serive :: getPost :: error", error)
//             return false
//         }
//     }

//     async getUserPosts(userId) {
//                 try {
//                     const response = await this.axios.get("/my-posts", {
//                         headers: {
//                             'Content-Type': 'application/json',
//                         }
//                     });

//                     // Return the fetched post data
//                     return response.data;
//                 } catch (error) {
//                     console.log("Appwrite service :: getUserPosts :: error", error);
//                     return false;
//                 }
//             }



// }

// const service = new Service()

// export default service

import axios from 'axios';

// const API_BASE_URL = "http://localhost:8000/api/v1/post";
const API_BASE_URL = "https://post-hive-backend.vercel.app/api/v1/post";

export class Service {
    constructor() {
        this.axios = axios.create({
            baseURL: API_BASE_URL,
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
