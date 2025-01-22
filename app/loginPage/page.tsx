"use client";

import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    console.log(formData);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("username", username);
    formDataToSend.append("password", password);

    try {
      const response = await fetch("http://localhost:9999/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formDataToSend.toString(),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.detail || "Login failed");
      } else {
        const data = await response.json();
        console.log(data);
        setSuccess("Login successful!");
      }
    } catch (err) {
      setError("An error occurred while logging in" + err);
    }

    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Login Page</h1>
      <form onSubmit={handleSubmitLoginForm} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2 text-black">
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Password" name="password" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      {error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      {success && (
        <p
          style={{
            color: "green",
          }}
        >
          {success}
        </p>
      )}
    </div>
  );
}
