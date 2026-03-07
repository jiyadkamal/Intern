"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "../../dashboard.module.css";

// SVG Icons
function HomeIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
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

function CertificateIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="6" />
            <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
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

function UploadIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
    );
}

function FileIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
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

function CheckCircleIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
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

function UserIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
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
    targetId: string;
    targetName?: string;
    targetEmail: string;
    direction: "incoming" | "outgoing";
    status: string;
}

interface Certificate {
    id: string;
    title: string;
    fileName: string;
    fileType: string;
    studentId: string;
    studentName: string;
    studentEmail: string;
    uploadedByName: string;
    createdAt: string;
}

const PASTEL_COLORS = [
    { bg: "var(--color-mint)", accent: "var(--color-accent-mint)" },
    { bg: "var(--color-lavender)", accent: "var(--color-accent-lavender)" },
    { bg: "var(--color-peach)", accent: "var(--color-accent-peach)" },
    { bg: "var(--color-sky)", accent: "var(--color-accent-sky)" },
    { bg: "var(--color-pink)", accent: "var(--color-accent-pink)" },
];

export default function SupervisorCertificatesPage() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [connections, setConnections] = useState<Connection[]>([]);

    // Upload form
    const [selectedStudentId, setSelectedStudentId] = useState("");
    const [certTitle, setCertTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState("");
    const [uploadError, setUploadError] = useState("");
    const [isDragOver, setIsDragOver] = useState(false);

    const fetchConnections = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const response = await fetch("/api/users/connect", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setConnections(
                    (data.connections || []).filter((c: Connection) => c.status === "accepted")
                );
            }
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }, []);

    const fetchCertificates = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const response = await fetch("/api/certificates", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setCertificates(data.certificates || []);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!storedUser || !token) { router.push("/login"); return; }
        const userData = JSON.parse(storedUser);
        if (userData.role !== "supervisor") { router.push(`/dashboard/${userData.role}`); return; }
        setUser(userData);
        setLoading(false);
        fetchConnections();
        fetchCertificates();
    }, [router, fetchConnections, fetchCertificates]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setUploadError("File size must be less than 5MB");
                return;
            }
            setSelectedFile(file);
            setUploadError("");
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.size > 5 * 1024 * 1024) {
                setUploadError("File size must be less than 5MB");
                return;
            }
            setSelectedFile(file);
            setUploadError("");
        }
    };

    const toBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    };

    const handleUpload = async () => {
        if (!selectedStudentId) { setUploadError("Please select a student"); return; }
        if (!certTitle.trim()) { setUploadError("Please enter a certificate title"); return; }
        if (!selectedFile) { setUploadError("Please select a file to upload"); return; }

        setUploading(true);
        setUploadError("");
        setUploadSuccess("");

        try {
            const fileData = await toBase64(selectedFile);
            const token = localStorage.getItem("token");

            const response = await fetch("/api/certificates", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    studentId: selectedStudentId,
                    title: certTitle,
                    fileName: selectedFile.name,
                    fileData,
                    fileType: selectedFile.type,
                }),
            });

            if (response.ok) {
                setUploadSuccess("Certificate uploaded successfully!");
                setCertTitle("");
                setSelectedFile(null);
                setSelectedStudentId("");
                const fileInput = document.getElementById("certFile") as HTMLInputElement;
                if (fileInput) fileInput.value = "";
                fetchCertificates();
                setTimeout(() => setUploadSuccess(""), 4000);
            } else {
                const data = await response.json();
                setUploadError(data.error || "Failed to upload certificate");
            }
        } catch (error) {
            console.error("Upload error:", error);
            setUploadError("Network error. Please try again.");
        } finally {
            setUploading(false);
        }
    };

    const getStudentFromConnection = (conn: Connection) => {
        const name = conn.direction === "incoming" ? conn.requesterName : conn.targetName;
        const email = conn.direction === "incoming" ? conn.requesterEmail : conn.targetEmail;
        const id = conn.direction === "incoming" ? conn.requesterId : conn.targetId;
        return { id, name: name || email, email };
    };

    if (loading) {
        return (
            <div className={styles.loadingState}>
                <div className={styles.spinner}></div>
            </div>
        );
    }

    return (
        <div className={styles.dashboardLayout} style={{ gridTemplateColumns: "72px 1fr" }}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}><LogoIcon /></div>
                <nav className={styles.sidebarNav}>
                    <Link href="/dashboard/supervisor" style={{ textDecoration: "none" }}>
                        <NavItem icon={<HomeIcon />} label="Dashboard" />
                    </Link>
                    <Link href="/dashboard/ai-insights" style={{ textDecoration: "none" }}>
                        <NavItem icon={<StarIcon />} label="AI Insights" />
                    </Link>
                    <NavItem icon={<CertificateIcon />} label="Certificates" active />
                </nav>
                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.navItem}><LogOutIcon /></button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
                {/* Header */}
                <header className={styles.mainHeader}>
                    <div className={styles.greeting}>
                        <h1 className={styles.greetingTitle} style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                            <span style={{
                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                width: 44, height: 44, borderRadius: "var(--radius-xl)",
                                background: "var(--color-lavender)", color: "var(--color-accent-lavender)"
                            }}>
                                <CertificateIcon />
                            </span>
                            Certificates
                        </h1>
                        <p className={styles.greetingSubtitle}>
                            Issue and manage certificates for your connected students
                        </p>
                    </div>
                </header>

                {/* Quick Stats */}
                <div style={{
                    display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "var(--space-4)", marginBottom: "var(--space-8)"
                }}>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon}`} style={{ backgroundColor: "var(--color-mint)" }}>
                            <CertificateIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{certificates.length}</h3>
                            <p>Total Issued</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon}`} style={{ backgroundColor: "var(--color-lavender)" }}>
                            <UserIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{connections.length}</h3>
                            <p>Connected Students</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={`${styles.statIcon}`} style={{ backgroundColor: "var(--color-peach)" }}>
                            <CheckCircleIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{new Set(certificates.map(c => c.studentId)).size}</h3>
                            <p>Students Certified</p>
                        </div>
                    </div>
                </div>

                {/* Upload Section */}
                <div style={{
                    padding: "var(--space-8)", backgroundColor: "var(--color-surface)",
                    borderRadius: "var(--radius-2xl)", marginBottom: "var(--space-8)",
                    boxShadow: "var(--shadow-sm)"
                }}>
                    <h3 style={{
                        marginBottom: "var(--space-6)", fontSize: "var(--font-size-lg)",
                        fontWeight: "var(--font-weight-semibold)" as string,
                        display: "flex", alignItems: "center", gap: "var(--space-2)",
                        color: "var(--color-text-primary)"
                    }}>
                        <span style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: 32, height: 32, borderRadius: "var(--radius-lg)",
                            background: "var(--color-sky)", color: "var(--color-accent-sky)"
                        }}>
                            <UploadIcon />
                        </span>
                        Issue New Certificate
                    </h3>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-5)", marginBottom: "var(--space-5)" }}>
                        {/* Student Select */}
                        <div>
                            <label style={{
                                display: "block", fontSize: "var(--font-size-sm)",
                                fontWeight: 500, color: "var(--color-text-secondary)",
                                marginBottom: "var(--space-2)"
                            }}>
                                Recipient Student
                            </label>
                            {connections.length === 0 ? (
                                <div style={{
                                    padding: "var(--space-4)", backgroundColor: "var(--color-peach-soft, var(--color-peach))",
                                    borderRadius: "var(--radius-lg)", fontSize: "var(--font-size-sm)",
                                    color: "var(--color-text-secondary)", textAlign: "center"
                                }}>
                                    No connected students yet
                                </div>
                            ) : (
                                <select
                                    value={selectedStudentId}
                                    onChange={(e) => { setSelectedStudentId(e.target.value); setUploadError(""); }}
                                    style={{
                                        width: "100%", padding: "var(--space-3) var(--space-4)",
                                        borderRadius: "var(--radius-lg)",
                                        border: "2px solid var(--color-background)",
                                        backgroundColor: "var(--color-background-alt)",
                                        color: "var(--color-text-primary)",
                                        fontSize: "var(--font-size-sm)",
                                        fontFamily: "inherit",
                                        transition: "border-color 0.2s ease",
                                        outline: "none",
                                        cursor: "pointer"
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = "var(--color-accent-lavender)"}
                                    onBlur={(e) => e.target.style.borderColor = "var(--color-background)"}
                                >
                                    <option value="">Choose a student...</option>
                                    {connections.map((conn) => {
                                        const student = getStudentFromConnection(conn);
                                        return (
                                            <option key={student.id} value={student.id}>
                                                {student.name} ({student.email})
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                        </div>

                        {/* Certificate Title */}
                        <div>
                            <label style={{
                                display: "block", fontSize: "var(--font-size-sm)",
                                fontWeight: 500, color: "var(--color-text-secondary)",
                                marginBottom: "var(--space-2)"
                            }}>
                                Certificate Title
                            </label>
                            <input
                                type="text"
                                placeholder="e.g., Internship Completion Certificate"
                                value={certTitle}
                                onChange={(e) => { setCertTitle(e.target.value); setUploadError(""); }}
                                style={{
                                    width: "100%", padding: "var(--space-3) var(--space-4)",
                                    borderRadius: "var(--radius-lg)",
                                    border: "2px solid var(--color-background)",
                                    backgroundColor: "var(--color-background-alt)",
                                    color: "var(--color-text-primary)",
                                    fontSize: "var(--font-size-sm)",
                                    fontFamily: "inherit",
                                    transition: "border-color 0.2s ease",
                                    outline: "none"
                                }}
                                onFocus={(e) => e.target.style.borderColor = "var(--color-accent-lavender)"}
                                onBlur={(e) => e.target.style.borderColor = "var(--color-background)"}
                            />
                        </div>
                    </div>

                    {/* File Drop Zone */}
                    <div
                        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("certFile")?.click()}
                        style={{
                            padding: selectedFile ? "var(--space-4) var(--space-6)" : "var(--space-8)",
                            borderRadius: "var(--radius-xl)",
                            border: `2px dashed ${isDragOver ? "var(--color-accent-lavender)" : selectedFile ? "var(--color-accent-mint)" : "var(--color-background)"}`,
                            backgroundColor: isDragOver ? "var(--color-lavender-soft, var(--color-lavender))" : selectedFile ? "var(--color-mint-soft, var(--color-mint))" : "var(--color-background-alt)",
                            textAlign: "center",
                            cursor: "pointer",
                            transition: "all 0.25s ease",
                            marginBottom: "var(--space-5)"
                        }}
                    >
                        <input
                            type="file"
                            id="certFile"
                            accept=".pdf,.jpg,.jpeg,.png,.webp"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                        />
                        {selectedFile ? (
                            <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                                <span style={{
                                    display: "inline-flex", alignItems: "center", justifyContent: "center",
                                    width: 40, height: 40, borderRadius: "var(--radius-lg)",
                                    backgroundColor: "var(--color-mint)", color: "var(--color-accent-mint)"
                                }}>
                                    <FileIcon />
                                </span>
                                <div style={{ textAlign: "left", flex: 1 }}>
                                    <p style={{ fontWeight: 500, fontSize: "var(--font-size-sm)", color: "var(--color-text-primary)" }}>
                                        {selectedFile.name}
                                    </p>
                                    <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                                        {(selectedFile.size / 1024).toFixed(1)} KB • Click to change
                                    </p>
                                </div>
                                <CheckCircleIcon />
                            </div>
                        ) : (
                            <>
                                <div style={{
                                    width: 52, height: 52, borderRadius: "var(--radius-full)",
                                    backgroundColor: "var(--color-lavender)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    margin: "0 auto var(--space-3)", color: "var(--color-accent-lavender)"
                                }}>
                                    <UploadIcon />
                                </div>
                                <p style={{ fontWeight: 500, fontSize: "var(--font-size-sm)", color: "var(--color-text-primary)", marginBottom: "var(--space-1)" }}>
                                    Drop your certificate here or click to browse
                                </p>
                                <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                                    PDF, JPG, PNG or WebP • Max 5MB
                                </p>
                            </>
                        )}
                    </div>

                    {/* Messages */}
                    {uploadError && (
                        <div style={{
                            padding: "var(--space-3) var(--space-4)", backgroundColor: "var(--color-pink)",
                            borderRadius: "var(--radius-lg)", color: "#7a3a3a",
                            marginBottom: "var(--space-4)", fontSize: "var(--font-size-sm)",
                            display: "flex", alignItems: "center", gap: "var(--space-2)"
                        }}>
                            ⚠ {uploadError}
                        </div>
                    )}
                    {uploadSuccess && (
                        <div style={{
                            padding: "var(--space-3) var(--space-4)", backgroundColor: "var(--color-mint)",
                            borderRadius: "var(--radius-lg)", color: "#2d5a4a",
                            marginBottom: "var(--space-4)", fontSize: "var(--font-size-sm)",
                            display: "flex", alignItems: "center", gap: "var(--space-2)",
                            animation: "fadeIn 0.3s ease"
                        }}>
                            <CheckCircleIcon /> {uploadSuccess}
                        </div>
                    )}

                    {/* Upload Button */}
                    <button
                        className="btn btn--primary"
                        onClick={handleUpload}
                        disabled={uploading}
                        style={{
                            display: "flex", alignItems: "center", gap: "var(--space-2)",
                            padding: "var(--space-3) var(--space-8)",
                            borderRadius: "var(--radius-xl)",
                            fontSize: "var(--font-size-sm)",
                            fontWeight: 600,
                            transition: "all 0.2s ease",
                            opacity: uploading ? 0.7 : 1
                        }}
                    >
                        <UploadIcon /> {uploading ? "Uploading..." : "Issue Certificate"}
                    </button>
                </div>

                {/* Issued Certificates */}
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>Issued Certificates</h2>
                    <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)" }}>
                        {certificates.length} total
                    </span>
                </div>

                {certificates.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <CertificateIcon />
                        </div>
                        <h3 className={styles.emptyTitle}>No certificates issued yet</h3>
                        <p className={styles.emptyText}>
                            Use the form above to issue your first certificate to a student.
                        </p>
                    </div>
                ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--space-4)" }}>
                        {certificates.map((cert, index) => {
                            const color = PASTEL_COLORS[index % PASTEL_COLORS.length];
                            return (
                                <div key={cert.id} style={{
                                    padding: "var(--space-5)", backgroundColor: "var(--color-surface)",
                                    borderRadius: "var(--radius-2xl)",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    cursor: "default", borderLeft: `4px solid ${color.accent}`
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                                >
                                    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-3)", marginBottom: "var(--space-3)" }}>
                                        <span style={{
                                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                                            width: 40, height: 40, borderRadius: "var(--radius-lg)",
                                            backgroundColor: color.bg, color: color.accent, flexShrink: 0
                                        }}>
                                            <FileIcon />
                                        </span>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <h4 style={{
                                                fontSize: "var(--font-size-base)",
                                                fontWeight: 600,
                                                color: "var(--color-text-primary)",
                                                marginBottom: "var(--space-1)",
                                                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis"
                                            }}>
                                                {cert.title}
                                            </h4>
                                            <p style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>
                                                {cert.fileName}
                                            </p>
                                        </div>
                                    </div>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: "var(--space-4)",
                                        fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)"
                                    }}>
                                        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                                            <UserIcon /> {cert.studentName}
                                        </span>
                                        <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                                            <CalendarIcon /> {new Date(cert.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode; label: string; active?: boolean }) {
    return (
        <div className={`${styles.navItem} ${active ? styles.navItemActive : ""}`} title={label}>
            {icon}
        </div>
    );
}
