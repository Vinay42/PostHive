import React, {useState, useEffect} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import service from '../appwrite/auth';

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        // Fetch posts when component mounts
        const fetchPosts = async () => {
            try {
                const response = await appwriteService.getUserPosts();
                if (response) {
                    setPosts(response);
                    console.log(posts)
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
            <div className='flex flex-wrap'>
                {posts.map((post) => {
                    // console.log("hii: ",posts)
                   return (<div key={post._id} className='p-2 w-1/4'>
                        <PostCard {...post} />
                    </div>)
})}
            </div>
            </Container>
    </div>
  )
}

export default AllPosts