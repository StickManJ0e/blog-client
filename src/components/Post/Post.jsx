import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import { useParams } from "react-router-dom";

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

    const commentOnSubmit = async (data, e) => {
        const formData = JSON.stringify(data);
        try {
            // POST request to server
            const req = await fetch(`http://localhost:3000/posts/${id}/comments?postid=${id}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                    'user._id': user._id,
                },
                body: formData,
            });
            const commentData = await req.json();
            console.log(commentData);

            if (req.status !== 200) {
                setErrors(commentData.errors[0].msg);
            } else {
                fetchPost()
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
                    <div className="header">
                        <div className="username">{post.user.username}</div>
                        <div className="timestamp">{convertTimestamp(post.timestamp)}</div>
                    </div>
                    <div className="body">
                        <div className="title">{post.title}</div>
                        <div className="content">{post.content}</div>
                    </div>
                    <div className="comments">
                        <div>Comments</div>
                        {loggedIn ?
                            <form method="post" onSubmit={handleSubmit(commentOnSubmit)}>
                                <label htmlFor="content"></label>
                                <input type="textbox" id="content" name="content" {...register("content")}></input>

                                <button type="submit">Comment</button>
                                <div>{errors}</div>
                            </form> :
                            <button onClick={() => navigate('/sign-in')}>Log in to comment</button>}
                        {post.comments.length > 0 ? post.comments.map((comment) => {
                            return (
                                <div className="comment">
                                    <div>{comment.user.username}</div>
                                    <div>{comment.content}</div>
                                </div>
                            )
                        }) : ''}
                    </div>

                </div>
                :
                <div>Not Found</div>}
        </>
    )
}

export default Post;