import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import {UserContext} from "../../App"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const [userData, setUserData] = useState({
        email: "",
        password: ""
    });
    const Navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);
    const handleChange = () => {
        const {name, value} = event.target;
        setUserData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        });
    };
    const loginUser = async () => {
        try {
            event.preventDefault();
            const {email, password} = userData;
            const {data} = await axios.post("https://insta-backend-acuk.onrender.com/login", {
                email: email,
                password: password
            });
            console.log(data);
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            dispatch({type: "USER", payload: data.user});
            Navigate("/");
        } catch (error) {
            toast(error.response.data.error);
            console.log(error);
        }
    };
  return (
    <div class="h-screen bg-gray-50 flex flex-col justify-center items-center">
    <div class="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
    
        <h1 class="bg-no-repeat instagram-logo"></h1>
        <form onSubmit={loginUser} class="mt-8 w-64 flex flex-col">
            <input value={userData.email} name='email' onChange={handleChange} autofocus
                   class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="email" placeholder="Phone number, username, or email" type="text" />
            <input value={userData.password} name='password' onChange={handleChange} autofocus
                   class="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="password" placeholder="Password" type="password" />
                   <button type='submit' className=" text-sm text-center bg-blue-500 text-white py-1 rounded font-medium" >
                Log In
                   </button>
        </form>
        <div class="flex justify-evenly space-x-2 w-64 mt-4">
            <span class="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
            <span class="flex-none uppercase text-xs text-gray-400 font-semibold">or</span>
            <span class="bg-gray-300 h-px flex-grow t-2 relative top-2"></span>
        </div>
        <button class="mt-4 flex">
            <div class="bg-no-repeat facebook-logo mr-1"></div>
            <span class="text-xs text-blue-900 font-semibold">Log in with Facebook</span>
        </button>
        <a class="text-xs text-blue-900 mt-4 cursor-pointer -mb-4">Forgot password?</a>
    </div>
    <div class="bg-white border border-gray-300 text-center w-80 py-4">
        <span class="text-sm">Don't have an account?</span>
        <a class="text-blue-500 text-sm font-semibold"><Link to={"/register"}>Register</Link></a>
    </div>
    <div class="mt-3 text-center">
        <span class="text-xs">Get the app</span>
        <div class="flex mt-3 space-x-2">
            <div class="bg-no-repeat apple-store-logo"></div>
            <div class="bg-no-repeat google-store-logo"></div>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}

export default Login