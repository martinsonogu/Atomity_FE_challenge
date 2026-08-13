interface ErrorStateProps {
  message?: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-lg border border-[color-mix(in_srgb,var(--color-accent-error)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-accent-error)_8%,var(--color-bg-surface))] p-6"
    >
      <p className="font-display text-lg font-semibold text-text-primary">Couldn&apos;t load cost data</p>
      <p className="text-sm text-text-secondary">
        {message ?? "The request to the data source failed."} Check your connection and try again.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-accent-error px-4 py-2 text-sm font-medium text-bg-primary transition-transform hover:scale-[1.03] active:scale-[0.97]"
      >
        Retry
      </button>
    </div>
  );
}
