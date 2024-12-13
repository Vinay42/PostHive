import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const userId = userData?.userData?._id;
    // console.log("userdata :::: ",userData.userData._id)
    // console.log(post.userId)
    const isAuthor = post && userId ? post.userId === userData.userData._id : false;
    // console.log(isAuthor)
    // console.log(userData)

    useEffect(() => {
        if (!userData) {
            navigate("/");
            return;
        }
        if (slug) {
            service.getPost(slug).then((post) => {
                // console.log(post)
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate, userData]);

    const deletePost = async () => {
        try {
            await service.deletePost(post.slug); // Make sure `service.deletePost` returns a promise
            navigate("/"); // Navigate to the home page after successful deletion
        } catch (error) {
            console.log("Error at delete: ", error);
        }
    };

    return post ? (
        <div className="py-8">
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImg}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}