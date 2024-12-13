import React, { useEffect, useState } from 'react'
import service from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    // Add loading state
    const [loading, setLoading] = useState(true);
    // Add error state
    const [error, setError] = useState(null);

    const userStatus = useSelector((state) => state.auth.status);
    // console.log(userData)

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const response = await service.getPosts();
            // Check if response has documents property
            if (response) {
                setPosts(response);
            } else {
                setPosts([]);
            }
            // console.log(response)
        } catch (error) {
            console.error('Error fetching posts:', error);
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    // console.log("At HOme")
    // console.log(posts)
            

    // Show loading state
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold">
                                Loading posts...
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold text-red-600">
                                {error}
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (!userStatus) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => {
                        // console.log(post)
                        return (
                            <div key={post._id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    )
}

export default Home