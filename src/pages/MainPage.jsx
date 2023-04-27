import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPosts } from '../store/slices/post/postSlice'
import Popular from '../components/Popular'
import Post from '../components/Post'

const MainPage = () => {

  const dispatch = useDispatch()
  const {posts,popularPosts} = useSelector((state) => state.post)

  useEffect(()=>{
    dispatch(getAllPosts())
  },[dispatch])

  if (!posts.length) {
    return (
        <div className='text-xl text-center text-white py-10'>
            Постов не существует.
        </div>
    )
}

let popularPosts2= [{title: 'ssdsdsd'}, {title: 'ssdsd12121212sd'},]

    console.log(popularPosts)

  return (
    <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='flex flex-col gap-10 basis-4/5'>
                {posts?.map((post, i) => (
                        <Post key={i} post={post} />
                    ))}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>
                        Популярное:
                    </div>
                    {
                        popularPosts.length > 0? popularPosts?.map((post, i) => (
                            <Popular key={i} post={post} />
                        )) : 'нет постов'
                    }
                   
                    
                </div>
            </div>
        </div>
  )
}

export default MainPage