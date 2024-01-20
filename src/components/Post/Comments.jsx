import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const Comments = (props) => {
    const { post, fetchPost } = props;
    const { register, handleSubmit } = useForm();
    const [errors, setErrors] = useState('');
    const { id } = useParams();
    const { loggedIn, token, user } = useAuthContext();
    const navigate = useNavigate();

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

    const deleteOnClick = async (comment) => {
        console.log(id)
        try {
            // Delete request to server
            const req = await fetch(`http://localhost:3000/posts/${id}/comments/${comment._id}?postid=${id}&id=${comment._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${token}`,
                },
            });
            const commentData = await req.json();
            console.log(commentData);

            if (req.status == 200) {
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


    return (
        <>
            {post !== undefined ?
                <div className="comments">
                    <h2>Comments</h2>
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
                            <div className="comment" key={comment._id}>
                                <div className="header">
                                    <div>{comment.user.username}</div>
                                    <div>{convertTimestamp(comment.timestamp)}</div>
                                </div>
                                <div>{comment.content}</div>
                                {user && comment.user._id == user._id ?
                                    <button className="delete" onClick={() => deleteOnClick(comment)}>Delete</button> :
                                    ''}

                            </div>
                        )
                    }) : ''}
                </div> : ''}
        </>
    )
}

export default Comments;