"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../dashboard.module.css";
import connectStyles from "../student/connect.module.css";

// SVG Icons
function HomeIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
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

function StarIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function ClipboardCheckIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            <path d="M9 14l2 2 4-4" />
        </svg>
    );
}

function BarChartIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
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

function CheckIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
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

function ClockIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}

function EyeIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
        </svg>
    );
}

function BriefcaseIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
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

function CalendarIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
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
    requesterName?: string;
    requesterEmail: string;
    requesterRole: string;
    targetId: string;
    targetName?: string;
    targetEmail: string;
    targetRole: string;
    status: "pending" | "accepted" | "rejected";
    direction: "incoming" | "outgoing";
    createdAt: string;
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

interface SelectedStudent {
    id: string;
    name: string;
    email: string;
}

export default function SupervisorDashboard() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Connection states
    const [incomingRequests, setIncomingRequests] = useState<Connection[]>([]);
    const [acceptedConnections, setAcceptedConnections] = useState<Connection[]>([]);

    // Task states
    const [selectedStudent, setSelectedStudent] = useState<SelectedStudent | null>(null);
    const [studentTasks, setStudentTasks] = useState<Task[]>([]);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [tasksLoading, setTasksLoading] = useState(false);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

    // Task creation form
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDueDate, setNewTaskDueDate] = useState("");
    const [newSubtasks, setNewSubtasks] = useState<{ title: string; description: string }[]>([
        { title: "", description: "" }
    ]);
    const [creating, setCreating] = useState(false);

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
                setAcceptedConnections(
                    (data.connections || []).filter((c: Connection) => c.status === "accepted")
                );
            }
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }, []);

    // Fetch all tasks for stats
    const fetchAllTasks = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;

        try {
            const response = await fetch("/api/tasks", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setAllTasks(data.tasks || []);
            }
        } catch (error) {
            console.error("Error fetching all tasks:", error);
        }
    }, []);

    // Fetch tasks for a student
    const fetchStudentTasks = useCallback(async (studentId: string) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setTasksLoading(true);
        try {
            const response = await fetch(`/api/tasks?studentId=${studentId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setStudentTasks(data.tasks || []);
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
        if (userData.role !== "supervisor") {
            router.push(`/dashboard/${userData.role}`);
            return;
        }

        setUser(userData);
        setLoading(false);
        fetchConnections();
        fetchAllTasks();
    }, [router, fetchConnections, fetchAllTasks]);

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

    // Open student detail modal
    const handleViewStudent = (conn: Connection) => {
        const studentId = conn.direction === "incoming" ? conn.requesterId : conn.targetId;
        const studentName = conn.direction === "incoming" ? conn.requesterName : conn.targetName;
        const studentEmail = conn.direction === "incoming" ? conn.requesterEmail : conn.targetEmail;

        setSelectedStudent({
            id: studentId,
            name: studentName || studentEmail,
            email: studentEmail
        });
        fetchStudentTasks(studentId);
    };

    // Close student modal
    const handleCloseModal = () => {
        setSelectedStudent(null);
        setStudentTasks([]);
        setShowCreateTask(false);
        setExpandedTaskId(null);
        resetTaskForm();
    };

    // Reset task form
    const resetTaskForm = () => {
        setNewTaskTitle("");
        setNewTaskDescription("");
        setNewTaskDueDate("");
        setNewSubtasks([{ title: "", description: "" }]);
    };

    // Add subtask input
    const handleAddSubtask = () => {
        setNewSubtasks([...newSubtasks, { title: "", description: "" }]);
    };

    // Remove subtask input
    const handleRemoveSubtask = (index: number) => {
        if (newSubtasks.length > 1) {
            setNewSubtasks(newSubtasks.filter((_, i) => i !== index));
        }
    };

    // Update subtask input
    const handleSubtaskChange = (index: number, field: "title" | "description", value: string) => {
        const updated = [...newSubtasks];
        updated[index][field] = value;
        setNewSubtasks(updated);
    };

    // Create new task
    const handleCreateTask = async () => {
        if (!selectedStudent || !newTaskTitle.trim()) return;

        const validSubtasks = newSubtasks.filter(st => st.title.trim());
        if (validSubtasks.length === 0) {
            alert("Please add at least one subtask");
            return;
        }

        const token = localStorage.getItem("token");
        setCreating(true);

        try {
            const response = await fetch("/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: newTaskTitle,
                    description: newTaskDescription,
                    assignedTo: selectedStudent.id,
                    dueDate: newTaskDueDate,
                    subtasks: validSubtasks,
                }),
            });

            if (response.ok) {
                fetchStudentTasks(selectedStudent.id);
                fetchAllTasks(); // Refresh stats
                setShowCreateTask(false);
                resetTaskForm();
            } else {
                const data = await response.json();
                alert(data.error || "Failed to create task");
            }
        } catch (error) {
            console.error("Error creating task:", error);
        } finally {
            setCreating(false);
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

    return (
        <div className={styles.dashboardLayout}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}>
                    <LogoIcon />
                </div>
                <nav className={styles.sidebarNav}>
                    <NavItem icon={<HomeIcon />} label="Dashboard" active />
                    <NavItem icon={<UsersIcon />} label="Assigned Interns" />
                    <NavItem icon={<ClipboardCheckIcon />} label="Activity Reviews" />
                    <Link href="/dashboard/ai-insights" style={{ textDecoration: "none" }}>
                        <NavItem icon={<StarIcon />} label="AI Insights" />
                    </Link>
                    <NavItem icon={<BarChartIcon />} label="Reports" />
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
                            Supervisor ID: <strong>{user?.uniqueId}</strong>
                        </p>
                    </div>
                </header>

                {/* Quick Stats */}
                <div className={styles.quickStats}>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgMint}`}>
                            <UsersIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{acceptedConnections.length}</h3>
                            <p>Connected Students</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgPeach}`}>
                            <ClockIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{incomingRequests.length}</h3>
                            <p>Pending Requests</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgLavender}`}>
                            <ClipboardCheckIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{allTasks.filter(t => t.status === "pending" || t.status === "in-progress").length}</h3>
                            <p>Active Tasks</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon} ${styles.bgSky}`}>
                            <BriefcaseIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{allTasks.filter(t => t.status === "completed").length}</h3>
                            <p>Completed Tasks</p>
                        </div>
                    </div>
                </div>

                {/* Connected Students */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Your Students</h2>
                </div>

                {acceptedConnections.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <UsersIcon />
                        </div>
                        <h3 className={styles.emptyTitle}>No students connected yet</h3>
                        <p className={styles.emptyText}>
                            Share your Supervisor ID ({user?.uniqueId}) with students so they can connect with you.
                        </p>
                    </div>
                ) : (
                    <div className={styles.studentCardGrid}>
                        {acceptedConnections.map((conn) => {
                            const studentName = conn.direction === "incoming" ? conn.requesterName : conn.targetName;
                            const studentEmail = conn.direction === "incoming" ? conn.requesterEmail : conn.targetEmail;

                            return (
                                <StudentCard
                                    key={conn.id}
                                    name={studentName || studentEmail}
                                    email={studentEmail}
                                    onViewDetails={() => handleViewStudent(conn)}
                                />
                            );
                        })}
                    </div>
                )}
            </main>

            {/* Right Panel */}
            <aside className={styles.rightPanel}>
                <RightPanelContent
                    user={user}
                    incomingRequests={incomingRequests}
                    acceptedConnections={acceptedConnections}
                    onAccept={(id) => handleConnectionResponse(id, "accept")}
                    onReject={(id) => handleConnectionResponse(id, "reject")}
                />
            </aside>

            {/* Student Detail Modal */}
            {selectedStudent && (
                <div className={styles.modalOverlay} onClick={handleCloseModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>
                                {showCreateTask ? "Create New Task" : "Student Tasks"}
                            </h2>
                            <button className={styles.modalClose} onClick={handleCloseModal}>
                                <XIcon />
                            </button>
                        </div>

                        <div className={styles.modalBody}>
                            {!showCreateTask ? (
                                <>
                                    {/* Student Info */}
                                    <div className={styles.studentDetailHeader}>
                                        <div className={styles.studentDetailAvatar}>
                                            {selectedStudent.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className={styles.studentDetailInfo}>
                                            <h3>{selectedStudent.name}</h3>
                                            <p>{selectedStudent.email}</p>
                                        </div>
                                    </div>

                                    {/* Task Section */}
                                    <div className={styles.taskSection}>
                                        <div className={styles.taskSectionHeader}>
                                            <h4 className={styles.taskSectionTitle}>Assigned Tasks</h4>
                                            <button
                                                className="btn btn--primary btn--sm"
                                                onClick={() => setShowCreateTask(true)}
                                            >
                                                <PlusIcon /> Add Task
                                            </button>
                                        </div>

                                        {tasksLoading ? (
                                            <div className={styles.loadingState} style={{ minHeight: "100px" }}>
                                                <div className={styles.spinner}></div>
                                            </div>
                                        ) : studentTasks.length === 0 ? (
                                            <div className={styles.emptyTaskState}>
                                                <ClipboardCheckIcon />
                                                <p className={styles.emptyTaskText}>
                                                    No tasks assigned yet. Create a task to get started.
                                                </p>
                                            </div>
                                        ) : (
                                            <div className={styles.taskList}>
                                                {studentTasks.map((task) => {
                                                    const { completed, total } = getTaskProgress(task);
                                                    const progressPercent = total > 0 ? (completed / total) * 100 : 0;
                                                    const isExpanded = expandedTaskId === task.id;

                                                    return (
                                                        <div key={task.id} className={styles.taskCard} onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}>
                                                            <div className={styles.taskCardHeader}>
                                                                <span className={styles.taskTitle}>{task.title}</span>
                                                                <span className={`${styles.taskStatus} ${getTaskStatusClass(task.status)}`}>
                                                                    {task.status.replace("-", " ")}
                                                                </span>
                                                            </div>
                                                            <div className={styles.taskMeta}>
                                                                {task.dueDate && (
                                                                    <span><CalendarIcon /> {new Date(task.dueDate).toLocaleDateString()}</span>
                                                                )}
                                                                <span>{completed}/{total} subtasks</span>
                                                            </div>
                                                            <div className={styles.taskProgress}>
                                                                <div className={styles.taskProgressBar}>
                                                                    <div className={styles.taskProgressFill} style={{ width: `${progressPercent}%` }} />
                                                                </div>
                                                                <span className={styles.taskProgressText}>{Math.round(progressPercent)}%</span>
                                                            </div>

                                                            {/* Subtasks */}
                                                            {isExpanded && (
                                                                <div className={styles.subtaskList} onClick={(e) => e.stopPropagation()}>
                                                                    {task.subtasks.map((subtask) => (
                                                                        <div key={subtask.id} className={styles.subtaskItem}>
                                                                            <div className={`${styles.subtaskCheckbox} ${subtask.status === "completed" ? styles.subtaskCheckboxCompleted : ""}`}>
                                                                                {subtask.status === "completed" && <CheckIcon />}
                                                                            </div>
                                                                            <div className={styles.subtaskContent}>
                                                                                <p className={`${styles.subtaskTitle} ${subtask.status === "completed" ? styles.subtaskTitleCompleted : ""}`}>
                                                                                    {subtask.title}
                                                                                </p>
                                                                                {subtask.description && (
                                                                                    <p className={styles.subtaskDescription}>{subtask.description}</p>
                                                                                )}
                                                                                {subtask.documentation && (
                                                                                    <div className={styles.subtaskDocumentation}>
                                                                                        <p className={styles.subtaskDocLabel}>Documentation:</p>
                                                                                        <p>{subtask.documentation}</p>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </>
                            ) : (
                                /* Create Task Form */
                                <div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Task Title *</label>
                                        <input
                                            type="text"
                                            className={styles.formInput}
                                            placeholder="Enter task title"
                                            value={newTaskTitle}
                                            onChange={(e) => setNewTaskTitle(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Description</label>
                                        <textarea
                                            className={styles.formTextarea}
                                            placeholder="Enter task description (optional)"
                                            value={newTaskDescription}
                                            onChange={(e) => setNewTaskDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Due Date</label>
                                        <input
                                            type="date"
                                            className={styles.formInput}
                                            value={newTaskDueDate}
                                            onChange={(e) => setNewTaskDueDate(e.target.value)}
                                        />
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.formLabel}>Subtasks *</label>
                                        <p className={styles.formHint}>Add at least one subtask. Students will document their work on each subtask.</p>

                                        {newSubtasks.map((subtask, index) => (
                                            <div key={index} className={styles.subtaskInputRow}>
                                                <input
                                                    type="text"
                                                    className={styles.formInput}
                                                    placeholder={`Subtask ${index + 1} title`}
                                                    value={subtask.title}
                                                    onChange={(e) => handleSubtaskChange(index, "title", e.target.value)}
                                                />
                                                {newSubtasks.length > 1 && (
                                                    <button
                                                        type="button"
                                                        className={styles.removeSubtaskBtn}
                                                        onClick={() => handleRemoveSubtask(index)}
                                                    >
                                                        <XIcon />
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <button
                                            type="button"
                                            className={styles.addSubtaskBtn}
                                            onClick={handleAddSubtask}
                                        >
                                            <PlusIcon /> Add Subtask
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {showCreateTask && (
                            <div className={styles.modalFooter}>
                                <button
                                    className="btn btn--ghost"
                                    onClick={() => { setShowCreateTask(false); resetTaskForm(); }}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn--primary"
                                    onClick={handleCreateTask}
                                    disabled={creating || !newTaskTitle.trim()}
                                >
                                    {creating ? "Creating..." : "Create Task"}
                                </button>
                            </div>
                        )}
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

function StudentCard({ name, email, onViewDetails }: { name: string; email: string; onViewDetails: () => void }) {
    return (
        <div className={styles.studentCard}>
            <div className={styles.studentCardHeader}>
                <div className={styles.studentCardAvatar}>{name.charAt(0).toUpperCase()}</div>
                <div className={styles.studentCardInfo}>
                    <h4>{name}</h4>
                    <p>{email}</p>
                </div>
            </div>
            <div className={styles.studentCardActions}>
                <button className="btn btn--primary" style={{ flex: 1 }} onClick={onViewDetails}>
                    <EyeIcon /> View Tasks
                </button>
            </div>
        </div>
    );
}

function RightPanelContent({
    user,
    incomingRequests,
    acceptedConnections,
    onAccept,
    onReject
}: {
    user: User | null;
    incomingRequests: Connection[];
    acceptedConnections: Connection[];
    onAccept: (id: string) => void;
    onReject: (id: string) => void;
}) {
    const getInitials = (email: string) => {
        return email.split('@')[0].slice(0, 2).toUpperCase();
    };

    return (
        <div className={styles.rightPanelInner}>
            <div className={styles.userProfile}>
                <div className={styles.userAvatar} style={{ backgroundColor: "var(--color-peach)" }}>
                    {user?.name?.charAt(0).toUpperCase()}
                </div>
                <h3 className={styles.userName}>{user?.name}</h3>
                <p className={styles.userRole}>Internship Supervisor</p>
                <p className={styles.userId}>{user?.uniqueId}</p>
            </div>

            {/* Connection Requests from Students */}
            {incomingRequests.length > 0 && (
                <div className={styles.rightSection}>
                    <h4 className={styles.rightSectionTitle}>
                        Student Requests ({incomingRequests.length})
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
                                        {request.requesterName ? request.requesterEmail : "Student"}
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

            <div className={styles.rightSection}>
                <h4 className={styles.rightSectionTitle}>Quick Stats</h4>
                <div className={styles.quickStatsList}>
                    <div className={styles.quickStatItem}>
                        <span>Connected Students</span>
                        <strong>{acceptedConnections.length}</strong>
                    </div>
                    <div className={styles.quickStatItem}>
                        <span>Pending Requests</span>
                        <strong>{incomingRequests.length}</strong>
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
