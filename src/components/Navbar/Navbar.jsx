import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const { loggedIn, user, token } = useAuthContext();
    const navigate = useNavigate();

    return (
        <>
            <div>Blog</div>
            {loggedIn ?
                <div>
                    <button onClick={() => navigate('/log-out')}>Log Out</button>
                </div> :
                <div>
                    <button onClick={() => navigate('/sign-in')}>Sign In</button>
                    <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                </div>}
        </>
    )
}

export default Navbar;