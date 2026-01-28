"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface User {
    id: string;
    email: string;
    name: string;
    role: "student" | "faculty" | "supervisor";
    uniqueId: string;
    profileImage?: string;
    connections?: string[];
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
    logout: () => void;
    refreshUser: () => Promise<void>;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    role: "student" | "faculty" | "supervisor";
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check for existing session on mount
    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
            // Verify token is still valid
            verifyToken(storedToken);
        } else {
            setLoading(false);
        }
    }, []);

    const verifyToken = async (currentToken: string) => {
        try {
            const response = await fetch("/api/auth/verify", {
                headers: {
                    Authorization: `Bearer ${currentToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                localStorage.setItem("user", JSON.stringify(data.user));
            } else {
                // Token invalid, clear session
                logout();
            }
        } catch (error) {
            console.error("Token verification failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, error: data.error };
            }

            setToken(data.token);
            setUser(data.user);
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            return { success: true };
        } catch (error) {
            return { success: false, error: "An error occurred" };
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                return { success: false, error: result.error };
            }

            setToken(result.token);
            setUser(result.user);
            localStorage.setItem("token", result.token);
            localStorage.setItem("user", JSON.stringify(result.user));

            return { success: true };
        } catch (error) {
            return { success: false, error: "An error occurred" };
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const refreshUser = async () => {
        if (token) {
            await verifyToken(token);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

// HOC for protected routes
export function withAuth<P extends object>(
    Component: React.ComponentType<P>,
    allowedRoles?: ("student" | "faculty" | "supervisor")[]
) {
    return function ProtectedRoute(props: P) {
        const { user, loading } = useAuth();
        const router = useRouter();

        useEffect(() => {
            if (!loading && !user) {
                router.push("/login");
            } else if (!loading && user && allowedRoles && !allowedRoles.includes(user.role)) {
                router.push(`/dashboard/${user.role}`);
            }
        }, [user, loading, router]);

        if (loading) {
            return (
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: "var(--color-background)",
                }}>
                    <div>Loading...</div>
                </div>
            );
        }

        if (!user) {
            return null;
        }

        return <Component {...props} />;
    };
}
