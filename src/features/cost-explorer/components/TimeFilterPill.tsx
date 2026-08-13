const RANGES = ["Last 7 Days", "Last 30 Days", "Last 90 Days"] as const;

export type TimeRange = (typeof RANGES)[number];

interface TimeFilterPillProps {
  value: TimeRange;
  onChange: (value: TimeRange) => void;
}

export function TimeFilterPill({ value, onChange }: TimeFilterPillProps) {
  return (
    <div className="relative">
      <select
        aria-label="Select time range"
        value={value}
        onChange={(e) => onChange(e.target.value as TimeRange)}
        className="cursor-pointer appearance-none rounded-full border border-border-subtle bg-bg-surface-raised py-2 pl-4 pr-9 font-mono text-xs text-text-primary transition-colors hover:border-border-strong focus-visible:border-accent-primary"
      >
        {RANGES.map((range) => (
          <option key={range} value={range}>
            {range}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-3 top-1/2 h-2 w-3 -translate-y-1/2 fill-none stroke-text-secondary"
        strokeWidth={1.5}
      >
        <path d="M1 1.5 6 6.5 11 1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
