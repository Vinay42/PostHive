// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import appwriteService from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             slug: post?.$id || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();
//     const userData = useSelector((state) => state.auth.userData);

//     const submit = async (data) => {
//         if (post) {
//             const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

//             if (file) {
//                 appwriteService.delteFile(post.featuredImg);
//             }

//             const dbPost = await appwriteService.updatePost(post.$id, {
//                 ...data,
//                 featuredImg: file ? file.$id : undefined,
//             });

//             if (dbPost) {
//                 navigate(`/post/${dbPost.$id}`);
//             }
//         } else {
//             const file = await appwriteService.uploadFile(data.image[0]);

//             if (file) {
//                 const fileId = file.$id;
//                 data.featuredImg = fileId;
//                 const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

//                 if (dbPost) {
//                     navigate(`/post/${dbPost.$id}`);
//                 }
//             }
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: true })}
//                 />
//                 <Input
//                     label="Slug :"
//                     placeholder="Slug"
//                     className="mb-4"
//                     {...register("slug", { required: true })}
//                     onInput={(e) => {
//                         setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
//                     }}
//                 />
//                 <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
//             </div>
//             <div className="w-1/3 px-2">
//             {/* { console.log("hey   :  ",post)} */}
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post && (
//                     <div className="w-full mb-4">
//                         {/* { console.log("hey   :  ",post)} */}
//                         <img
//                             src={appwriteService.getFilePreview(post.featuredImg)}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: true })}
//                 />
//                 <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }


// import React, { useCallback } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import service from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";

// export default function PostForm({ post }) {
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//         },
//     });

//     const navigate = useNavigate();

//     const submit = async (data) => {
//         try {
//             let response;
//             const formData = {
//                 title: data.title,
//                 content: data.content,
//                 status: data.status,
//                 featuredImg: data.image?.[0] || null
//             };

//             if (post) {
//                 response = await service.updatePost(post.slug, formData);
//                 toast.success("Post updated successfully!");
//             } else {
//                 response = await service.createPost(formData);
//                 toast.success("Post created successfully!");
//             }

//             if (response) {
//                 navigate(`/post/${response.slug}`);
//             }
//         } catch (error) {
//             console.error("Form submission error:", error);
//             toast.error(error.response?.data?.message || "An error occurred while saving the post");
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
//             <div className="w-2/3 px-2">
//                 <Input
//                     label="Title :"
//                     placeholder="Title"
//                     className="mb-4"
//                     {...register("title", { required: "Title is required" })}
//                 />
//                 <RTE 
//                     label="Content :" 
//                     name="content" 
//                     control={control} 
//                     defaultValue={getValues("content")}
//                     rules={{ required: "Content is required" }}
//                 />
//             </div>
//             <div className="w-1/3 px-2">
//                 <Input
//                     label="Featured Image :"
//                     type="file"
//                     className="mb-4"
//                     accept="image/png, image/jpg, image/jpeg, image/gif"
//                     {...register("image", { required: !post })}
//                 />
//                 {post?.featuredImg && (
//                     <div className="w-full mb-4">
//                         <img
//                             src={`${process.env.REACT_APP_BACKEND_URL}/uploads/${post.featuredImg}`}
//                             alt={post.title}
//                             className="rounded-lg"
//                         />
//                     </div>
//                 )}
//                 <Select
//                     options={["active", "inactive"]}
//                     label="Status"
//                     className="mb-4"
//                     {...register("status", { required: "Status is required" })}
//                 />
//                 <Button 
//                     type="submit" 
//                     bgColor={post ? "bg-green-500" : undefined} 
//                     className="w-full"
//                 >
//                     {post ? "Update" : "Submit"}
//                 </Button>
//             </div>
//         </form>
//     );
// }

// import React, { useCallback, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Button, Input, RTE, Select } from "..";
// import service from "../../appwrite/config";
// import { useNavigate } from "react-router-dom";
// import { ImagePlus, Loader2 } from "lucide-react";

// export default function PostForm({ post }) {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [previewImage, setPreviewImage] = useState(post?.featuredImg || null);
//     const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
//         defaultValues: {
//             title: post?.title || "",
//             content: post?.content || "",
//             status: post?.status || "active",
//             featuredImg: post?.featuredImg || "",
//         },
//     });
//     // console.log(post)

//     const navigate = useNavigate();

//     const submit = async (data) => {
//         // console.log("Form data before FormData:", data)
//         try {

//             const formData = new FormData();
//             // Append text fields
//             formData.append("title", data.title);
//             formData.append("content", data.content);
//             formData.append("status", data.status);

//             // Append file only if it exists
//             if (data.image?.[0]) {
//                 formData.append("featuredImg", data.image[0]);
//             }
//             // for (let pair of formData.entries()) {
//             //     console.log(pair[0], pair[1]);
//             // }
//             let response;
//             if (post) {
//                 response = await service.updatePost(post.slug, formData);
//                 // console.log("Post updated successfully");
//                 if (response) {
//                     navigate("/");
//                 }
//                 // console.log(response);
//             } else {
//                 // console.log(formData)
//                 response = await service.createPost(formData);
//                 // console.log(response)
//                 console.log("Post created successfully");
//                 if (response) {
//                     navigate(`/post/${response.slug}`);
//                 }
//             }


//         } catch (error) {
//             console.error("Form submission error:", error);
//             // You can add your own error handling here
//             // For example, you could set an error state and display it in the UI
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     const slugTransform = useCallback((value) => {
//         if (value && typeof value === "string")
//             return value
//                 .trim()
//                 .toLowerCase()
//                 .replace(/[^a-zA-Z\d\s]+/g, "-")
//                 .replace(/\s/g, "-");

//         return "";
//     }, []);

//     React.useEffect(() => {
//         const subscription = watch((value, { name }) => {
//             if (name === "title") {
//                 setValue("slug", slugTransform(value.title), { shouldValidate: true });
//             }
//         });

//         return () => subscription.unsubscribe();
//     }, [watch, slugTransform, setValue]);

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <form onSubmit={handleSubmit(submit)} className="flex flex-wrapgrid md:grid-cols-3 gap-6">
//                 <div className="md:col-span-2 space-y-6">
//                     <div>
//                         <Input
//                             label="Title"
//                             placeholder="Enter post title"
//                             className="w-full"
//                             {...register("title", {
//                                 required: "Title is required",
//                                 maxLength: {
//                                     value: 100,
//                                     message: "Title cannot exceed 100 characters"
//                                 }
//                             })}
//                             error={errors.title?.message}
//                         />
//                     </div>
//                     <RTE
//                         label="Content :"
//                         name="content"
//                         control={control}
//                         defaultValue={getValues("content")}
//                         rules={{ required: "Content is required" }}
//                     />
//                 </div>
//                 <div className="w-1/3 px-2">
//                     <Input
//                         label="Featured Image :"
//                         type="file"
//                         className="mb-4"
//                         accept="image/png, image/jpg, image/jpeg, image/gif"
//                         {...register("image", { required: !post })}
//                     />
//                     {post?.featuredImg && (
//                         <div className="w-full mb-4">
//                             <img
//                                 src={post.featuredImg}
//                                 alt={post.title}
//                                 className="rounded-lg"
//                             />
//                         </div>
//                     )}
//                     <Select
//                         options={["active", "inactive"]}
//                         label="Status"
//                         className="mb-4"
//                         {...register("status", { required: "Status is required" })}
//                     />
//                     <Button
//                         type="submit"
//                         bgColor={post ? "bg-blue-600" : undefined}
//                         className="w-full"
//                     >
//                         {post ? "Update" : "Submit"}
//                     </Button>
//                 </div>
//             </form>
//         </div>
//     );
// }

import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { ImagePlus, Loader2 } from "lucide-react";

export default function PostForm({ post }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState(post?.featuredImg || null);

    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "active",
            featuredImg: post?.featuredImg || "",
        },
    });

    const navigate = useNavigate();

    const submit = async (data) => {
        try {
            setIsSubmitting(true);
            
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("content", data.content);
            formData.append("status", data.status);
            
            if (data.image?.[0]) {
                formData.append("featuredImg", data.image[0]);
            }

            let response;
            if (post) {
                response = await service.updatePost(post.slug, formData);
                if (response) {
                    navigate("/");
                }
            } else {
                response = await service.createPost(formData);
                if (response) {
                    navigate(`/post/${response.slug}`);
                }
            }
        } catch (error) {
            console.error("Form submission error:", error);
            // Consider adding user-friendly error notification
        } finally {
            setIsSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    // Handle image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit(submit)} className="grid md:grid-cols-3 gap-6">
                {/* Left Column - Title and Content */}
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <Input
                            label="Title"
                            placeholder="Enter post title"
                            className="w-full"
                            {...register("title", { 
                                required: "Title is required",
                                maxLength: {
                                    value: 100,
                                    message: "Title cannot exceed 100 characters"
                                }
                            })}
                            error={errors.title?.message}
                        />
                    </div>
                    
                    <div>
                        <RTE 
                            label="Content" 
                            name="content" 
                            control={control} 
                            defaultValue={getValues("content")}
                            rules={{ 
                                required: "Content is required",
                                minLength: {
                                    value: 10,
                                    message: "Content must be at least 10 characters"
                                }
                            }}
                        />
                        {errors.content && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.content.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Right Column - Image and Settings */}
                <div className="md:col-span-1 space-y-6">
                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Featured Image
                        </label>
                        <div className="relative w-full aspect-video bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {previewImage ? (
                                <img 
                                    src={previewImage} 
                                    alt="Preview" 
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <div className="text-center">
                                    <ImagePlus 
                                        className="mx-auto mb-2 text-gray-400" 
                                        size={48} 
                                    />
                                    <p className="text-sm text-gray-500">
                                        Upload image
                                    </p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { 
                                    required: !post,
                                    onChange: handleImageChange
                                })}
                            />
                        </div>
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    {/* Status Selection */}
                    <div>
                        <Select
                            options={["active", "inactive"]}
                            label="Post Status"
                            className="w-full"
                            {...register("status", { required: "Status is required" })}
                            error={errors.status?.message}
                        />
                    </div>

                    {/* Submit Button */}
                    <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-2"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin mr-2" size={20} />
                                {post ? "Updating..." : "Submitting..."}
                            </>
                        ) : (
                            post ? "Update Post" : "Create Post"
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}