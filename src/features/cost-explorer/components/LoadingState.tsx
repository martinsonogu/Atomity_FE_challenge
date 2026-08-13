interface LoadingStateProps {
  reducedMotion: boolean;
}

export function LoadingState({ reducedMotion }: LoadingStateProps) {
  const pulse = reducedMotion ? "" : "animate-pulse";
  return (
    <div aria-live="polite" aria-busy="true" className="w-full">
      <span className="sr-only">Loading cost data…</span>
      <div className="flex items-end gap-3 sm:gap-4 md:gap-6" style={{ height: 248 }}>
        {[0.9, 0.6, 0.75, 0.4, 0.55].map((h, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-3">
            <div
              className={`w-full rounded-t-lg bg-bg-surface-raised ${pulse}`}
              style={{ height: h * 200, animationDelay: `${i * 90}ms` }}
            />
            <div className={`h-3 w-14 rounded bg-bg-surface-raised ${pulse}`} style={{ animationDelay: `${i * 90}ms` }} />
          </div>
        ))}
      </div>
      <div className="mt-10 space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className={`h-10 w-full rounded-md bg-bg-surface-raised ${pulse}`} style={{ animationDelay: `${i * 70}ms` }} />
        ))}
      </div>
    </div>
  );
}
