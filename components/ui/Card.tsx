import React from "react";

interface CardProps {
    children: React.ReactNode;
    variant?: "default" | "pink" | "mint" | "lavender" | "peach" | "sky" | "cream";
    className?: string;
    onClick?: () => void;
}

export default function Card({
    children,
    variant = "default",
    className = "",
    onClick
}: CardProps) {
    const variantClass = variant !== "default" ? `card--${variant}` : "";

    return (
        <div
            className={`card ${variantClass} ${className}`}
            onClick={onClick}
            style={onClick ? { cursor: "pointer" } : undefined}
        >
            {children}
        </div>
    );
}

// Card Header with category and optional rating
export function CardHeader({
    category,
    categoryIcon,
    rating,
    badge,
}: {
    category?: string;
    categoryIcon?: React.ReactNode;
    rating?: number;
    badge?: { text: string; variant?: "success" | "warning" | "error" | "info" | "neutral" };
}) {
    return (
        <div className="card__header">
            {category && (
                <span className="card__category">
                    {categoryIcon && <span className="card__category-icon">{categoryIcon}</span>}
                    {category}
                </span>
            )}
            {rating && (
                <span className="card__rating">
                    <span className="card__rating-star">★</span>
                    {rating.toFixed(1)}
                </span>
            )}
            {badge && (
                <span className={`badge badge--${badge.variant || "neutral"}`}>
                    {badge.text}
                </span>
            )}
        </div>
    );
}

// Card Title
export function CardTitle({ children }: { children: React.ReactNode }) {
    return <h3 className="card__title">{children}</h3>;
}

// Card Subtitle
export function CardSubtitle({ children }: { children: React.ReactNode }) {
    return <p className="card__subtitle">{children}</p>;
}

// Card Body for custom content
export function CardBody({
    children,
    className = ""
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return <div className={`card__body ${className}`}>{children}</div>;
}

// Card Footer with meta info and avatars
export function CardFooter({
    meta,
    avatars,
    children,
}: {
    meta?: string;
    avatars?: Array<{ src?: string; alt?: string }>;
    children?: React.ReactNode;
}) {
    return (
        <div className="card__footer">
            {meta && <span className="card__meta">{meta}</span>}
            {avatars && avatars.length > 0 && (
                <div className="card__avatars">
                    {avatars.slice(0, 3).map((avatar, index) => (
                        <div key={index} className="card__avatars-item">
                            {avatar.src && <img src={avatar.src} alt={avatar.alt || ""} />}
                        </div>
                    ))}
                </div>
            )}
            {children}
        </div>
    );
}

// Progress Card variant
export function ProgressCard({
    title,
    subtitle,
    progress,
    progressColor = "mint",
    variant = "default",
}: {
    title: string;
    subtitle?: string;
    progress: number;
    progressColor?: "mint" | "pink" | "lavender" | "peach";
    variant?: "default" | "pink" | "mint" | "lavender" | "peach" | "sky" | "cream";
}) {
    return (
        <Card variant={variant}>
            <CardTitle>{title}</CardTitle>
            {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
            <div className="progress-bar" style={{ marginTop: "var(--space-4)" }}>
                <div
                    className={`progress-bar__fill progress-bar__fill--${progressColor}`}
                    style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
                />
            </div>
            <div className="text-sm text-muted" style={{ marginTop: "var(--space-2)" }}>
                {progress}% Complete
            </div>
        </Card>
    );
}

// Stat Card variant
export function StatCard({
    value,
    label,
    trend,
    trendDirection,
    variant = "default",
}: {
    value: string | number;
    label: string;
    trend?: string;
    trendDirection?: "up" | "down";
    variant?: "default" | "pink" | "mint" | "lavender" | "peach" | "sky" | "cream";
}) {
    return (
        <Card variant={variant}>
            <div className="stat-card__value">{value}</div>
            <div className="stat-card__label">{label}</div>
            {trend && (
                <div className={`stat-card__trend stat-card__trend--${trendDirection || "up"}`}>
                    {trendDirection === "up" ? "↑" : "↓"} {trend}
                </div>
            )}
        </Card>
    );
}
