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

function SparklesIcon() {
    return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
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

function DownloadIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
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
interface Certificate {
    id: string;
    title: string;
    fileName: string;
    fileType: string;
    uploadedByName: string;
    createdAt: string;
}

const PASTEL_COLORS = [
    { bg: "var(--color-lavender)", accent: "var(--color-accent-lavender)" },
    { bg: "var(--color-mint)", accent: "var(--color-accent-mint)" },
    { bg: "var(--color-peach)", accent: "var(--color-accent-peach)" },
    { bg: "var(--color-sky)", accent: "var(--color-accent-sky)" },
    { bg: "var(--color-pink)", accent: "var(--color-accent-pink)" },
];

export default function StudentCertificatesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [downloading, setDownloading] = useState<string | null>(null);

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
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (!storedUser || !token) { router.push("/login"); return; }
        const userData = JSON.parse(storedUser);
        if (userData.role !== "student") { router.push(`/dashboard/${userData.role}`); return; }
        fetchCertificates();
    }, [router, fetchCertificates]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login");
    };

    const handleDownload = async (certId: string, fileName: string) => {
        setDownloading(certId);
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`/api/certificates?id=${certId}`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                const cert = data.certificate;
                if (cert.fileData) {
                    const link = document.createElement("a");
                    link.href = cert.fileData;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            }
        } catch (error) {
            console.error("Error downloading certificate:", error);
        } finally {
            setDownloading(null);
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
        <div className={styles.dashboardLayout} style={{ gridTemplateColumns: "72px 1fr" }}>
            {/* Sidebar */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarLogo}><LogoIcon /></div>
                <nav className={styles.sidebarNav}>
                    <Link href="/dashboard/student" style={{ textDecoration: "none" }}>
                        <NavItem icon={<HomeIcon />} label="Dashboard" />
                    </Link>
                    <Link href="/dashboard/ai-insights" style={{ textDecoration: "none" }}>
                        <NavItem icon={<SparklesIcon />} label="AI Insights" />
                    </Link>
                    <NavItem icon={<CertificateIcon />} label="Certificates" active />
                </nav>
                <div className={styles.sidebarFooter}>
                    <button onClick={handleLogout} className={styles.navItem}><LogOutIcon /></button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.mainContent}>
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
                            My Certificates
                        </h1>
                        <p className={styles.greetingSubtitle}>
                            View and download certificates issued by your supervisors
                        </p>
                    </div>
                </header>

                {/* Summary Stat */}
                <div style={{
                    display: "flex", gap: "var(--space-4)", marginBottom: "var(--space-8)"
                }}>
                    <div className={styles.statCard} style={{ flex: 1 }}>
                        <div className={`${styles.statIcon}`} style={{ backgroundColor: "var(--color-mint)" }}>
                            <CertificateIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{certificates.length}</h3>
                            <p>Certificates Received</p>
                        </div>
                    </div>
                    <div className={styles.statCard} style={{ flex: 1 }}>
                        <div className={`${styles.statIcon}`} style={{ backgroundColor: "var(--color-lavender)" }}>
                            <UserIcon />
                        </div>
                        <div className={styles.statContent}>
                            <h3>{new Set(certificates.map(c => c.uploadedByName)).size}</h3>
                            <p>Issuing Supervisors</p>
                        </div>
                    </div>
                </div>

                {certificates.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon} style={{ width: 72, height: 72, backgroundColor: "var(--color-lavender)" }}>
                            <CertificateIcon />
                        </div>
                        <h3 className={styles.emptyTitle}>No certificates yet</h3>
                        <p className={styles.emptyText}>
                            Your supervisor will issue certificates here once available. Keep up the great work!
                        </p>
                    </div>
                ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
                        {certificates.map((cert, index) => {
                            const color = PASTEL_COLORS[index % PASTEL_COLORS.length];
                            return (
                                <div key={cert.id} style={{
                                    padding: "var(--space-5) var(--space-6)",
                                    backgroundColor: "var(--color-surface)",
                                    borderRadius: "var(--radius-2xl)",
                                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                    display: "flex", alignItems: "center", gap: "var(--space-5)",
                                    borderLeft: `4px solid ${color.accent}`
                                }}
                                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                                >
                                    {/* Icon */}
                                    <span style={{
                                        display: "inline-flex", alignItems: "center", justifyContent: "center",
                                        width: 52, height: 52, borderRadius: "var(--radius-xl)",
                                        backgroundColor: color.bg, color: color.accent,
                                        flexShrink: 0
                                    }}>
                                        <FileIcon />
                                    </span>

                                    {/* Info */}
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <h4 style={{
                                            fontSize: "var(--font-size-base)", fontWeight: 600,
                                            color: "var(--color-text-primary)", marginBottom: "var(--space-1)"
                                        }}>
                                            {cert.title}
                                        </h4>
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: "var(--space-4)",
                                            fontSize: "var(--font-size-xs)", color: "var(--color-text-secondary)"
                                        }}>
                                            <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                                                <UserIcon /> {cert.uploadedByName}
                                            </span>
                                            <span style={{ display: "flex", alignItems: "center", gap: "var(--space-1)" }}>
                                                <CalendarIcon /> {new Date(cert.createdAt).toLocaleDateString()}
                                            </span>
                                            <span style={{ color: "var(--color-text-muted)" }}>
                                                {cert.fileName}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Badge + Download */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)", flexShrink: 0 }}>
                                        <span style={{
                                            padding: "var(--space-1) var(--space-3)",
                                            borderRadius: "var(--radius-full)",
                                            backgroundColor: "var(--color-mint)",
                                            color: "#2d5a4a",
                                            fontSize: "var(--font-size-xs)",
                                            fontWeight: 600
                                        }}>
                                            Issued
                                        </span>
                                        <button
                                            onClick={() => handleDownload(cert.id, cert.fileName)}
                                            disabled={downloading === cert.id}
                                            style={{
                                                display: "inline-flex", alignItems: "center", justifyContent: "center",
                                                gap: "var(--space-2)",
                                                padding: "var(--space-2) var(--space-4)",
                                                borderRadius: "var(--radius-lg)",
                                                backgroundColor: "var(--color-text-primary)",
                                                color: "var(--color-text-light)",
                                                fontSize: "var(--font-size-xs)",
                                                fontWeight: 600,
                                                border: "none", cursor: "pointer",
                                                opacity: downloading === cert.id ? 0.6 : 1,
                                                transition: "all 0.15s ease"
                                            }}
                                        >
                                            <DownloadIcon /> {downloading === cert.id ? "..." : "Download"}
                                        </button>
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
