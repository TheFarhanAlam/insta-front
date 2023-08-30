import React, { createContext, useEffect, useReducer, useContext } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from "./Components/screens/Home"
import Login from "./Components/screens/Login"
import Register from "./Components/screens/Register"
import Profile from "./Components/screens/Profile"
import CreatePost from './Components/screens/CreatePost'
import {reducer, initialState} from "./reducer/userReducer"
import UserProfile from './Components/screens/UserProfile'
import SubscribedUserPost from './Components/screens/SubscribedUserPost'

export const UserContext = createContext();

const Routing = () => {
  const Navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      // Navigate("/");
    }else {
      Navigate("/login");
    }
  }, [])
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/subscribedpost" element={<SubscribedUserPost />} />
      </Routes>
    </>
  )
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
      <Navbar />
      <Routing />
    </UserContext.Provider>
    
    </>
  )
}

export default App