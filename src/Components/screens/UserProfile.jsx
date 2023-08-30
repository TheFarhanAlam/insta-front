import React, { useEffect, useState, useContext } from 'react'
import axios from "axios"
import {UserContext} from "../../App"
import {Link, useParams} from "react-router-dom"

const UserProfile = () => {
  const [profileData, setProfileData] = useState();
  const [profileInfo, setProfileInfo] = useState([]);
  const {id} = useParams();
  const {state, dispatch} = useContext(UserContext);
  const [showfollow,setShowFollow] = useState(state?!state.following.includes(id):true)
//   console.log(id);
  useEffect(() => {
    async function getProfileData() {
      try {
        // console.log("hello");
        const {data} = await axios.get(`https://insta-backend-acuk.onrender.com/user/${id}`, {
          headers: {
            Authorization: localStorage.getItem("jwt")
          }
        });
        setProfileData(data.user);
        setProfileInfo(data.allInfo);
      } catch (error) {
        console.log(error);
      }
    }
    getProfileData();
  }, []);

  const followUser = async () => {
    try {
      const {data} = await axios.put("https://insta-backend-acuk.onrender.com/user/follow", {
        followId: id
      }, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const unfollowUser = async () => {
    try {
      const {data} = await axios.put("https://insta-backend-acuk.onrender.com/user/unfollow", {
        followId: id
      }, {
        headers: {
          Authorization: localStorage.getItem("jwt")
        }
      });
       
      dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
      localStorage.setItem("user",JSON.stringify(data))
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
//   console.log(profileData.name);
  return (

    <>
    {profileData ? <>
<main class="bg-gray-100 bg-opacity-25">

  <div class="lg:w-8/12 lg:mx-auto mb-8">

    <header class="flex flex-wrap items-center p-4 md:py-8">

      <div class="md:w-3/12 md:ml-16">
        {/* <!-- profile image --> */}
        <img class="w-20 h-20 md:w-40 md:h-40 object-cover rounded-full
                     border-2 border-pink-600 p-1" src={profileData.profilePic} alt="profile" />
      </div>

      {/* <!-- profile meta --> */}
      <div class="w-8/12 md:w-7/12 ml-4">
        <div class="md:flex md:flex-wrap md:items-center mb-4">
          <h2 class="text-3xl inline-block font-light md:mr-2 mb-2 sm:mb-0">
            {profileData.name}
          </h2>

          {/* <!-- badge --> */}
          <span class="inline-block fas fa-certificate fa-lg text-blue-500 
                               relative mr-6 text-xl transform -translate-y-2" aria-hidden="true">
            <i class="fas fa-check text-white text-xs absolute inset-x-0
                               ml-1 mt-px"></i>
          </span>

          {/* <!-- follow button --> */}
          {
            showfollow ? <>
            <Link onClick={followUser} className="bg-blue-500 px-2 py-1 
            text-white font-semibold text-sm rounded block text-center 
            sm:inline-block block">Follow</Link>
            </>
            : 
            <>
            <Link onClick={unfollowUser} className="ml-2 bg-blue-500 px-2 py-1 
            text-white font-semibold text-sm rounded block text-center 
            sm:inline-block block">Unfollow</Link>
            
            </>
          }
  
        </div>

        {/* <!-- post, following, followers list for medium screens --> */}
        <ul class="hidden md:flex space-x-8 mb-4">
          <li>
            <span class="font-semibold">{profileInfo.length} </span>

            posts
          </li>

          <li>
            <span class="font-semibold">{profileData.follower.length} </span> 
            followers
          </li>
          <li>
            <span class="font-semibold">{profileData.following.length} </span>
            following
          </li>
        </ul>

        {/* <!-- user meta form medium screens --> */}
        <div class="hidden md:block">
          <h1 class="font-semibold"></h1>
          <span>Travel, Nature and Music</span>
          <p>Lorem ipsum dolor sit amet consectetur</p>
        </div>

      </div>

      {/* <!-- user meta form small screens --> */}
      <div class="md:hidden text-sm my-2">
        <h1 class="font-semibold">Mr Travlerrr...</h1>
        <span>Travel, Nature and Music</span>
        <p>Lorem ipsum dolor sit amet consectetur</p>
      </div>

    </header>

    {/* <!-- posts --> */}
    <div class="px-px md:px-3">

      {/* <!-- user following for mobile only --> */}
      <ul class="flex md:hidden justify-around space-x-8 border-t 
                text-center p-2 text-gray-600 leading-snug text-sm">
        <li>
          <span class="font-semibold text-gray-800 block">136</span>
          posts
        </li>

        <li>
          <span class="font-semibold text-gray-800 block">40.5k</span>
          followers
        </li>
        <li>
          <span class="font-semibold text-gray-800 block">302</span>
          following
        </li>
      </ul>

      {/* <!-- insta freatures --> */}
      <ul class="flex items-center justify-around md:justify-center space-x-12  
                    uppercase tracking-widest font-semibold text-xs text-gray-600
                    border-t">
        {/* <!-- posts tab is active --> */}
        <li class="md:border-t md:border-gray-700 md:-mt-px md:text-gray-700">
          <a class="inline-block p-3" href="#">
            <i class="fas fa-th-large text-xl md:text-xs"></i>
            <span class="hidden md:inline">post</span>
          </a>
        </li>
        <li>
          <a class="inline-block p-3" href="#">
            <i class="far fa-square text-xl md:text-xs"></i>
            <span class="hidden md:inline">igtv</span>
          </a>
        </li>
        <li>
          <a class="inline-block p-3" href="#">
            <i class="fas fa-user border border-gray-500
                             px-1 pt-1 rounded text-xl md:text-xs"></i>
            <span class="hidden md:inline">tagged</span>
          </a>
        </li>
      </ul>
      <div>
        <div className='w-[20%] flex'>
        {
          profileInfo.map((profile) => {
            return (
              <>
              <img src={profile.photo} className='p-5' />
              </>
            )
          })
        }
        </div>
      </div>
    </div>
  </div>
</main>
    </> : null}
    {/* // <!-- nav --> */}

    </>
  )
}

export default UserProfile


