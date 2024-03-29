import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../styles/Navbar.css';

const Navbar = () => {
    const { loggedIn } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <div className="navbar">
                <button onClick={() => navigate('/')}>Blog</button>
                {loggedIn ?
                    <div>
                        <button onClick={() => navigate('/log-out')}>Log Out</button>
                    </div> :
                    <div>
                        <button onClick={() => navigate('/sign-in')}>Sign In</button>
                        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                    </div>}
            </div>
        </>
    )
}

export default Navbar;