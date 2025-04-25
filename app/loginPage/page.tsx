"use client";

import Card from "../components/card";
import LoginForm from "./components/LoginForm";
import "./login.css";
import { useState, useEffect, useRef } from "react"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const handleLoginSuccess = () => {
    window.location.href = "/game";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Login Page</h1>
      <Card className="border-none shadow-xl overflow-hidden gnassss">
        <div
          className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-indigo-500/10"
          style={{
            background: isLoading
              ? "linear-gradient(to right, rgba(139, 92, 246, 0.2), rgba(99, 102, 241, 0.2))"
              : "linear-gradient(to right, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.1))",
            transition: "background 0.5s ease",
          }}
        />
        <LoginForm onSuccess={handleLoginSuccess} />
      </Card>
    </div>
  );
}
