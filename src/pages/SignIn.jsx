import React from "react";
import { useForm } from "react-hook-form";

const SignIn = () => {
    const { register, handleSubmit, reset } = useForm();

    const signInOnSubmit = async (data, e) => {
        // e.preventDefault();
        const formData = JSON.stringify(data);
        console.log(formData)
        try {
            const res = await fetch('http://localhost:3000/sign-in', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: formData,
            });
            const signInData = await res.json();
            console.log(signInData)
            reset();
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <>
            <form method="post" onSubmit={handleSubmit(signInOnSubmit)}>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" {...register("username")}></input>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" {...register("password")}></input>

                <button type="submit">Log In</button>
            </form>
        </>
    )
}

export default SignIn;