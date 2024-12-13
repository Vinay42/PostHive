import mongoose, {Schema} from "mongoose";

const postSchema = new Schema({
    title:{
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required:true,
    },
    content: {
        type: String,
        required: true
    },
    featuredImg: {
        type: String, // cloudinary url
        required: true,
    },
    status: {
        type: String, // cloudinary url
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


export const Post = mongoose.model("Post", postSchema)