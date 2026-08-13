import { motion } from "framer-motion";
import type { Crumb } from "../hooks/useDrillPath";
import { tokens } from "@/tokens/tokens";

interface BreadcrumbProps {
  crumbs: Crumb[];
  onNavigate: (id: string | "root") => void;
  reducedMotion: boolean;
}

export function Breadcrumb({ crumbs, onNavigate, reducedMotion }: BreadcrumbProps) {
  return (
    <nav aria-label="Cost drill-down path">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-semibold leading-tight">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.id} className="flex items-center gap-x-2">
              <button
                type="button"
                onClick={() => onNavigate(crumb.id)}
                disabled={isLast}
                aria-current={isLast ? "location" : undefined}
                className={`relative rounded-md px-0.5 transition-colors duration-200 ${
                  isLast
                    ? "cursor-default text-text-primary"
                    : "text-text-tertiary hover:text-text-primary"
                }`}
              >
                {crumb.label}
                {isLast && (
                  <motion.span
                    layoutId={reducedMotion ? undefined : "breadcrumb-underline"}
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full"
                    style={{ background: tokens.colors.accentPrimary }}
                    transition={reducedMotion ? { duration: 0 } : tokens.motion.spring}
                  />
                )}
              </button>
              {!isLast && (
                <span aria-hidden="true" className="text-text-tertiary">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
