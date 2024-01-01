import React, {useState} from "react";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { loggedIn, user, token } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <div>Home Page</div>
            {loggedIn ?
                <div>
                    <div>{user.username}</div>
                    <div>{token}</div>
                    <button onClick={() => navigate('/log-out')}>Log Out</button>
                </div> :
                <div>
                    <button onClick={() => navigate('/sign-in')}>Sign In</button>
                </div>}
        </>
    )
}

export default Home;