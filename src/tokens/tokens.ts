/** Typed references to the CSS custom properties in globals.css. */
export const tokens = {
  colors: {
    bgPrimary: "var(--color-bg-primary)",
    bgSurface: "var(--color-bg-surface)",
    bgSurfaceRaised: "var(--color-bg-surface-raised)",
    borderSubtle: "var(--color-border-subtle)",
    borderStrong: "var(--color-border-strong)",
    textPrimary: "var(--color-text-primary)",
    textSecondary: "var(--color-text-secondary)",
    textTertiary: "var(--color-text-tertiary)",
    accentPrimary: "var(--color-accent-primary)",
    accentCool: "var(--color-accent-cool)",
    accentHot: "var(--color-accent-hot)",
    accentSuccess: "var(--color-accent-success)",
    accentError: "var(--color-accent-error)",
  },
  radius: {
    sm: "var(--radius-sm)",
    md: "var(--radius-md)",
    lg: "var(--radius-lg)",
    xl: "var(--radius-xl)",
  },
  shadow: {
    panel: "var(--shadow-panel)",
    bar: "var(--shadow-bar)",
  },
  font: {
    display: "var(--font-display)",
    body: "var(--font-body)",
    mono: "var(--font-mono)",
  },
  motion: {
    easeOut: [0.16, 1, 0.3, 1] as const,
    spring: { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.9 },
    springSoft: { type: "spring" as const, stiffness: 180, damping: 24, mass: 1 },
  },
} as const;

export type Tokens = typeof tokens;
