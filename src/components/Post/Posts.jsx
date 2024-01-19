import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../styles/Post.css'

const Posts = () => {
    const { loggedIn, user, token } = useAuthContext();
    const navigate = useNavigate();
    const [allPosts, setAllPosts] = useState();

    const fetchPosts = async () => {
        try {
            // GET request to server 
            const req = await fetch('http://localhost:3000/posts', {
                method: "GET",
            });
            const signInData = await req.json();
            setAllPosts(signInData['allBlogPosts'])

        } catch (err) {
            console.log(err)
        }
    }

    const convertTimestamp = (timestamp) => {
        let alteredTimestamp = new Date(timestamp).toDateString();
        return (alteredTimestamp);
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
            <div className="blog-posts-div">
                {(allPosts) ? allPosts.map((post) => {
                    return (
                        <div key={post._id} className="blog-post-div">
                            <div className="header">
                                <div className="username">{post.user.username}</div>
                                <div className="timestamp">{convertTimestamp(post.timestamp)}</div>
                            </div>
                            <div className="body">
                                <div className="title">{post.title}</div>
                                <div className="content">{post.content}</div>
                            </div>
                        </div>
                    )
                }) : ''
                }
            </div>
        </>
    )
}

export default Posts;