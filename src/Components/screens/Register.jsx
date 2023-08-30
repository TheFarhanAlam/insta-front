import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [image, setImage] = useState("");
    const [url, setUrl] = useState("");
    const Navigate = useNavigate();
    const handleChange = () => {
        const {name, value} = event.target;
        setUserData((prevVal) => {
            return {
                ...prevVal,
                [name]: value
            }
        });
    };
    useEffect(() => {
        async function Post() {
          if (url) {
            event.preventDefault();
            const {data} = await axios.post("https://insta-backend-acuk.onrender.com/register", {
              name: userData.name,
              email: userData.email,
              password: userData.password,
              url: url
            });
            console.log(data);
            Navigate("/login");
          };
        };
        Post();
      }, [url]);
    const uploadPic = async () => {
        try {
            const data = new FormData();
            data.append("file", image);
            data.append("upload_preset", "kpxvxpxd");
            const res = await axios.post("https://api.cloudinary.com/v1_1/mgk/image/upload", data);
            setUrl(res.data.url);
        } catch (error) {
            toast(error.response.data.error);
            console.log(error);
        }
      };
      console.log(image);
    const registerUser = async () => {
        try {
            if (image) {
                event.preventDefault();
                uploadPic();
            }else {
                event.preventDefault();
                const {name, email, password} = userData;
                const {data} = await axios.post("https://insta-backend-acuk.onrender.com/register", {
                    name: name,
                    email: email,
                    password: password
                });
                Navigate("/login");
            }
        } catch (error) {
            toast(error.response.data.error);
            console.log(error);
        }
    };
  return (
    <div class="h-screen bg-gray-50 flex flex-col justify-center items-center">
    <div class="bg-white border border-gray-300 w-80 py-8 flex items-center flex-col mb-3">
    
        <h1 class="bg-no-repeat instagram-logo"></h1>
        <form onSubmit={registerUser} class="mt-8 w-64 flex flex-col">
            <input value={userData.name} name='name' onChange={handleChange} autofocus
                   class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="name" placeholder="Name" type="text" />
            <input value={userData.email} name='email' onChange={handleChange} autofocus
                   class="text-xs w-full mb-2 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="email" placeholder="Phone number, username, or email" type="email" />
            <input value={userData.password} name='password' onChange={handleChange} autofocus
                   class="text-xs w-full mb-4 rounded border bg-gray-100 border-gray-300 px-2 py-2 focus:outline-none focus:border-gray-400 active:outline-none"
                   id="password" placeholder="Password" type="password" />
                    <input onChange={(event) => setImage(event.target.files[0])} class="title bg-gray-100 border item border-gray-300 p-2 mb-4 outline-none" spellcheck="false" type="file" />
                   <button type='submit' className=' text-sm text-center bg-blue-500 text-white py-1 rounded font-medium"'>
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
    </div>
    <div class="bg-white border border-gray-300 text-center w-80 py-4">
        <span class="text-sm">Already have an account?</span>
        <a class="text-blue-500 text-sm font-semibold"><Link to={"/login"}>Log in</Link></a>
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

export default Register