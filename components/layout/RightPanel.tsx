"use client";

import React from "react";

interface RightPanelProps {
    user?: {
        name: string;
        role: string;
        avatar?: string;
        initials?: string;
    };
    children?: React.ReactNode;
}

// Icons
const BellIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const SettingsIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
);

export default function RightPanel({ user, children }: RightPanelProps) {
    const defaultUser: { name: string; role: string; avatar?: string; initials?: string } = {
        name: "Guest User",
        role: "Student",
        initials: "GU",
    };

    const currentUser = user || defaultUser;

    return (
        <aside className="right-panel">
            <div className="right-panel__header">
                <button className="btn btn--icon btn--ghost" title="Notifications">
                    <BellIcon />
                </button>
                <button className="btn btn--icon btn--ghost" title="Settings">
                    <SettingsIcon />
                </button>
            </div>

            <div className="right-panel__profile">
                <div className="right-panel__avatar">
                    {currentUser.avatar ? (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={currentUser.avatar} alt={currentUser.name} />
                    ) : (
                        currentUser.initials || currentUser.name.charAt(0)
                    )}
                </div>
                <h3 className="right-panel__name">{currentUser.name}</h3>
                <p className="right-panel__role">{currentUser.role}</p>
            </div>

            {children}
        </aside>
    );
}

// Sub-components for RightPanel sections
export function RightPanelSection({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="right-panel__section">
            <h4 className="right-panel__section-title">{title}</h4>
            {children}
        </div>
    );
}

export function QuickStat({
    value,
    label,
    icon,
    color = "mint",
}: {
    value: string | number;
    label: string;
    icon?: React.ReactNode;
    color?: "mint" | "pink" | "lavender" | "peach";
}) {
    return (
        <div className={`stat-card card--${color}`} style={{ padding: "var(--space-4)", marginBottom: "var(--space-3)" }}>
            <div className="flex items-center gap-3">
                {icon && <div className="stat-icon">{icon}</div>}
                <div>
                    <div className="stat-card__value" style={{ fontSize: "var(--font-size-2xl)" }}>{value}</div>
                    <div className="stat-card__label">{label}</div>
                </div>
            </div>
        </div>
    );
}

export function ConnectionsList({
    connections,
}: {
    connections: Array<{ name: string; role: string; avatar?: string }>;
}) {
    return (
        <div className="connections-list">
            {connections.map((connection, index) => (
                <div key={index} className="notification" style={{ padding: "var(--space-3)" }}>
                    <div className="right-panel__avatar" style={{ width: "36px", height: "36px", fontSize: "var(--font-size-sm)" }}>
                        {connection.avatar ? (
                            <img src={connection.avatar} alt={connection.name} />
                        ) : (
                            connection.name.charAt(0)
                        )}
                    </div>
                    <div className="notification__content">
                        <div className="notification__title">{connection.name}</div>
                        <div className="notification__text">{connection.role}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}
