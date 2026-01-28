"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../dashboard.module.css";

// SVG Icons
function HomeIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
    );
}

function ClipboardIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
    );
}

function TrendingUpIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
        </svg>
    );
}

function UsersIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}

function SparklesIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
        </svg>
    );
}

function FileTextIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" /><path d="M12 1v6m0 6v10M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M1 12h6m6 0h10M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
        </svg>
    );
}

function LogOutIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    );
}

function BrainIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
            <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
            <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
            <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
            <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
            <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
            <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
            <path d="M6 18a4 4 0 0 1-1.967-.516" />
            <path d="M19.967 17.484A4 4 0 0 1 18 18" />
        </svg>
    );
}

function CheckCircleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function AlertCircleIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
    );
}

function ArrowLeftIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
        </svg>
    );
}

function ZapIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}

// Types
interface TaskSummary {
    id: string;
    title: string;
    description: string;
    status: string;
    subtaskCount: number;
    documentedCount: number;
    assignedToName?: string;
    createdByName?: string;
}

interface DetailedFeedback {
    taskTitle: string;
    subtaskTitle: string;
    score: number;
    feedback: string;
}

interface Analysis {
    summary: string;
    overallScore: number;
    strengths: string[];
    improvements: string[];
    detailedFeedback: DetailedFeedback[];
    documentationCount: number;
    taskTitle: string;
}

