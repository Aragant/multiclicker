"use client";

import { useState } from "react";
import StringValidator from "../service/stringValidator";

export default function RegistrationPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [usernameExistsError, setUsernameExistsError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const resetErrors = () => {
        setUsernameError(false);
        setEmailError(false);
        setPasswordError(false);
        setUsernameExistsError(false);
        setEmailExistsError(false);
    };

    const handleResponseErrors = (errorType: string) => {
        if (errorType === "username") {
            setUsernameError(true);
        } else if (errorType === "username_exists") {
            setUsernameExistsError(true);
        } else if (errorType === "email") {
            setEmailError(true);
        } else if (errorType === "email_exists") {
            setEmailExistsError(true);
        } else if (errorType === "password") {
            setPasswordError(true);
        }
    };

    const handleErrorValidator = () => {
        if (!username) {
            setUsernameError(true);
        }
        if (!email || !StringValidator.isEmail(email)) {
            setEmailError(true);
        }
        if (!password || !StringValidator.isPassword(password)) {
            setPasswordError(true);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        resetErrors();
        handleErrorValidator();

        event.preventDefault();

        const userData = {
            username,
            email,
            password,
        };

        try {
            const response = await fetch(
                `${process.env.MULTICLICKER_API_URL}/user`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            if (response.ok) {
                console.log("User created successfully");
            } else {
                const errorData: { type: string } = await response.json();
                handleResponseErrors(errorData.type);
            }
        } catch (error) {
            console.error("Error creating user", error);
        }
    };

    const me = async () => {
        try {
            const response = await fetch(
                `${process.env.MULTICLICKER_API_URL}/user/me`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error("Error fetching me", error);
        }
    };

    const signInWithGoogle = async () => {
        window.location.href = `${process.env.MULTICLICKER_API_URL}/google/login`;
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <h1>Registration Page</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 text-black"
            >
                <div>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                    />
                    <p
                        className="text-red-500"
                        style={{ display: usernameError ? "block" : "none" }}
                    >
                        Please enter a username.
                    </p>
                    <p
                        className="text-red-500"
                        style={{
                            display: usernameExistsError ? "block" : "none",
                        }}
                    >
                        Username already exists.
                    </p>
                </div>
                <div>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                        placeholder="Email"
                    />
                    <p
                        className="text-red-500"
                        style={{ display: emailError ? "block" : "none" }}
                    >
                        Please a valid email.
                    </p>
                    <p
                        className="text-red-500"
                        style={{ display: emailExistsError ? "block" : "none" }}
                    >
                        Email already exists.
                    </p>
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                    />
                    <p
                        className="text-red-500"
                        style={{ display: passwordError ? "block" : "none" }}
                    >
                        Password must have at least 8 characters and contain at
                        least one uppercase letter, one lowercase letter and one
                        digit.
                    </p>
                </div>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    type="submit"
                >
                    S&apos;inscrire
                </button>
            </form>

            <div className="px-6 sm:px-0 max-w-sm">
                <button
                    onClick={() => signInWithGoogle()}
                    type="button"
                    className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between mr-2 mb-2"
                >
                    <svg
                        className="mr-2 -ml-1 w-4 h-4"
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fab"
                        data-icon="google"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 488 512"
                    >
                        <path
                            fill="currentColor"
                            d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        ></path>
                    </svg>
                    Sign up with Google<div></div>
                </button>
            </div>

            <div>
                <button onClick={() => me()}>
                        me
                </button>
            </div>
        </div>
    );
}
