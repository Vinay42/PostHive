import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// const createPost = asyncHandler(async (req, res) => {
//   const { title, content,status } = req.body;
//   const postLocalPath = req.file?.path
//   const owner = req.user._id;


//   if (!title || !content) {
//     throw new ApiError(400, 'All fields are required');
//   }

//   const slug = title.toLowerCase().replace(/\s+/g, '-');

//   if (!postLocalPath) {
//     throw new ApiError(400, 'featuredImg is required');
//   }

//   let imageUrl = null;
//   if (postLocalPath) {
//     const uploadedImage = await uploadOnCloudinary(postLocalPath);
//     imageUrl = uploadedImage.url;
//     console.log(imageUrl)
//   }

//   const post = await Post.create({
//     title,
//     slug,
//     content,
//     featuredImg: imageUrl,
//     status,
//     owner
//   });

//   return res.status(201).json(
//     new ApiResponse(201, post, 'Post created successfully')
//   );
// });

// Create new blog post

const createPost = asyncHandler(async (req, res) => {
    const { title, content, status = "active" } = req.body;
    const featuredImgPath = req.file?.path;
    const userId = req.user._id;
    console.log(featuredImgPath)
    //   console.log("at backend/createpost")

    // Validation
    if (!title?.trim() || !content?.trim()) {
        throw new ApiError(400, "Title and content are required");
    }

    if (!featuredImgPath) {
        throw new ApiError(400, "Featured image is required");
    }

    // Create URL-friendly slug
    const slug = title
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-');

    // Check for slug uniqueness
    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
        throw new ApiError(400, "A post with this title already exists");
    }

    // Upload image
    let featuredImg = null;
    try {
        const uploadedImage = await uploadOnCloudinary(featuredImgPath);
        featuredImg = uploadedImage.url;
    } catch (error) {
        throw new ApiError(500, "Error uploading image");
    }

    // Create post
    const post = await Post.create({
        title,
        slug,
        content,
        featuredImg,
        status,
        userId
    });

    return res.status(201).json(
        new ApiResponse(201, post, "Post created successfully")
    );
});

const getUserPosts = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const posts = await Post.find({ userId }).sort({ createdAt: -1 });
        return res.status(200).json(
            new ApiResponse(200, posts, 'User posts fetched successfully')
        );
    } catch (error) {
        console.log("Error: ",error)
    }
});
       
// Get posts by user

// const getUserPosts = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10 } = req.query;
//   const userId = req.user._id;

//   const posts = await Post.find({ owner: userId })
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .populate('owner', 'username email');

//   const total = await Post.countDocuments({ owner: userId });

//   return res.status(200).json(
//       new ApiResponse(200, {
//           posts,
//           pagination: {
//               total,
//               page: parseInt(page),
//               pages: Math.ceil(total / limit)
//           }
//       }, "User posts fetched successfully")
//   );
// });


const getPost = asyncHandler(async (req, res) => {
    const { slug } = req.params;

    const post = await Post.findOne({ slug});

    if (!post) {
        throw new ApiError(404, 'Post not found');
    }

    return res.status(200).json(
        new ApiResponse(200, post, 'Post fetched successfully')
    );
});

// const getPost = asyncHandler(async (req, res) => {
//   const { slug } = req.params;

//   const post = await Post.findOne({ 
//       slug,
//       $or: [
//           { userId: req.user?._id }
//       ]
//   }).populate('userId', 'username email');

//   if (!post) {
//       throw new ApiError(404, "Post not found");
//   }

//   return res.status(200).json(
//       new ApiResponse(200, post, "Post fetched successfully")
//   );
// });

const getAllPosts = asyncHandler(async (req, res) => {
    const posts = await Post.find({ status: "active" }).sort({ createdAt: -1 });
    return res.status(200).json(
        new ApiResponse(200, posts, 'All published posts fetched successfully')
    );
});

// const getAllPosts = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 10, search } = req.query;

//   const query = { status: "active" };
//   if (search) {
//       query.$or = [
//           { title: { $regex: search, $options: 'i' } },
//           { content: { $regex: search, $options: 'i' } }
//       ];
//   }

//   const posts = await Post.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(limit)
//       .populate('owner', 'username email');

//   const total = await Post.countDocuments(query);

//   return res.status(200).json(
//       new ApiResponse(200, {
//           posts,
//           pagination: {
//               total,
//               page: parseInt(page),
//               pages: Math.ceil(total / limit)
//           }
//       }, "Posts fetched successfully")
//   );
// });