export default function AIInsightsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [tasks, setTasks] = useState<TaskSummary[]>([]);
    const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [error, setError] = useState("");

    // Fetch task list
    const fetchTasks = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("/api/ai/analyze", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks || []);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to fetch tasks");
            }
        } catch (err) {
            console.error("Error fetching tasks:", err);
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Analyze specific task
    const analyzeTask = async (taskId: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setSelectedTaskId(taskId);
        setAnalyzing(true);
        setAnalysis(null);
        setError("");

        try {
            const response = await fetch(`/api/ai/analyze?taskId=${taskId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAnalysis(data.analysis);
            } else {
                const data = await response.json();
                setError(data.error || "Failed to analyze task");
            }
        } catch (err) {
            console.error("Error analyzing task:", err);
            setError("Network error. Please try again.");
        } finally {
            setAnalyzing(false);
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            router.push("/login");
            return;
        }

        fetchTasks();
    }, [router, fetchTasks]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleBack = () => {
        setSelectedTaskId(null);
        setAnalysis(null);
        setError("");
    };

    const getScoreColor = (score: number) => {
        if (score >= 80) return "#10b981";
        if (score >= 60) return "#f59e0b";
        return "#ef4444";
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return "Excellent";
        if (score >= 60) return "Good";
        if (score >= 40) return "Needs Improvement";
        return "Poor";
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed": return "#10b981";
            case "in-progress": return "#f59e0b";
            default: return "#6b7280";
        }
    };

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.dashboardLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>
                    <LogoIcon />
                </div>
                <nav className={styles.sidebarNav}>
                    <Link href="/dashboard/student" style={{ textDecoration: "none" }}>
                        <NavItem icon={<HomeIcon />} label="Dashboard" />
                    </Link>
                    <NavItem icon={<ClipboardIcon />} label="Tasks" />
                    <NavItem icon={<TrendingUpIcon />} label="Progress" />
                    <NavItem icon={<UsersIcon />} label="Connections" />
                    <NavItem icon={<SparklesIcon />} label="AI Insights" active />
                    <NavItem icon={<FileTextIcon />} label="Reports" />
                </nav>
                <div className={styles.sidebarFooter}>
                    <NavItem icon={<SettingsIcon />} label="Settings" />
                    <button onClick={handleLogout} className={styles.navItem}>
                        <LogOutIcon />
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                <header className={styles.mainHeader}>
                    <div className={styles.greeting}>
                        <div style={{ marginBottom: "var(--space-3)" }}>
                            {selectedTaskId ? (
                                <button className="btn btn--ghost" onClick={handleBack} style={{ padding: "var(--space-1) var(--space-2)" }}>
                                    <ArrowLeftIcon /> Back to Tasks
                                </button>
                            ) : (
                                <Link href="/dashboard/student" className="btn btn--ghost" style={{ padding: "var(--space-1) var(--space-2)" }}>
                                    <ArrowLeftIcon /> Dashboard
                                </Link>
                            )}
                        </div>
                        <h1 className={styles.greetingTitle} style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                            <BrainIcon /> AI Documentation Insights
                        </h1>
                        <p className={styles.greetingSubtitle}>
                            {selectedTaskId ? "Analyzing your documentation..." : "Select a task to get AI feedback"}
                        </p>
                    </div>
                </header>

                {error && (
                    <div style={{
                        padding: "var(--space-4)",
                        backgroundColor: "rgba(239, 68, 68, 0.1)",
                        borderRadius: "var(--radius-lg)",
                        color: "#ef4444",
                        marginBottom: "var(--space-4)"
                    }}>
                        {error}
                    </div>
                )}

                {/* Task Selection View */}
                {!selectedTaskId && (
                    <>
                        <div style={{ marginBottom: "var(--space-4)" }}>
                            <p style={{ color: "var(--color-text-secondary)" }}>
                                Choose a task below to receive AI-powered feedback on your documentation quality.
                            </p>
                        </div>

                        {tasks.length === 0 ? (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>
                                    <ClipboardIcon />
                                </div>
                                <h3 className={styles.emptyTitle}>No tasks available</h3>
                                <p className={styles.emptyText}>
                                    You need tasks with documentation to analyze.
                                </p>
                            </div>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                {tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className={styles.taskCard}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => analyzeTask(task.id)}
                                    >
                                        <div className={styles.taskCardHeader}>
                                            <span className={styles.taskTitle}>{task.title}</span>
                                            <span style={{
                                                padding: "var(--space-1) var(--space-2)",
                                                borderRadius: "var(--radius-full)",
                                                backgroundColor: `${getStatusColor(task.status)}20`,
                                                color: getStatusColor(task.status),
                                                fontSize: "var(--font-size-xs)",
                                                textTransform: "capitalize"
                                            }}>
                                                {task.status.replace("-", " ")}
                                            </span>
                                        </div>
                                        {task.description && (
                                            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
                                                {task.description}
                                            </p>
                                        )}
                                        <div className={styles.taskMeta}>
                                            <span>
                                                <FileTextIcon /> {task.documentedCount}/{task.subtaskCount} documented
                                            </span>
                                            {task.createdByName && (
                                                <span>By: {task.createdByName}</span>
                                            )}
                                            <button
                                                className="btn btn--primary"
                                                style={{ marginLeft: "auto", padding: "var(--space-2) var(--space-4)" }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    analyzeTask(task.id);
                                                }}
                                                disabled={task.documentedCount === 0}
                                            >
                                                <ZapIcon /> Analyze
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* Loading State */}
                {analyzing && (
                    <div style={{
                        padding: "var(--space-8)",
                        textAlign: "center",
                        backgroundColor: "var(--color-background)",
                        borderRadius: "var(--radius-xl)"
                    }}>
                        <div className={styles.spinner} style={{ margin: "0 auto var(--space-4)" }}></div>
                        <h3 style={{ marginBottom: "var(--space-2)" }}>Analyzing Documentation</h3>
                        <p style={{ color: "var(--color-text-secondary)" }}>
                            AI is reviewing your work and generating personalized feedback...
                        </p>
                    </div>
                )}

                {/* Analysis Results */}
                {analysis && !analyzing && (
                    <>
                        {/* Score Overview */}
                        <div className={styles.quickStats} style={{ marginBottom: "var(--space-6)" }}>
                            <div className={styles.statCard} style={{ flex: 2 }}>
                                <div style={{
                                    width: "80px",
                                    height: "80px",
                                    borderRadius: "50%",
                                    background: `conic-gradient(${getScoreColor(analysis.overallScore)} ${analysis.overallScore}%, var(--color-background-alt) 0)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginRight: "var(--space-4)"
                                }}>
                                    <div style={{
                                        width: "60px",
                                        height: "60px",
                                        borderRadius: "50%",
                                        backgroundColor: "var(--color-surface)",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: "column"
                                    }}>
                                        <span style={{ fontSize: "var(--font-size-xl)", fontWeight: 700 }}>
                                            {analysis.overallScore}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <h3 style={{ marginBottom: "var(--space-1)" }}>
                                        {getScoreLabel(analysis.overallScore)}
                                    </h3>
                                    <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)" }}>
                                        Overall Documentation Score
                                    </p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={`${styles.statIcon} ${styles.bgMint}`}>
                                    <ClipboardIcon />
                                </div>
                                <div className={styles.statContent}>
                                    <h3>{analysis.taskTitle}</h3>
                                    <p>Task Analyzed</p>
                                </div>
                            </div>
                            <div className={styles.statCard}>
                                <div className={`${styles.statIcon} ${styles.bgLavender}`}>
                                    <FileTextIcon />
                                </div>
                                <div className={styles.statContent}>
                                    <h3>{analysis.documentationCount}</h3>
                                    <p>Docs Reviewed</p>
                                </div>
                            </div>
                        </div>

                        {/* Summary */}
                        <div style={{
                            padding: "var(--space-5)",
                            backgroundColor: "var(--color-background)",
                            borderRadius: "var(--radius-xl)",
                            marginBottom: "var(--space-6)"
                        }}>
                            <h3 style={{ marginBottom: "var(--space-3)", display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                                <BrainIcon /> AI Summary
                            </h3>
                            <p style={{ color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                                {analysis.summary}
                            </p>
                        </div>

                        {/* Strengths & Improvements */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-4)", marginBottom: "var(--space-6)" }}>
                            {/* Strengths */}
                            <div style={{
                                padding: "var(--space-5)",
                                backgroundColor: "var(--color-background)",
                                borderRadius: "var(--radius-xl)",
                                borderLeft: "4px solid #10b981"
                            }}>
                                <h3 style={{ marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-2)", color: "#10b981" }}>
                                    <CheckCircleIcon /> Strengths
                                </h3>
                                {analysis.strengths && analysis.strengths.length > 0 ? (
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {analysis.strengths.map((strength, i) => (
                                            <li key={i} style={{
                                                padding: "var(--space-2) 0",
                                                color: "var(--color-text-secondary)",
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "var(--space-2)"
                                            }}>
                                                <span style={{ color: "#10b981" }}>✓</span>
                                                {strength}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: "var(--color-text-muted)" }}>No specific strengths identified yet.</p>
                                )}
                            </div>

                            {/* Areas to Improve */}
                            <div style={{
                                padding: "var(--space-5)",
                                backgroundColor: "var(--color-background)",
                                borderRadius: "var(--radius-xl)",
                                borderLeft: "4px solid #f59e0b"
                            }}>
                                <h3 style={{ marginBottom: "var(--space-4)", display: "flex", alignItems: "center", gap: "var(--space-2)", color: "#f59e0b" }}>
                                    <AlertCircleIcon /> Areas to Improve
                                </h3>
                                {analysis.improvements && analysis.improvements.length > 0 ? (
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {analysis.improvements.map((improvement, i) => (
                                            <li key={i} style={{
                                                padding: "var(--space-2) 0",
                                                color: "var(--color-text-secondary)",
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: "var(--space-2)"
                                            }}>
                                                <span style={{ color: "#f59e0b" }}>→</span>
                                                {improvement}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p style={{ color: "var(--color-text-muted)" }}>No improvements suggested.</p>
                                )}
                            </div>
                        </div>

                        {/* Detailed Feedback */}
                        {analysis.detailedFeedback && analysis.detailedFeedback.length > 0 && (
                            <div>
                                <h3 style={{ marginBottom: "var(--space-4)" }}>Detailed Feedback by Subtask</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-3)" }}>
                                    {analysis.detailedFeedback.map((feedback, i) => (
                                        <div key={i} style={{
                                            padding: "var(--space-4)",
                                            backgroundColor: "var(--color-background)",
                                            borderRadius: "var(--radius-xl)"
                                        }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-2)" }}>
                                                <strong>{feedback.subtaskTitle}</strong>
                                                <span style={{
                                                    padding: "var(--space-1) var(--space-3)",
                                                    borderRadius: "var(--radius-full)",
                                                    backgroundColor: `${getScoreColor(feedback.score)}20`,
                                                    color: getScoreColor(feedback.score),
                                                    fontWeight: 600,
                                                    fontSize: "var(--font-size-sm)"
                                                }}>
                                                    {feedback.score}/100
                                                </span>
                                            </div>
                                            <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-sm)", margin: 0 }}>
                                                {feedback.feedback}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </main>
        </div>
    );
}

// Helper Components
function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <div className={`${styles.navItem} ${active ? styles.navItemActive : ""}`} title={label}>
            {icon}
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
