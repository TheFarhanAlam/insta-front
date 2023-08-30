import React, { useEffect, useState, useContext } from 'react';
import {UserContext} from "../../App"
import axios from "axios";
import { Link } from 'react-router-dom';

const Home = () => {
  const [postData, setPostData] = useState([]);
  const {state, dispatch} = useContext(UserContext);
  let likes;
  useEffect(() => {
    async function getAllPost() {
      const {data} = await axios.get("https://insta-backend-acuk.onrender.com/post/allpost", {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      setPostData(data.post);
    };
    getAllPost();
  }, []);
  const likePost = async (_id)  => {
    try {
      const {data} = await axios.put("https://insta-backend-acuk.onrender.com/post/like", {
        postId: _id
      }, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const unlikePost = async (_id)  => {
    try {
      const {data} = await axios.put("https://insta-backend-acuk.onrender.com/post/unlike", {
        postId: _id
      }, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const commentPost = async (text, _id) => {
    try {
      const {data} = await axios.put("https://insta-backend-acuk.onrender.com/post/comment", {
        postId: _id,
        text: text
      }, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const deletePost = async (_id) => {
    try {
      const {data} = await axios.delete(`https://insta-backend-acuk.onrender.com/post/delete/${_id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    // <!-- component -->
    <>
    {
      postData ? <>
      
<div class="bg-gray-100 w-screen h-full p-4">
    {postData.map((post) => {
      likes = post.likes.length;
      return (
        <>
        {postData ? <>
        
        <div class="bg-white border rounded-sm max-w-md mx-auto mb-5">
        <div class="flex items-center px-4 py-3">
          <Link to={state._id === post.postedBy._id ? `/profile` : `/user/${post.postedBy._id}`}>
          <img class="h-8 w-8 rounded-full" src={post.postedBy.profilePic}/>
          </Link>
          <div class="ml-3 ">
            <span class="text-sm font-semibold antialiased block leading-tight">{post.postedBy.name}</span>
            <span class="text-gray-600 text-xs block">Asheville, North Carolina</span>
          </div>
        </div>
        <img src={post.photo}/>
        <div class="flex items-center justify-between mx-4 mt-3 mb-2">
          <div class="flex gap-5">
            {post.likes.includes(state._id) ? <>
            <svg onClick={() => {unlikePost(post._id);}} fill="red" height="24" viewBox="0 0 48 48" width="24" className='cursor-pointer'><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            </>: <>
            <svg onClick={() => {likePost(post._id);}} fill="black" height="24" viewBox="0 0 48 48" width="24" className='cursor-pointer'><path d="M34.6 6.1c5.7 0 10.4 5.2 10.4 11.5 0 6.8-5.9 11-11.5 16S25 41.3 24 41.9c-1.1-.7-4.7-4-9.5-8.3-5.7-5-11.5-9.2-11.5-16C3 11.3 7.7 6.1 13.4 6.1c4.2 0 6.5 2 8.1 4.3 1.9 2.6 2.2 3.9 2.5 3.9.3 0 .6-1.3 2.5-3.9 1.6-2.3 3.9-4.3 8.1-4.3m0-3c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5.6 0 1.1-.2 1.6-.5 1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
            </>}
            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path clip-rule="evenodd" d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z" fill-rule="evenodd"></path></svg>
            <svg fill="#262626" height="24" viewBox="0 0 48 48" width="24"><path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path></svg>
          </div>
          {post.postedBy._id == state._id && <>
          <div className='cursor-pointer' onClick={() => deletePost(post._id)} class="flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>

          </div>
          </>}
        </div>
        <div class="font-semibold text-sm mx-4 mt-2">{likes} likes</div>
        <div className='flex flex-col gap-2 p-4'>
          <p>{post.title}</p>
          <p>{post.body}</p>
          {
            post.comments.map((record) => {
              return (
                <>
                <div className='flex'>
                <p><span className='font-bold'>{record.postedBy.name}</span> <span>{record.text}</span></p>
                </div>
                </>
              )
            })
          }
          <form onSubmit={(event) => {
            event.preventDefault();
            commentPost(event.target[0].value, post._id);
          }} action="">
            <input className='items-center outline-none w-full border-b' type="text" placeholder='Comment here' />
          </form>
        </div>
    </div>
        </> : null}
        </>
      )
    })}
</div>
      </> : null
    }
    </>
  )
}

export default Home