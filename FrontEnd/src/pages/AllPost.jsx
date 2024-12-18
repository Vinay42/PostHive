// import React, { useState, useEffect } from 'react'
// import { Container, PostCard } from '../components'
// import appwriteService from "../appwrite/config";
// import { Loader2, PenBox } from 'lucide-react'
// import { useNavigate } from 'react-router-dom'

// function AllPosts() {
//     const [posts, setPosts] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)
//     const navigate = useNavigate()
//     // useEffect(() => {
//     //     // Fetch posts when component mounts
//     //     const fetchPosts = async () => {
//     //         try {
//     //             const response = await appwriteService.getUserPosts();
//     //             if (response) {
//     //                 setPosts(response);
//     //                 // console.log(posts)
//     //             }
//     //         } catch (error) {
//     //             console.error("Error fetching posts:", error);
//     //             setPosts([]); // Set empty array in case of error
//     //         }
//     //     };

//     //     fetchPosts();
//     // }, []); // Empty dependency array means this runs once on mount

//     // useEffect(() => {
//     //     const fetchPosts = async () => {
//     //         // Fetch current user
//     //         const user = await service.getCurrentUser();
//     //         console.log(user)
//     //         if (user) {
//     //             const userId = user.$id;
//     //             console.log(userId)
//     //             // Fetch posts created by the current user
//     //             const response = await appwriteService.getUserPosts(userId);
//     //             if (response) {
//     //                 console.log(response)
//     //                 setPosts(response.documents);
//     //             }
//     //         } else {
//     //             console.log("User not logged in");
//     //         }
//     //     };

//     //     fetchPosts();
//     // }, []);

//     // posts.forEach(post => {
//     //     console.log(post.featuredImg);
//     // });
    
//     useEffect(() => {
//       const fetchPosts = async () => {
//           try {
//               setLoading(true)
//               const response = await appwriteService.getUserPosts()
//               if (response) {
//                   setPosts(response)
//               } else {
//                   setPosts([])
//               }
//           } catch (error) {
//               console.error("Error fetching posts:", error)
//               setError("Failed to fetch posts")
//               setPosts([])
//           } finally {
//               setLoading(false)
//           }
//       }

//       fetchPosts()
//   }, [])

//   // Loading State
//   if (loading) {
//     return (
//         <div className='w-full py-8 min-h-screen flex items-center justify-center'>
//             <div className='text-center'>
//                 <Loader2 className='mx-auto animate-spin mb-4' size={48} />
//                 <p className='text-xl font-semibold text-gray-700'>
//                     Loading your posts...
//                 </p>
//             </div>
//         </div>
//     )
// }

// // Error State
// if (error) {
//     return (
//         <div className='w-full py-8 min-h-screen flex items-center justify-center'>
//             <div className='text-center'>
//                 <AlertCircle className='mx-auto text-red-500 mb-4' size={48} />
//                 <p className='text-xl font-semibold text-red-600'>
//                     {error}
//                 </p>
//             </div>
//         </div>
//     )
// }
    
//     return (
//         <div className='w-full py-8'>
//             <Container>
//                 {/* <div className='flex flex-wrap'>
//                     {posts.map((post) => {
//                         // console.log("hii: ",posts)
//                         return (<div key={post._id} className='p-2 w-1/4'>
//                             <PostCard {...post} />
//                         </div>)
//                     })}
//                 </div> */}
//                 {posts.length > 0 ? (
//           <div className="flex flex-wrap">
//             {posts.map((post) => (
//               <div key={post._id} className="p-2 w-1/4">
//                 <PostCard {...post} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-64">
//             <p className="text-xl text-black font-bold">
//               You have not created any posts yet. Start by creating a new post!
//             </p>
//           </div>
//         )}
//             </Container>
//         </div>
//     )
// }

// export default AllPosts

import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"
import { Loader2, PenBox } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const response = await appwriteService.getUserPosts()
                if (response) {
                    setPosts(response)
                } else {
                    setPosts([])
                }
            } catch (error) {
                console.error("Error fetching posts:", error)
                setError("Failed to fetch posts")
                setPosts([])
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()

            window.scrollTo(0, 0);


    }, [])

    // Loading State
    if (loading) {
        return (
            <div className='w-full py-8 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <Loader2 className='mx-auto animate-spin mb-4' size={48} />
                    <p className='text-xl font-semibold text-gray-700'>
                        Loading your posts...
                    </p>
                </div>
            </div>
        )
    }

    // Error State
    if (error) {
        return (
            <div className='w-full py-8 min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <AlertCircle className='mx-auto text-red-500 mb-4' size={48} />
                    <p className='text-xl font-semibold text-red-600'>
                        {error}
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className='w-full py-8 bg-blue-100 min-h-screen'>
            <Container>
                {posts.length > 0 ? (
                    <div>
                        {/* Section Header */}
                        <div className='mb-8 text-center'>
                            <h1 className='text-3xl font-bold text-gray-800 mb-2'>
                                My Posts
                            </h1>
                            <p className='text-gray-600'>
                                {posts.length} {posts.length === 1 ? 'post' : 'posts'} created
                            </p>
                        </div>

                        {/* Posts Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                            {posts.map((post) => (
                                <div key={post._id} className='flex justify-center'>
                                    <PostCard 
                                        {...post} 
                                        className='w-full max-w-[300px]'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-96 text-center bg-white rounded-lg shadow-md p-6">
                    
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            No Posts Yet
                        </h2>
                        <p className="text-gray-600 mb-6">
                            You haven't created any posts. Start sharing your thoughts!
                        </p>
                        <button 
                            onClick={() => navigate('/add-post')}
                            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors flex items-center space-x-2"
                        >
                            <PenBox size={20} />
                            <span>Create First Post</span>
                        </button>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default AllPosts