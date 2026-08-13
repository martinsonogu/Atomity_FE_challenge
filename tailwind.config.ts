import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "var(--color-bg-primary)",
        "bg-surface": "var(--color-bg-surface)",
        "bg-surface-raised": "var(--color-bg-surface-raised)",
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",
        "border-subtle": "var(--color-border-subtle)",
        "border-strong": "var(--color-border-strong)",
        "accent-primary": "var(--color-accent-primary)",
        "accent-cool": "var(--color-accent-cool)",
        "accent-hot": "var(--color-accent-hot)",
        "accent-success": "var(--color-accent-success)",
        "accent-error": "var(--color-accent-error)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        panel: "var(--shadow-panel)",
        bar: "var(--shadow-bar)",
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
