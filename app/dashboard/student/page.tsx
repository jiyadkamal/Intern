"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../dashboard.module.css";
import connectStyles from "./connect.module.css";

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

function PlusIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
        </svg>
    );
}

function ClockIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function CalendarIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
        </svg>
    );
}

function XIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function SaveIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
        </svg>
    );
}

// Types
interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    uniqueId: string;
}

interface Connection {
    id: string;
    requesterId: string;
    requesterEmail: string;
    requesterRole: string;
    targetId: string;
    targetEmail: string;
    targetRole: string;
    status: "pending" | "accepted" | "rejected";
    direction: "incoming" | "outgoing";
    createdAt: string;
    requesterName?: string;
    targetName?: string;
}

interface Subtask {
    id: string;
    title: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    documentation: string;
    documentedAt?: string;
}

interface Task {
    id: string;
    title: string;
    description: string;
    createdBy: string;
    createdByName: string;
    assignedTo: string;
    assignedToName: string;
    status: "pending" | "in-progress" | "completed";
    dueDate: string;
    createdAt: string;
    updatedAt: string;
    subtasks: Subtask[];
}

export default function StudentDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Connection states
    const [showConnectModal, setShowConnectModal] = useState(false);
    const [targetUniqueId, setTargetUniqueId] = useState("");
    const [connectLoading, setConnectLoading] = useState(false);
    const [connectError, setConnectError] = useState("");
    const [connectSuccess, setConnectSuccess] = useState("");
    const [incomingRequests, setIncomingRequests] = useState<Connection[]>([]);
    const [outgoingRequests, setOutgoingRequests] = useState<Connection[]>([]);
    const [acceptedConnections, setAcceptedConnections] = useState<Connection[]>([]);

    // Task states
    const [tasks, setTasks] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [editingSubtaskId, setEditingSubtaskId] = useState<string | null>(null);
    const [documentationText, setDocumentationText] = useState("");
    const [savingDoc, setSavingDoc] = useState(false);

    // Fetch connections
    const fetchConnections = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("/api/users/connect", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setIncomingRequests(
                    (data.incoming || []).filter((c: Connection) => c.status === "pending")
                );
                setOutgoingRequests(
                    (data.outgoing || []).filter((c: Connection) => c.status === "pending")
                );
                setAcceptedConnections(
                    (data.connections || []).filter((c: Connection) => c.status === "accepted")
                );
            }
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }, []);

    // Fetch tasks
    const fetchTasks = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setTasksLoading(true);
        try {
            const response = await fetch("/api/tasks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data.tasks || []);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
        } finally {
            setTasksLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        if (!storedUser || !token) {
            router.push("/login");
            return;
        }

        const userData = JSON.parse(storedUser);
        if (userData.role !== "student") {
            router.push(`/dashboard/${userData.role}`);
            return;
        }

        setUser(userData);
        setLoading(false);
        fetchConnections();
        fetchTasks();
    }, [router, fetchConnections, fetchTasks]);

    // Send connection request
    const handleConnect = async () => {
        if (!targetUniqueId.trim()) {
            setConnectError("Please enter a unique ID");
            return;
        }

        setConnectLoading(true);
        setConnectError("");
        setConnectSuccess("");

        const token = localStorage.getItem("token");

        try {
            const response = await fetch("/api/users/connect", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ targetUniqueId: targetUniqueId.trim() }),
            });

            const data = await response.json();

            if (!response.ok) {
                setConnectError(data.error || "Failed to send connection request");
            } else {
                setConnectSuccess(`Connection request sent to ${data.targetUser?.name || "user"}!`);
                setTargetUniqueId("");
                fetchConnections();
                setTimeout(() => {
                    setShowConnectModal(false);
                    setConnectSuccess("");
                }, 2000);
            }
        } catch (error) {
            setConnectError("Network error. Please try again.");
        } finally {
            setConnectLoading(false);
        }
    };

    // Handle connection response (accept/reject)
    const handleConnectionResponse = async (connectionId: string, action: "accept" | "reject") => {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch("/api/users/connect", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ connectionId, action }),
            });

            if (response.ok) {
                fetchConnections();
            }
        } catch (error) {
            console.error("Error responding to connection:", error);
        }
    };

    // Save documentation for a subtask
    const handleSaveDocumentation = async (taskId: string, subtaskId: string) => {
        const token = localStorage.getItem("token");
        setSavingDoc(true);

        try {
            const response = await fetch("/api/tasks", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    taskId,
                    subtaskId,
                    documentation: documentationText,
                    status: "in-progress"
                }),
            });

            if (response.ok) {
                fetchTasks();
                setEditingSubtaskId(null);
                setDocumentationText("");
                // Update selected task
                if (selectedTask) {
                    const updated = await response.json();
                    setSelectedTask(updated.task);
                }
            }
        } catch (error) {
            console.error("Error saving documentation:", error);
        } finally {
            setSavingDoc(false);
        }
    };

    // Toggle subtask completion
    const handleToggleSubtask = async (taskId: string, subtaskId: string, currentStatus: string) => {
        const token = localStorage.getItem("token");
        const newStatus = currentStatus === "completed" ? "in-progress" : "completed";

        try {
            const response = await fetch("/api/tasks", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    taskId,
                    subtaskId,
                    status: newStatus
                }),
            });

            if (response.ok) {
                fetchTasks();
                if (selectedTask) {
                    const updated = await response.json();
                    setSelectedTask(updated.task);
                }
            }
        } catch (error) {
            console.error("Error toggling subtask:", error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    };

    // Get task status class
    const getTaskStatusClass = (status: string) => {
        switch (status) {
            case "completed": return styles.taskStatusCompleted;
            case "in-progress": return styles.taskStatusInProgress;
            default: return styles.taskStatusPending;
        }
    };

    // Calculate task progress
    const getTaskProgress = (task: Task) => {
        const completed = task.subtasks.filter(st => st.status === "completed").length;
        return { completed, total: task.subtasks.length };
    };

    // Calculate overall stats
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === "completed").length;
    const pendingSubtasks = tasks.reduce((acc, t) => acc + t.subtasks.filter(st => st.status === "pending").length, 0);

    return (
        <div className={styles.dashboardLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>
                    <LogoIcon />
                </div>
                <nav className={styles.sidebarNav}>
                    <NavItem icon={<HomeIcon />} label="Dashboard" active />
                    <NavItem icon={<ClipboardIcon />} label="Tasks" />
                    <NavItem icon={<TrendingUpIcon />} label="Progress" />
                    <NavItem icon={<UsersIcon />} label="Connections" />
                    <Link href="/dashboard/ai-insights" style={{ textDecoration: "none" }}>
                        <NavItem icon={<SparklesIcon />} label="AI Insights" />
                    </Link>
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
                        <h1 className={styles.greetingTitle}>
                            {getGreeting()}, {user?.name?.split(" ")[0]}
                        </h1>
                        <p className={styles.greetingSubtitle}>
                            Your unique ID: <strong>{user?.uniqueId}</strong>
                        </p>
                    </div>
                    <div className={styles.headerActions}>
                        <button
                            className="btn btn--ghost"
                            onClick={() => setShowConnectModal(true)}
                        >
                            <UsersIcon /> Connect
                        </button>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className={styles.quickStats}>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgMint}`}>
                            <ClipboardIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{totalTasks}</h3>
                            <p>Assigned Tasks</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgPeach}`}>
                            <ClockIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{pendingSubtasks}</h3>
                            <p>Pending Subtasks</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgLavender}`}>
                            <CheckIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{completedTasks}</h3>
                            <p>Completed Tasks</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgPink}`}>
                            <UsersIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{acceptedConnections.length}</h3>
                            <p>Supervisors</p>
                        </div>
                    </div>
                </div>

                {/* Tasks Section */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Your Tasks</h2>
                </div>

                {tasksLoading ? (
                    <div className={styles.loadingState} style={{ minHeight: "200px" }}>
                        <div className={styles.spinner}></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <ClipboardIcon />
                        </div>
                        <h3 className={styles.emptyTitle}>No tasks assigned yet</h3>
                        <p className={styles.emptyText}>
                            {acceptedConnections.length === 0
                                ? "Connect with a supervisor to receive task assignments."
                                : "Your supervisor hasn't assigned any tasks yet."
                            }
                        </p>
                        {acceptedConnections.length === 0 && (
                            <button className="btn btn--primary" onClick={() => setShowConnectModal(true)}>
                                <PlusIcon /> Connect with Supervisor
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={styles.taskList}>
                        {tasks.map((task) => {
                            const { completed, total } = getTaskProgress(task);
                            const progressPercent = total > 0 ? (completed / total) * 100 : 0;

                            return (
                                <div
                                    key={task.id}
                                    className={styles.taskCard}
                                    onClick={() => setSelectedTask(task)}
                                >
                                    <div className={styles.taskCardHeader}>
                                        <span className={styles.taskTitle}>{task.title}</span>
                                        <span className={`${styles.taskStatus} ${getTaskStatusClass(task.status)}`}>
                                            {task.status.replace("-", " ")}
                                        </span>
                                    </div>
                                    {task.description && (
                                        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
                                            {task.description}
                                        </p>
                                    )}
                                    <div className={styles.taskMeta}>
                                        <span>By: {task.createdByName}</span>
                                        {task.dueDate && (
                                            <span><CalendarIcon /> {new Date(task.dueDate).toLocaleDateString()}</span>
                                        )}
                                        <span>{completed}/{total} subtasks done</span>
                                    </div>
                                    <div className={styles.taskProgress}>
                                        <div className={styles.taskProgressBar}>
                                            <div className={styles.taskProgressFill} style={{ width: `${progressPercent}%` }} />
                                        </div>
                                        <span className={styles.taskProgressText}>{Math.round(progressPercent)}%</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Right Panel */}
            <aside className={styles.rightPanel}>
                <RightPanelContent
                    user={user}
                    acceptedConnections={acceptedConnections}
                    incomingRequests={incomingRequests}
                    outgoingRequests={outgoingRequests}
                    onAccept={(id) => handleConnectionResponse(id, "accept")}
                    onReject={(id) => handleConnectionResponse(id, "reject")}
                />
            </aside>

            {/* Connect Modal */}
            {showConnectModal && (
                <div className={connectStyles.modalOverlay} onClick={() => setShowConnectModal(false)}>
                    <div className={connectStyles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={connectStyles.modalHeader}>
                            <h3>Connect with Supervisor</h3>
                            <button
                                className={connectStyles.closeBtn}
                                onClick={() => setShowConnectModal(false)}
                            >
                                ×
                            </button>
                        </div>
                        <div className={connectStyles.modalBody}>
                            <p className={connectStyles.modalDescription}>
                                Enter the unique ID of your supervisor to send a connection request.
                            </p>
                            <div className={connectStyles.inputGroup}>
                                <label htmlFor="targetId">Unique ID</label>
                                <input
                                    id="targetId"
                                    type="text"
                                    placeholder="e.g., SUP-789012"
                                    value={targetUniqueId}
                                    onChange={(e) => setTargetUniqueId(e.target.value)}
                                    className={connectStyles.input}
                                />
                            </div>
                            {connectError && (
                                <div className={connectStyles.errorMsg}>
                                    {connectError}
                                </div>
                            )}
                            {connectSuccess && (
                                <div className={connectStyles.successMsg}>
                                    {connectSuccess}
                                </div>
                            )}
                        </div>
                        <div className={connectStyles.modalFooter}>
                            <button
                                className="btn btn--ghost"
                                onClick={() => setShowConnectModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn--primary"
                                onClick={handleConnect}
                                disabled={connectLoading}
                            >
                                {connectLoading ? "Sending..." : "Send Request"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Task Detail Modal */}
            {selectedTask && (
                <div className={styles.modalOverlay} onClick={() => setSelectedTask(null)}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>{selectedTask.title}</h2>
                            <button className={styles.modalClose} onClick={() => setSelectedTask(null)}>
                                <XIcon />
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            {/* Task Info */}
                            <div style={{ marginBottom: "var(--space-6)" }}>
                                {selectedTask.description && (
                                    <p style={{ marginBottom: "var(--space-3)", color: "var(--color-text-secondary)" }}>
                                        {selectedTask.description}
                                    </p>
                                )}
                                <div className={styles.taskMeta}>
                                    <span>Assigned by: <strong>{selectedTask.createdByName}</strong></span>
                                    {selectedTask.dueDate && (
                                        <span><CalendarIcon /> Due: {new Date(selectedTask.dueDate).toLocaleDateString()}</span>
                                    )}
                                </div>
                            </div>

                            {/* Subtasks */}
                            <div className={styles.taskSection}>
                                <h4 className={styles.taskSectionTitle}>Subtasks</h4>
                                <p className={styles.formHint} style={{ marginBottom: "var(--space-4)" }}>
                                    Click on a subtask to add documentation. Mark as complete when done.
                                </p>

                                <div className={styles.subtaskList} style={{ marginLeft: 0, paddingLeft: 0, borderLeft: "none" }}>
                                    {selectedTask.subtasks.map((subtask) => {
                                        const isEditing = editingSubtaskId === subtask.id;
                                        const isCompleted = subtask.status === "completed";

                                        return (
                                            <div key={subtask.id} className={styles.subtaskItem}>
                                                <button
                                                    className={`${styles.subtaskCheckbox} ${isCompleted ? styles.subtaskCheckboxCompleted : ""}`}
                                                    onClick={() => handleToggleSubtask(selectedTask.id, subtask.id, subtask.status)}
                                                    title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                                                >
                                                    {isCompleted && <CheckIcon />}
                                                </button>
                                                <div className={styles.subtaskContent}>
                                                    <p className={`${styles.subtaskTitle} ${isCompleted ? styles.subtaskTitleCompleted : ""}`}>
                                                        {subtask.title}
                                                    </p>
                                                    {subtask.description && (
                                                        <p className={styles.subtaskDescription}>{subtask.description}</p>
                                                    )}

                                                    {/* Documentation area */}
                                                    {isEditing ? (
                                                        <div style={{ marginTop: "var(--space-3)" }}>
                                                            <textarea
                                                                className={styles.formTextarea}
                                                                placeholder="Document your work here..."
                                                                value={documentationText}
                                                                onChange={(e) => setDocumentationText(e.target.value)}
                                                                rows={4}
                                                            />
                                                            <div style={{ display: "flex", gap: "var(--space-2)", marginTop: "var(--space-2)" }}>
                                                                <button
                                                                    className="btn btn--primary btn--sm"
                                                                    onClick={() => handleSaveDocumentation(selectedTask.id, subtask.id)}
                                                                    disabled={savingDoc}
                                                                >
                                                                    <SaveIcon /> {savingDoc ? "Saving..." : "Save"}
                                                                </button>
                                                                <button
                                                                    className="btn btn--ghost btn--sm"
                                                                    onClick={() => {
                                                                        setEditingSubtaskId(null);
                                                                        setDocumentationText("");
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {subtask.documentation ? (
                                                                <div className={styles.subtaskDocumentation}>
                                                                    <p className={styles.subtaskDocLabel}>Your Documentation:</p>
                                                                    <p>{subtask.documentation}</p>
                                                                    {!isCompleted && (
                                                                        <button
                                                                            className="btn btn--ghost btn--sm"
                                                                            style={{ marginTop: "var(--space-2)" }}
                                                                            onClick={() => {
                                                                                setEditingSubtaskId(subtask.id);
                                                                                setDocumentationText(subtask.documentation);
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ) : (
                                                                !isCompleted && (
                                                                    <button
                                                                        className="btn btn--ghost btn--sm"
                                                                        style={{ marginTop: "var(--space-2)" }}
                                                                        onClick={() => {
                                                                            setEditingSubtaskId(subtask.id);
                                                                            setDocumentationText("");
                                                                        }}
                                                                    >
                                                                        <PlusIcon /> Add Documentation
                                                                    </button>
                                                                )
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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

function RightPanelContent({
    user,
    acceptedConnections,
    incomingRequests,
    outgoingRequests,
    onAccept,
    onReject
}: {
    user: User | null;
    acceptedConnections: Connection[];
    incomingRequests: Connection[];
    outgoingRequests: Connection[];
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const getInitials = (email: string) => {
        return email.split('@')[0].slice(0, 2).toUpperCase();
    };

    const getRoleLabel = (role: string) => {
        return role === "supervisor" ? "Supervisor" : role.charAt(0).toUpperCase() + role.slice(1);
    };

    return (
        <div className={styles.rightPanelInner}>
            <div className={styles.userProfile}>
                <div className={styles.userAvatar} style={{ backgroundColor: "var(--color-mint)" }}>
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h3 className={styles.userName}>{user?.name}</h3>
                <p className={styles.userRole}>Intern</p>
                <p className={styles.userId}>{user?.uniqueId}</p>
            </div>

            {/* Incoming Requests */}
            {incomingRequests.length > 0 && (
                <div className={styles.rightSection}>
                    <h4 className={styles.rightSectionTitle}>
                        Incoming Requests ({incomingRequests.length})
                    </h4>
                    <div className={styles.connectionsList}>
                        {incomingRequests.map((request) => (
                            <div key={request.id} className={connectStyles.requestItem}>
                                <div className={styles.connectionAvatar}>
                                    {getInitials(request.requesterEmail)}
                                </div>
                                <div className={connectStyles.requestInfo}>
                                    <p className={styles.connectionName}>
                                        {request.requesterName || request.requesterEmail}
                                    </p>
                                    <span className={styles.connectionRole}>
                                        {getRoleLabel(request.requesterRole)}
                                    </span>
                                </div>
                                <div className={connectStyles.requestActions}>
                                    <button
                                        className={styles.approveBtn}
                                        onClick={() => onAccept(request.id)}
                                        title="Accept"
                                    >
                                        <CheckIcon />
                                    </button>
                                    <button
                                        className={styles.rejectBtn}
                                        onClick={() => onReject(request.id)}
                                        title="Reject"
                                    >
                                        <XIcon />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pending Outgoing */}
            {outgoingRequests.length > 0 && (
                <div className={styles.rightSection}>
                    <h4 className={styles.rightSectionTitle}>
                        Pending Requests ({outgoingRequests.length})
                    </h4>
                    <div className={styles.connectionsList}>
                        {outgoingRequests.map((request) => (
                            <div key={request.id} className={styles.connectionItem}>
                                <div className={styles.connectionAvatar}>
                                    {getInitials(request.targetEmail)}
                                </div>
                                <div>
                                    <p className={styles.connectionName}>
                                        {request.targetName || request.targetEmail}
                                    </p>
                                    <span className={styles.connectionRole}>
                                        {getRoleLabel(request.targetRole)} • Pending
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Connected Supervisors */}
            <div className={styles.rightSection}>
                <h4 className={styles.rightSectionTitle}>Connected Supervisors</h4>
                <div className={styles.connectionsList}>
                    {acceptedConnections.length === 0 ? (
                        <p className={connectStyles.noConnections}>
                            No supervisors connected yet.
                        </p>
                    ) : (
                        acceptedConnections.map((conn) => {
                            const isOutgoing = conn.direction === "outgoing";
                            const email = isOutgoing ? conn.targetEmail : conn.requesterEmail;
                            const name = isOutgoing ? conn.targetName : conn.requesterName;

                            return (
                                <div key={conn.id} className={styles.connectionItem}>
                                    <div className={styles.connectionAvatar}>
                                        {getInitials(email)}
                                    </div>
                                    <div>
                                        <p className={styles.connectionName}>{name || email}</p>
                                        <span className={styles.connectionRole}>Supervisor</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
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
