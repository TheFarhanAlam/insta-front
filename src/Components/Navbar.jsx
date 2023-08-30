import React, { useContext } from 'react'
import {Link} from "react-router-dom"
import {UserContext} from "../App"

const Navbar = () => { 
  const {state, dispatch} = useContext(UserContext);
  dispatch({type: "USER", payload: JSON.parse(localStorage.getItem('user'))})
  const renderList = () => {
    if (state) {
      return [
        <>
        <Link to={"/profile"} className='p-4'>Profile</Link>
        <Link to={"/createpost"} className='p-4'>Create Post</Link>
        <Link to={"/subscribedpost"} className='p-4'>My Followings</Link>
        <Link to={"/login"} onClick={() => {localStorage.clear(); dispatch({type: "CLEAR"});}} className='p-4'>Logout</Link>
        </>
      ]
    }else { 
      return [
        <>
         <Link to={"/login"} class="inline-block bg-blue-500 px-2 py-1 text-white font-semibold text-sm rounded" href="#">Log In</Link>
         <Link to={"/register"} class="inline-block text-blue-500 font-semibold text-sm" href="#">Sign Up</Link>
        </>
      ]
    };
  };
  return (
    <>
  <nav class="border-b px-4 py-2 bg-white p-10">
  <div class="flex flex-wrap items-center justify-between md:justify-around">
    {/* <!-- logo --> */}
    <Link to={state ? "/" : "/login"}>
    <img class="h-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/150px-Instagram_logo.svg.png" alt="instagram" />
    </Link>

    {/* <!-- search--> */}
    <div class="relative hidden sm:block text-gray-500">
      <input class="search-bar max-w-xs border rounded bg-gray-200 px-4
            text-center outline-none focus:border-gray-400" type="search" placeholder="Search" />
      <i class="fa fa-search absolute top-0 left-0 ml-12 mt-1"></i>
    </div>

    <div class="space-x-4" key={1}>
     {renderList()}
    </div>
  </div>
</nav>
  </>
  )
}

export default Navbar