"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

// Professional SVG Icons
const SparklesIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v1m0 16v1m-8-9H3m18 0h-1M5.6 5.6l.7.7m12.4 12.4l.7.7M5.6 18.4l.7-.7m12.4-12.4l.7-.7" />
        <circle cx="12" cy="12" r="4" />
    </svg>
);

const TrendingUpIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }

            // Store token in localStorage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect based on role
            const dashboardPath = `/dashboard/${data.user.role}`;
            router.push(dashboardPath);
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPage}>
            <div className={styles.authContainer}>
                <div className={styles.authCard}>
                    <div className={styles.authHeader}>
                        <Link href="/" className={styles.logo}>
                            <LogoIcon />
                            <span>InternTrack</span>
                        </Link>
                        <h1 className={styles.authTitle}>Welcome back</h1>
                        <p className={styles.authSubtitle}>Sign in to continue tracking your internship journey</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.authForm}>
                        {error && <div className={styles.errorMessage}>{error}</div>}

                        <div className={styles.formGroup}>
                            <label htmlFor="email" className={styles.formLabel}>
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password" className={styles.formLabel}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className={styles.authFooter}>
                        <p>
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className={styles.authLink}>
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>

                <div className={styles.authVisual}>
                    <div className={styles.visualContent}>
                        <h2>Track your internship journey with AI</h2>
                        <p>Log activities, get smart suggestions, and connect with your team.</p>
                        <div className={styles.visualCards}>
                            <div className={`${styles.visualCard} ${styles.cardMint}`}>
                                <SparklesIcon /> AI Suggestions
                            </div>
                            <div className={`${styles.visualCard} ${styles.cardPeach}`}>
                                <TrendingUpIcon /> Progress Tracking
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function LogoIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    );
}
