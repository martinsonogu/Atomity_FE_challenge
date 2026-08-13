import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "neutral" | "accent" | "cool" | "hot";
  icon?: ReactNode;
  className?: string;
}

const toneClasses: Record<NonNullable<BadgeProps["tone"]>, string> = {
  neutral:
    "bg-bg-surface-raised text-text-secondary border-border-subtle",
  accent:
    "bg-[color-mix(in_srgb,var(--color-accent-primary)_16%,var(--color-bg-surface))] text-accent-primary border-[color-mix(in_srgb,var(--color-accent-primary)_35%,transparent)]",
  cool: "bg-[color-mix(in_srgb,var(--color-accent-cool)_16%,var(--color-bg-surface))] text-accent-cool border-[color-mix(in_srgb,var(--color-accent-cool)_35%,transparent)]",
  hot: "bg-[color-mix(in_srgb,var(--color-accent-hot)_16%,var(--color-bg-surface))] text-accent-hot border-[color-mix(in_srgb,var(--color-accent-hot)_35%,transparent)]",
};

export function Badge({ children, tone = "neutral", icon, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs tracking-wide ${toneClasses[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