// const updatePost = asyncHandler(async (req, res) => {
//   const { slug  } = req.params;
//   const { title, content, featuredImg, status } = req.body;
//   const ownerId = req.user._id;

//   if (!isValidObjectId(id) && !req.user.isAdmin) {
//     throw new ApiError(400, 'Invalid post ID');
//   }

//   let post = await Post.findOne({ slug , owner: ownerId });
//   if (!post) {
//     throw new ApiError(404, 'Post not found');
//   }


//   let newSlug = post.slug;
//   if(title){
//   newSlug = title.toLowerCase().replace(/\s+/g, '-');
//   }

//   let imageUrl = post.featuredImg;
//   if (featuredImg) {
//     const uploadedImage = await uploadOnCloudinary(featuredImg);
//     imageUrl = uploadedImage.url;
//   }

//   post = await Post.findByIdAndUpdate(
//     {slug},
//     {
//       title,
//       content,
//       featuredImg: imageUrl,
//       status,
//       slug:newSlug
//     },
//     { new: true }
//   );

//   return res.status(200).json(
//     new ApiResponse(200, post, 'Post updated successfully')
//   );
// });

const updatePost = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    // console.log(slug)
    const { title, content, status } = req.body;
    const featuredImgPath = req.file?.path;
    const userId = req.user._id;
    //   console.log(featuredImg)

    // Find post and check ownership
    const post = await Post.findOne({ slug });
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (!post.userId.equals(userId) && !req.user.isAdmin) {
        throw new ApiError(403, "Not authorized to update this post");
    }

    // Handle slug update if title changes
    let newSlug = post.slug;
    if (title && title !== post.title) {
        newSlug = title
            .toLowerCase()
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .replace(/\s+/g, '-');

        const slugExists = await Post.findOne({
            slug: newSlug,
            _id: { $ne: post.userId }
        });

        if (slugExists) {
            throw new ApiError(400, "A post with this title already exists");
        }
    }
    let featuredImg
    let featuredImgNew = null;
    if (featuredImgPath) {
        
        try {
            const uploadedImage = await uploadOnCloudinary(featuredImgPath);
            featuredImgNew = uploadedImage.url;
        } catch (error) {
            throw new ApiError(500, "Error uploading image");
        }
    }

    // Update post
    const updatedPost = await Post.findOneAndUpdate(
        { slug },
        {
            title: title || post.title,
            content: content || post.content,
            featuredImg : featuredImgNew || post.featuredImg,
            status: status || post.status,
            slug: newSlug
        },
        { new: true }
    )

    return res.status(200).json(
        new ApiResponse(200, updatedPost, "Post updated successfully")
    );
});


// const deletePost = asyncHandler(async (req, res) => {
//   const { slug } = req.params;
//   // console.log(slug)
//   const ownerId = req.user._id;

//   // const post = await Post.findOneAndDelete({ slug, owner: ownerId });
//   // if (!post) {
//   //   throw new ApiError(404, 'Post not found');
//   // }

//   const post = await Post.findOne({ slug });

//     // Check if the post exists
//     if (!post) {
//         throw new ApiError(404, 'Post not found');
//     }

//     // Check if the user is either the owner or an admin
//     if (!post.owner.equals(ownerId) && !req.user.isAdmin) {
//         throw new ApiError(403, 'Not authorized to delete this post');
//     }

//     await post.deleteOne();


//   return res.status(200).json(
//     new ApiResponse(200, post, 'Post deleted successfully')
//   );
// });

const deletePost = asyncHandler(async (req, res) => {
    const { slug } = req.params;
    const userId = req.user._id;
    
    console.log(slug)

    const post = await Post.findOne({ slug });
    console.log(post)
    if (!post) {
        throw new ApiError(404, "Post not found");
    }

    if (!post.userId.equals(userId) && !req.user.isAdmin) {
        throw new ApiError(403, "Not authorized to delete this post");
    }

    // Delete associated image from Cloudinary
    if (post.featuredImg) {
        try {
            // Extract public_id from Cloudinary URL and delete
            const publicId = post.featuredImg.split('/').pop().split('.')[0];
            await deleteFromCloudinary(publicId);
        } catch (error) {
            console.error("Error deleting image from Cloudinary:", error);
            // Continue with post deletion even if image deletion fails
        }
    }

    await post.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, post, "Post deleted successfully")
    );
});

export {
    createPost,
    getUserPosts,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
};