import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";

const Home = () => {
    const { loggedIn, user, token } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div>Home Page</div>
        </>
    )
}

export default Home;