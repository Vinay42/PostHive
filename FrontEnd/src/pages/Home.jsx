import React, { useEffect, useState } from 'react'
import service from "../appwrite/config";
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux';
import { Loader2, AlertCircle } from 'lucide-react'

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
        window.scrollTo(0, 0);
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

      // Loading State Component
      const LoadingState = () => (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full h-64 flex flex-col items-center justify-center">
                        <Loader2 className="animate-spin mb-4" size={48} />
                        <h1 className="text-2xl font-bold text-gray-700">
                            Loading posts...
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );

     // Error State Component
     const ErrorState = () => (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full h-64 flex flex-col items-center justify-center">
                        <AlertCircle className="text-red-600 mb-4" size={48} />
                        <h1 className="text-2xl font-bold text-red-600">
                            {error}
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );

    // Login Prompt Component
    const LoginPrompt = () => (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full h-64 flex items-center justify-center">
                        <h1 className="text-2xl font-bold text-gray-700 hover:text-gray-500 transition-colors">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    );
            

    // Show loading state
    // if (loading) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full h-64 flex items-center justify-center">
    //                         <h1 className="text-2xl font-bold ">
    //                             Loading posts...
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     );
    // }

    // // Show error state
    // if (error) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full h-64 flex items-center justify-center">
    //                         <h1 className="text-2xl font-bold text-red-600 h-64">
    //                             {error}
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     );
    // }

    // if (!userStatus) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full h-64 flex items-center justify-center">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Login to read posts
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }

    // Render loading state
    if (loading) return <LoadingState />;

    // Render error state
    if (error) return <ErrorState />;

    // Render login prompt if not authenticated
    if (!userStatus) return <LoginPrompt />;

    return (
        <div className='w-full py-8 bg-blue-100'>
            <Container>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {posts.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <h2 className="text-2xl font-semibold text-gray-600">
                                No posts available
                            </h2>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <div 
                                key={post._id} 
                                className='flex justify-center'
                            >
                                <PostCard 
                                    {...post}
                                    className="w-full max-w-[300px] h-full"
                                />
                            </div>
                        ))
                    )}

                </div>
            </Container>
        </div>
    )
}

export default Home