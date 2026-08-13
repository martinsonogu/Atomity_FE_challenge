import { Badge } from "./Badge";
import { Breadcrumb } from "./Breadcrumb";
import { ThemeToggle } from "./ThemeToggle";
import type { Crumb } from "../hooks/useDrillPath";

interface SectionHeaderProps {
  crumbs: Crumb[];
  onNavigate: (id: string | "root") => void;
  reducedMotion: boolean;
  aggregatedByLabel: string;
}

export function SectionHeader({
  crumbs,
  onNavigate,
  reducedMotion,
  aggregatedByLabel,
}: SectionHeaderProps) {
  return (
    <header className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-[0.18em] text-text-tertiary">
          Cost Explorer
        </span>
        <ThemeToggle />
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 id="cost-explorer-heading" className="sr-only">
          Cloud cost explorer, drill down from clusters to namespaces to resources
        </h2>
        <Breadcrumb crumbs={crumbs} onNavigate={onNavigate} reducedMotion={reducedMotion} />

        <div className="flex items-center gap-2">
          <Badge tone="accent">
            Aggregated by: <strong className="font-semibold">{aggregatedByLabel}</strong>
          </Badge>
        </div>
      </div>
    </header>
  );
}
