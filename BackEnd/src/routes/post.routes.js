import { Router } from "express";
import {
  createPost,
  getUserPosts,
  getAllPosts,
  updatePost,
  deletePost,
  getPost
} from "../controllers/post.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/posts")
  .post(verifyJWT, upload.single("featuredImg"), createPost)
  .get(getAllPosts);

router.route("/get-post/:slug").get(getPost)  

router.route("/my-posts")
  .get(verifyJWT, getUserPosts);

router.route("/posts/:slug")
  .patch(verifyJWT, upload.single("featuredImg"), updatePost)
  .delete(verifyJWT, deletePost);

export default router;