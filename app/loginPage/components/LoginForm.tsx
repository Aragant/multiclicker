"use client";

import { useEffect, useState } from "react";
import { login } from "../../services/authService";
import { Lock, Mail } from "lucide-react";
import Spinner from "@/app/components/Spinner";
import Storage from "@/app/utils/Storage";
import Link from "next/link";

interface LoginFormProps {
    onSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
    const [error, setError] = useState("");
    const [animate, setAnimate] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [focusedInput, setFocusedInput] = useState<string | null>(null)

    useEffect(() => {
        setAnimate(true)
    }, [])

    const handleSubmitLoginForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setIsLoading(true)
        const formData = new FormData(event.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const result = await login(username, password);

        if (result.success) {
            Storage.save(result.user.id, result.user.guild_id);
            onSuccess();
        } else {
            setIsLoading(false)
            setError(result.message);
        }
    };

    return (
        <span>
            <span className="space-y-1 text-center relative z-10 truc">
                <div
                    className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center icon-container"
                    style={{
                        animation: "iconEnter 0.6s ease forwards",
                    }}
                >
                    <Lock className="h-6 w-6 text-white" />
                </div>

                <div className={`stagger-container ${animate ? "animate" : ""}`}>
                    <div className="stagger-item">
                        <h3 className="text-2xl font-bold tracking-tight">Bienvenue</h3>
                    </div>

                    <div className="stagger-item">
                        <p>Connectez-vous à votre compte pour continuer</p>
                    </div>
                </div>
            </span>
            <span className="space-y-4 relative z-10">
                <form onSubmit={handleSubmitLoginForm} className={`stagger-container ${animate ? "animate" : ""}`}>
                    <div className="space-y-4">
                        <div className="space-y-2 stagger-item">
                            <div className={`relative input-container ${focusedInput === "email" ? "focused" : ""}`}>
                                <div
                                    className={`absolute left-3 top-3 h-5 w-5 text-muted-foreground input-icon ${focusedInput === "email" ? "focused" : ""}`}
                                >
                                    <Mail className="h-5 w-5" />
                                </div>
                                <input
                                    type="name"
                                    placeholder="Name"
                                    name="username"
                                    className="pl-10 h-12 rounded-xl transition-all duration-200"
                                    style={{
                                        boxShadow: focusedInput === "email" ? "0 0 0 2px rgba(139, 92, 246, 0.3)" : "none",
                                    }}
                                    onFocus={() => setFocusedInput("email")}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2 stagger-item">
                            <div className={`relative input-container ${focusedInput === "password" ? "focused" : ""}`}>
                                <div
                                    className={`absolute left-3 top-3 h-5 w-5 text-muted-foreground input-icon ${focusedInput === "password" ? "focused" : ""}`}
                                >
                                    <Lock className="h-5 w-5" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Mot de passe"
                                    name="password"
                                    className="pl-10 h-12 rounded-xl transition-all duration-200"
                                    style={{
                                        boxShadow: focusedInput === "password" ? "0 0 0 2px rgba(139, 92, 246, 0.3)" : "none",
                                    }}
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)}
                                    required
                                />
                            </div>

                            <div className="text-right">
                                <Link
                                    href="#"
                                    className="text-sm text-violet-600 hover:text-violet-700 font-medium transition-transform duration-200 inline-block hover:translate-x-1"
                                >
                                    Mot de passe oublié?
                                </Link>
                            </div>
                        </div>

                        {error && (
                            <div className="text-red-500">
                                {error}
                            </div>
                        )}

                        <div className="stagger-item">
                            <button
                                type="submit"
                                className="w-full  h-12 rounded-xl text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 button-scale"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="spinner">
                                        <Spinner />
                                    </div>
                                ) : (
                                    "Se connecter"
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </span>
        </span>
    );
};

export default LoginForm;