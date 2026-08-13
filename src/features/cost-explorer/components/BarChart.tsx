import { AnimatePresence, motion } from "framer-motion";
import type { CostNode } from "../lib/types";
import { formatCurrency } from "../lib/format";
import { Bar, BAR_HEADROOM, MAX_BAR_HEIGHT } from "./Bar";

interface BarChartProps {
  nodes: CostNode[];
  levelKey: string;
  clickable: boolean;
  onSelect: (node: CostNode) => void;
  reducedMotion: boolean;
}

export function BarChart({ nodes, levelKey, clickable, onSelect, reducedMotion }: BarChartProps) {
  const maxTotal = Math.max(1, ...nodes.map((n) => n.costs.total));
  const avgTotal = nodes.length ? nodes.reduce((s, n) => s + n.costs.total, 0) / nodes.length : 0;
  const avgRatio = Math.min(1, avgTotal / maxTotal);
  const avgTop = BAR_HEADROOM + (1 - avgRatio) * MAX_BAR_HEIGHT;

  return (
    <div className="relative" style={{ containerType: "inline-size", containerName: "bar-chart" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 border-t border-dashed border-border-strong"
        style={{ top: avgTop }}
      >
        <span className="absolute -top-2.5 right-0 -translate-y-full rounded bg-bg-surface px-1.5 font-mono text-[10px] text-text-tertiary">
          avg {formatCurrency(avgTotal)}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.ol
          key={levelKey}
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bar-row relative flex items-end gap-6"
        >
          {nodes.map((node, i) => (
            <Bar
              key={node.id}
              node={node}
              maxTotal={maxTotal}
              clickable={clickable}
              onSelect={onSelect}
              reducedMotion={reducedMotion}
              index={i}
            />
          ))}
        </motion.ol>
      </AnimatePresence>
    </div>
  );
}
