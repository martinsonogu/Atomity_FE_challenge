import { motion } from "framer-motion";
import type { CostNode } from "../lib/types";
import { formatCurrency, formatPercent, intensity } from "../lib/format";
import { tokens } from "@/tokens/tokens";

interface BarProps {
  node: CostNode;
  maxTotal: number;
  clickable: boolean;
  onSelect: (node: CostNode) => void;
  reducedMotion: boolean;
  index: number;
}

export const MAX_BAR_HEIGHT = 220;
const MIN_BAR_HEIGHT = 10;
/** Space reserved for the value label above each bar. */
export const BAR_HEADROOM = 28;

export function Bar({ node, maxTotal, clickable, onSelect, reducedMotion, index }: BarProps) {
  const ratio = intensity(node.costs.total, maxTotal);
  const heightPx = Math.max(MIN_BAR_HEIGHT, ratio * MAX_BAR_HEIGHT);
  const coolPct = Math.round((1 - ratio) * 100);

  return (
    <li className="flex min-w-0 flex-1 flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => clickable && onSelect(node)}
        disabled={!clickable}
        aria-label={`${node.name}: ${formatCurrency(node.costs.total)} per month, ${formatPercent(
          node.costs.efficiency,
        )} efficiency${clickable ? ". Press to view breakdown." : ""}`}
        className={`group/bar flex w-full flex-col items-center justify-end focus-visible:outline-none ${
          clickable ? "cursor-pointer" : "cursor-default"
        }`}
        style={{ height: MAX_BAR_HEIGHT + BAR_HEADROOM }}
      >
        <span className="mb-2 font-mono text-xs text-text-secondary opacity-0 transition-opacity duration-200 group-hover/bar:opacity-100 group-focus-visible/bar:opacity-100">
          {formatCurrency(node.costs.total)}
        </span>

        <motion.div
          layout={!reducedMotion}
          layoutId={reducedMotion ? undefined : `bar-${node.id}`}
          initial={reducedMotion ? false : { height: 0, opacity: 0 }}
          animate={{ height: heightPx, opacity: 1 }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { ...tokens.motion.spring, delay: index * 0.045 }
          }
          whileHover={reducedMotion ? undefined : { scale: 1.04, y: -2 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          className="w-full rounded-t-lg rounded-b-sm shadow-bar outline outline-1 -outline-offset-1 outline-white/10"
          style={{
            background: `color-mix(in srgb, var(--color-accent-cool) ${coolPct}%, var(--color-accent-hot))`,
          }}
        />
      </button>

      <span className="max-w-full truncate font-mono text-[13px] text-text-secondary" title={node.name}>
        {node.name}
      </span>
    </li>
  );
}
