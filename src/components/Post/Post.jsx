import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";
import Comments from "./Comments";

const Post = () => {
    const { register, handleSubmit } = useForm();
    const [post, setPost] = useState();
    const [errors, setErrors] = useState('');
    const [redirect, setRedirect] = useState();
    const { id } = useParams();
    const { loggedIn, token, user } = useAuthContext();
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const req = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const postData = await req.json();

            if (req.status !== 200) {
                setPost()
            } else {
                setPost(postData['post'])
                console.log(postData['post'].comments)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const convertTimestamp = (timestamp) => {
        let alteredTimestamp = new Date(timestamp).toDateString();
        return (alteredTimestamp);
    }

    useEffect(() => {
        fetchPost()
        setRedirect()
    }, [])

    return (
        <>
            {redirect}
            <Navbar />
            {post !== undefined ?
                <div key={post._id} className="blog-post-container">
                    <h1 className="title">{post.title}</h1>
                    <div className="header">
                        <div className="username">By {post.user.username}</div>
                        <div className="timestamp">{convertTimestamp(post.timestamp)}</div>
                    </div>
                    <div className="body">
                        <div className="content">{post.content}</div>
                    </div>
                    <Comments post={post} fetchPost={fetchPost} />

                </div>
                :
                <div>Not Found</div>}
        </>
    )
}

export default Post;