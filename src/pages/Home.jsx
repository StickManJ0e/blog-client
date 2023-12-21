import React from "react";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
    const { loggedIn, user, token } = useAuthContext();
    return (
        <>
            <div>Home Page</div>
            {loggedIn ?
                <div>
                    <div>{user.username}</div>
                    <div>{token}</div>
                </div> :
                <></>}
        </>
    )
}

export default Home;