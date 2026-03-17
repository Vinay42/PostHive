// require('dotenv').config({path: './env'})
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import {app} from './app.js'
dotenv.config({
    path: './.env'
})



// connectDB()
// .then(() => {
//     app.listen(process.env.PORT || 8000, () => {
//         console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
//     })
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !!! ", err);
// })

const startServer = async () => {
    try {
        await connectDB();
        console.log("MongoDB connected successfully");
        
        // Only start the server if not in Vercel
        if (process.env.NODE_ENV !== 'production') {
            app.listen(process.env.PORT || 8000, () => {
                console.log(`⚙️ Server running on port : ${process.env.PORT}`);
            });
        }
    } catch (err) {
        console.log("MONGO db connection failed !!! ", err);
    }
};

startServer();

export default app;







