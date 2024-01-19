import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Posts from "../components/Post/Posts";

const Home = () => {
    const { loggedIn, user, token } = useAuthContext();
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState();
    return (
        <>
            <Navbar />
            <Posts />
        </>
    )
}

export default Home;