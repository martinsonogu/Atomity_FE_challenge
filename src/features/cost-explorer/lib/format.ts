export function formatCurrency(value: number): string {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function formatPercent(value: number): string {
  return `${Math.round(value)}%`;
}

/** Returns a total as a ratio of the largest sibling total. */
export function intensity(total: number, max: number): number {
  if (max <= 0) return 0;
  return Math.min(1, Math.max(0, total / max));
}
