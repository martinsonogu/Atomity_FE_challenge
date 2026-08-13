import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import type { CostNode } from "../lib/types";
import { formatCurrency, formatPercent } from "../lib/format";
import { CountingNumber } from "./CountingNumber";
import styles from "./DataTable.module.css";

interface DataTableProps {
  nodes: CostNode[];
  levelLabel: string;
  clickable: boolean;
  onSelect: (node: CostNode) => void;
  reducedMotion: boolean;
}

const COLUMNS: { key: keyof CostNode["costs"]; label: string }[] = [
  { key: "cpu", label: "CPU" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
  { key: "network", label: "Network" },
  { key: "gpu", label: "GPU" },
  { key: "efficiency", label: "Efficiency" },
  { key: "total", label: "Total" },
];

export function DataTable({ nodes, levelLabel, clickable, onSelect, reducedMotion }: DataTableProps) {
  return (
    <div className={styles.tableWrap}>
      <table
        className={styles.table}
        style={{ "--row-cursor": clickable ? "pointer" : "default" } as CSSProperties}
      >
        <caption className="sr-only">Cost breakdown by {levelLabel}, in US dollars per month</caption>
        <thead>
          <tr>
            <th scope="col">{levelLabel}</th>
            {COLUMNS.map((c) => (
              <th scope="col" key={c.key}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {nodes.map((node, i) => (
            <motion.tr
              key={node.id}
              tabIndex={clickable ? 0 : -1}
              role={clickable ? "button" : undefined}
              aria-label={clickable ? `Drill into ${node.name}` : undefined}
              onClick={() => clickable && onSelect(node)}
              onKeyDown={(e) => {
                if (clickable && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  onSelect(node);
                }
              }}
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.35, delay: i * 0.04 }}
            >
              <td>{node.name}</td>
              {COLUMNS.map((c) => {
                const value = node.costs[c.key];
                const isPercent = c.key === "efficiency";
                const isZero = value === 0;
                return (
                  <td
                    key={c.key}
                    data-label={c.label}
                    className={`${c.key === "total" ? styles.total : ""} ${isZero ? styles.zeroValue : ""}`}
                  >
                    <CountingNumber
                      value={value}
                      format={isPercent ? formatPercent : formatCurrency}
                      reducedMotion={reducedMotion}
                    />
                  </td>
                );
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
