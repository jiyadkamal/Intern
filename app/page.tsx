"use client";

import React from "react";
import Link from "next/link";
import styles from "./page.module.css";

// Professional SVG Icons
const ActivityIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);

const SparklesIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v1m0 16v1m-8-9H3m18 0h-1M5.6 5.6l.7.7m12.4 12.4l.7.7M5.6 18.4l.7-.7m12.4-12.4l.7-.7" />
        <circle cx="12" cy="12" r="4" />
    </svg>
);

const UsersIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
);

const TrendingUpIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
    </svg>
);

const ClipboardCheckIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        <path d="M9 14l2 2 4-4" />
    </svg>
);

const BrainIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
);

const BarChartIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" />
        <line x1="18" y1="20" x2="18" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
);

const ShieldCheckIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
    </svg>
);

const LinkIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
);

const FileTextIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
    </svg>
);

const GraduationCapIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
);

const BookOpenIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
);

const BriefcaseIcon = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
);

const LightbulbIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
    </svg>
);

const PenToolIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
    </svg>
);

const ZapIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
);

const TargetIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

const PieChartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
        <path d="M22 12A10 10 0 0 0 12 2v10z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export default function LandingPage() {
    return (
        <div className={styles.landing}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <LogoIcon />
                    <span>InternTrack</span>
                </div>
                <nav className={styles.nav}>
                    <Link href="#features">Features</Link>
                    <Link href="#roles">For Everyone</Link>
                    <Link href="#ai">AI Powered</Link>
                </nav>
                <div className={styles.headerActions}>
                    <Link href="/login" className="btn btn--ghost">
                        Sign In
                    </Link>
                    <Link href="/register" className="btn btn--primary">
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className={styles.heroContent}>
                    <h1 className={styles.heroTitle}>
                        Track your internship
                        <br />
                        <span className={styles.heroHighlight}>journey with AI</span>
                    </h1>
                    <p className={styles.heroSubtitle}>
                        A smart platform for students and supervisors to manage
                        internships with AI-powered insights and seamless collaboration.
                    </p>
                    <div className={styles.heroCta}>
                        <Link href="/register" className="btn btn--primary" style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
                            Start Tracking Free
                        </Link>
                        <Link href="#features" className="btn btn--secondary" style={{ padding: "1rem 2rem", fontSize: "1rem" }}>
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className={styles.heroVisual}>
                    <div className={styles.dashboardPreview}>
                        <div className={styles.previewCard + " " + styles.cardPink}>
                            <span className={styles.previewIcon}><ActivityIcon /></span>
                            <span>Activity Logs</span>
                        </div>
                        <div className={styles.previewCard + " " + styles.cardMint}>
                            <span className={styles.previewIcon}><SparklesIcon /></span>
                            <span>AI Suggestions</span>
                        </div>
                        <div className={styles.previewCard + " " + styles.cardLavender}>
                            <span className={styles.previewIcon}><UsersIcon /></span>
                            <span>Team Connect</span>
                        </div>
                        <div className={styles.previewCard + " " + styles.cardPeach}>
                            <span className={styles.previewIcon}><TrendingUpIcon /></span>
                            <span>Progress Track</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className={styles.features}>
                <h2 className={styles.sectionTitle}>Everything you need</h2>
                <p className={styles.sectionSubtitle}>
                    Comprehensive tools for managing internships from start to finish
                </p>
                <div className={styles.featureGrid}>
                    <FeatureCard
                        icon={<ClipboardCheckIcon />}
                        title="Activity Logging"
                        description="Log daily tasks, meetings, and learning activities with ease"
                        color="pink"
                    />
                    <FeatureCard
                        icon={<BrainIcon />}
                        title="AI Suggestions"
                        description="Get smart recommendations for documentation and skill improvement"
                        color="mint"
                    />
                    <FeatureCard
                        icon={<BarChartIcon />}
                        title="Progress Tracking"
                        description="Visualize your growth with beautiful charts and milestones"
                        color="lavender"
                    />
                    <FeatureCard
                        icon={<ShieldCheckIcon />}
                        title="Validation System"
                        description="Supervisors can validate and provide feedback on your progress"
                        color="peach"
                    />
                    <FeatureCard
                        icon={<LinkIcon />}
                        title="Easy Connections"
                        description="Connect with supervisors using simple unique IDs"
                        color="sky"
                    />
                    <FeatureCard
                        icon={<FileTextIcon />}
                        title="Report Generation"
                        description="Auto-generate professional reports for submissions"
                        color="cream"
                    />
                </div>
            </section>

            {/* Roles Section */}
            <section id="roles" className={styles.roles}>
                <h2 className={styles.sectionTitle}>Built for everyone</h2>
                <p className={styles.sectionSubtitle}>
                    Tailored dashboards for each role in the internship journey
                </p>
                <div className={styles.roleCards}>
                    <RoleCard
                        icon={<GraduationCapIcon />}
                        role="Student"
                        features={[
                            "Log daily activities",
                            "Track your progress",
                            "Get AI suggestions",
                            "Generate reports",
                        ]}
                        color="mint"
                        href="/register?role=student"
                    />

                    <RoleCard
                        icon={<BriefcaseIcon />}
                        role="Supervisor"
                        features={[
                            "Review intern work",
                            "Approve activities",
                            "Rate performance",
                            "Track attendance",
                        ]}
                        color="peach"
                        href="/register?role=supervisor"
                    />
                </div>
            </section>

            {/* AI Section */}
            <section id="ai" className={styles.aiSection}>
                <div className={styles.aiContent}>
                    <span className={styles.aiBadge}>Powered by Gemini AI</span>
                    <h2 className={styles.aiTitle}>
                        Intelligent assistance
                        <br />
                        at every step
                    </h2>
                    <p className={styles.aiDescription}>
                        Our AI analyzes your activities and provides personalized suggestions
                        to improve documentation, boost productivity, and identify skill gaps.
                    </p>
                    <ul className={styles.aiFeatures}>
                        <li><PenToolIcon /> Smart documentation improvements</li>
                        <li><ZapIcon /> Productivity recommendations</li>
                        <li><TargetIcon /> Skill gap analysis</li>
                        <li><PieChartIcon /> Weekly summary generation</li>
                    </ul>
                </div>
                <div className={styles.aiVisual}>
                    <div className={styles.aiCard}>
                        <div className={styles.aiCardHeader}>
                            <LightbulbIcon />
                            <span>AI Suggestion</span>
                        </div>
                        <p className={styles.aiCardContent}>
                            Based on your recent activities, consider documenting your API
                            integration process. This will help create a valuable reference
                            for future projects.
                        </p>
                        <div className={styles.aiCardActions}>
                            <button className="btn btn--primary" style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
                                Apply
                            </button>
                            <button className="btn btn--ghost" style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}>
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className={styles.cta}>
                <h2 className={styles.ctaTitle}>Ready to get started?</h2>
                <p className={styles.ctaSubtitle}>
                    Join thousands of students and institutions tracking internships smarter
                </p>
                <Link href="/register" className="btn btn--primary" style={{ padding: "1rem 2.5rem", fontSize: "1.125rem" }}>
                    Create Free Account
                </Link>
            </section>

            {/* Footer */}
            <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <div className={styles.footerBrand}>
                        <LogoIcon />
                        <span>InternTrack</span>
                    </div>
                    <p className={styles.footerText}>
                        AI-powered internship management for the modern academic environment
                    </p>
                </div>
                <div className={styles.footerLinks}>
                    <Link href="/privacy">Privacy</Link>
                    <Link href="/terms">Terms</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </footer>
        </div>
    );
}

// Helper Components
function FeatureCard({
    icon,
    title,
    description,
    color,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    color: string;
}) {
    return (
        <div className={`${styles.featureCard} ${styles[`card${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
            <span className={styles.featureIcon}>{icon}</span>
            <h3 className={styles.featureTitle}>{title}</h3>
            <p className={styles.featureDescription}>{description}</p>
        </div>
    );
}

function RoleCard({
    icon,
    role,
    features,
    color,
    href,
}: {
    icon: React.ReactNode;
    role: string;
    features: string[];
    color: string;
    href: string;
}) {
    return (
        <div className={`${styles.roleCard} ${styles[`card${color.charAt(0).toUpperCase() + color.slice(1)}`]}`}>
            <span className={styles.roleIcon}>{icon}</span>
            <h3 className={styles.roleTitle}>{role}</h3>
            <ul className={styles.roleFeatures}>
                {features.map((feature, index) => (
                    <li key={index}><CheckCircleIcon /> {feature}</li>
                ))}
            </ul>
            <Link href={href} className="btn btn--secondary" style={{ width: "100%", marginTop: "auto" }}>
                Get Started as {role}
            </Link>
        </div>
    );
}

function LogoIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    );
}
