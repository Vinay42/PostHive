// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken"
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async(req, _, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        
    

//         if (!token) {
//             throw new ApiError(401, "Unauthorized request")
//         }

//         if (!process.env.ACCESS_TOKEN_SECRET) {
//             throw new ApiError(500, "Server configuration error - Token secret not found");
//         }
    
//         const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
//         const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
//         if (!user) {
            
//             throw new ApiError(401, "Invalid Access Token")
//         }
    
//         req.user = user;
//         next()
//     } catch (error) {
//         throw new ApiError(401, error?.message || "Invalid access token")
//     }
    
// })

// src/middlewares/auth.middleware.js
// import { ApiError } from "../utils/ApiError.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import jwt from "jsonwebtoken";
// import { User } from "../models/user.model.js";

// export const verifyJWT = asyncHandler(async(req, res, next) => {
//     try {
//         // Get token from cookies or Authorization header
//         const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        
//         console.log("Received Token:", token); // Debug log
//         console.log("Cookies received:", req.cookies); // Debug log
//         console.log("Headers received:", req.headers); // Debug log

//         if (!token) {
//             throw new ApiError(401, "Unauthorized request - No token provided");
//         }

//         if (!process.env.ACCESS_TOKEN_SECRET) {
//             throw new ApiError(500, "Server configuration error - Token secret not found");
//         }

//         try {
//             const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//             console.log("Decoded Token:", decodedToken); // Debug log

//             const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
            
//             if (!user) {
//                 throw new ApiError(401, "Invalid Access Token - User not found");
//             }

//             req.user = user;
//             next();
//         } catch (jwtError) {
//             if (jwtError.name === 'JsonWebTokenError') {
//                 throw new ApiError(401, "Invalid token format");
//             } else if (jwtError.name === 'TokenExpiredError') {
//                 throw new ApiError(401, "Token has expired");
//             } else {
//                 throw new ApiError(401, "Token verification failed");
//             }
//         }
//     } catch (error) {
//         next(new ApiError(401, error?.message || "Invalid access token"));
//     }
// });

// src/middlewares/auth.middleware.js
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async(req, res, next) => {
    try {
        // Multiple ways to get the token
        let token;
        
        // 1. Check Authorization header (Bearer token)
        const authHeader = req.headers["authorization"];
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }

        // 2. Check custom header
        if (!token && req.headers["x-access-token"]) {
            token = req.headers["x-access-token"];
        }

        // 3. Check query parameter (not recommended for production)
        if (!token && req.query.token) {
            token = req.query.token;
        }

        // 4. Check cookies (including custom implementations)
        if (!token) {
            token = req.cookies?.accessToken || 
                   req.cookies?.["x-access-token"] ||
                   req.headers.cookie?.split(';')
                        .find(c => c.trim().startsWith('accessToken='))
                        ?.split('=')[1];
        }

        // Debug logs
        console.log("Auth Header:", req.headers["authorization"]);
        console.log("Final Token Found:", token ? "Yes" : "No");
        console.log("Cookie Header:", req.headers.cookie);

        if (!token) {
            throw new ApiError(401, "Authentication failed: No token provided");
        }

        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new ApiError(500, "Server configuration error: Token secret not found");
        }

        try {
            const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            console.log("Token Decoded Successfully:", decodedToken._id ? "Yes" : "No");

            const user = await User.findById(decodedToken?._id)
                .select("-password -refreshToken")
                .lean();

            if (!user) {
                throw new ApiError(401, "Authentication failed: User not found");
            }

            // Attach user to request object
            req.user = user;
            next();
        } catch (jwtError) {
            console.error("JWT Verification Error:", jwtError.name);
            if (jwtError.name === 'JsonWebTokenError') {
                throw new ApiError(401, "Invalid token format");
            } else if (jwtError.name === 'TokenExpiredError') {
                throw new ApiError(401, "Token has expired");
            } else {
                throw new ApiError(401, "Token verification failed");
            }
        }
    } catch (error) {
        next(new ApiError(401, error?.message || "Authentication failed"));
    }
});