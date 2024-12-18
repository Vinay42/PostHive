import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default  function Post() {
    const [post, setPost] = useState(null);
    const [isAuthor, setIsAuthor] = useState(false);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData =  useSelector((state) => state.auth.userData);
    // const userId = userData?.userData?._id;
    // console.log("userdata :::: ",userData.userData._id)
    // console.log(post.userId)
    // let isAuthor
    // if (userData?.userData?.isAdmin) {
    //     isAuthor = true
    // } else {
    //     isAuthor = post && userId ? post.userId === userData.userData._id : false;
    // }

    // const isAuthor = useMemo(() => {
    //     // If user is an admin, always allow edit/delete
    //     if (userData?.userData?.isAdmin) return true;

    //     // Check if the current user is the post's author
    //     if (!post || !userData?.userData?._id) return false;

    //     return post.userId === userData.userData._id;
    // }, [post, userData]);

    // console.log(isAuthor)
    // console.log(userData)

    // useEffect(() => {
    //     if (!userData) {
    //         navigate("/");
    //         return;
    //     }
    //     if (slug) {
    //         service.getPost(slug).then((post) => {
    //             // console.log(post)
    //             if (post) setPost(post);
    //             else navigate("/");
    //         });
    //     } else navigate("/");
    // }, [slug, navigate, userData]);

    useEffect(() => {
        // Function to check author status
        const checkAuthorStatus = () => {
            // If user is an admin, always allow edit/delete
            if (userData?.isAdmin) {
                setIsAuthor(true);
                return true;
            }

            // console.log("userdata ::  ",userData?.isAdmin)
            // console.log("post: ",post)

            // Check if the current user is the post's author
            if (!post || !userData?._id) {
                setIsAuthor(false);
                return false;
            }

            const authorStatus = post.userId === userData._id;
            setIsAuthor(authorStatus);
            return authorStatus;
        };

        // If no user is logged in, redirect to home
        if (!userData) {
            navigate("/");
            return;
        }

        // Fetch post if slug exists
        if (slug) {
            service.getPost(slug).then((fetchedPost) => {
                if (fetchedPost) {
                    setPost(fetchedPost);
                    // Check author status after post is set
                    checkAuthorStatus();
                } else {
                    navigate("/");
                }
            }).catch((error) => {
                console.error("Error fetching post:", error);
                navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate, userData, post]);

    const deletePost = async () => {
        try {
            await service.deletePost(post.slug); // Make sure `service.deletePost` returns a promise
            navigate("/"); // Navigate to the home page after successful deletion
        } catch (error) {
            console.log("Error at delete: ", error);
        }
    };

    return post ? (
        <div className="py-8 flex justify-center">
            <div className="flex flex-col items-center max-w-7xl mx-auto px-4 ">
                <div className="flex max-w-xs justify-center items-center mb-4 relative border rounded-xl p-2">
                    <img
                        src={post.featuredImg}
                        alt={post.title}
                        className="rounded-xl"
                    />

                    {isAuthor && (
                        <div className="absolute right-3 bottom-3 ">
                            <Link to={`/edit-post/${post.slug}`}>
                                <Button bgColor="bg-green-500" className="mr-1">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-full mb-6 text-center">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                    </div>
                    <div className="browser-css">
                        {parse(post.content)}
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}