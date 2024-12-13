import React from 'react'
import service from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({slug, title, featuredImg}) {
    console.log("In PostCard : ",{slug,title,featuredImg})
  return (
    <Link to={`/post/${slug}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={featuredImg} alt={title}
                className='rounded-xl' />
                
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard