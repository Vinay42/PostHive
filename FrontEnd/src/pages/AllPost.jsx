import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        // Fetch posts when component mounts
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getUserPosts();
                if (response) {
                    setPosts(response);
                    // console.log(posts)
                }
            } catch (error) {
                console.error("Error fetching posts:", error);
                setPosts([]); // Set empty array in case of error
            }
        };

        fetchPosts();
    }, []); // Empty dependency array means this runs once on mount

    // useEffect(() => {
    //     const fetchPosts = async () => {
    //         // Fetch current user
    //         const user = await service.getCurrentUser();
    //         console.log(user)
    //         if (user) {
    //             const userId = user.$id;
    //             console.log(userId)
    //             // Fetch posts created by the current user
    //             const response = await appwriteService.getUserPosts(userId);
    //             if (response) {
    //                 console.log(response)
    //                 setPosts(response.documents);
    //             }
    //         } else {
    //             console.log("User not logged in");
    //         }
    //     };

    //     fetchPosts();
    // }, []);

    // posts.forEach(post => {
    //     console.log(post.featuredImg);
    // });
    return (
        <div className='w-full py-8'>
            <Container>
                {/* <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        // console.log("hii: ",posts)
                        return (<div key={post._id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>)
                    })}
                </div> */}
                {posts.length > 0 ? (
          <div className="flex flex-wrap">
            {posts.map((post) => (
              <div key={post._id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64">
            <p className="text-xl text-black font-bold">
              You have not created any posts yet. Start by creating a new post!
            </p>
          </div>
        )}
            </Container>
        </div>
    )
}

export default AllPosts