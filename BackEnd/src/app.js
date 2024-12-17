import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: ["http://localhost:5173","https://post-hive-lu8b.vercel.app"],
    // origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
    
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// Add basic health check route
app.get('/', (req, res) => {
    res.status(200).json({ message: "Server is running" });
});


//routes import
import userRouter from './routes/user.routes.js'
import postRouter from './routes/post.routes.js'


//routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/post", postRouter)


// http://localhost:8000/api/v1/users/register

export { app }