import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useCostData } from "../hooks/useCostData";
import { useDrillPath } from "../hooks/useDrillPath";
import { useOnceInView } from "../hooks/useOnceInView";
import { BarChart } from "./BarChart";
import { DataTable } from "./DataTable";
import { ErrorState } from "./ErrorState";
import { LoadingState } from "./LoadingState";
import { SectionHeader } from "./SectionHeader";

const AGGREGATED_LABEL: Record<"cluster" | "namespace" | "resource", string> = {
  cluster: "Cluster",
  namespace: "Namespace",
  resource: "Resource",
};

const PANEL_ANIMATION = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export function CostExplorerSection() {
  const { ref: sectionRef, isInView } = useOnceInView<HTMLElement>();
  const reducedMotion = Boolean(useReducedMotion());

  const { tree, isLoading, isError, error, refetch } = useCostData(isInView);
  const { level, currentNodes, crumbs, drillInto, goToCrumb } = useDrillPath(tree);
  const isLeafLevel = level === "resource";
  const showBarChart = !(isLeafLevel && currentNodes.length <= 1);
  const aggregatedByLabel = AGGREGATED_LABEL[level];

  const showSkeleton = !isInView || isLoading;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cost-explorer-heading"
      className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:px-10"
    >
      <motion.div
        initial={reducedMotion ? false : "hidden"}
        animate={reducedMotion ? undefined : isInView ? "visible" : "hidden"}
        variants={PANEL_ANIMATION}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-xl border border-border-subtle bg-bg-surface p-5 shadow-panel sm:p-8 md:p-10"
      >
        <SectionHeader
          crumbs={crumbs}
          onNavigate={goToCrumb}
          reducedMotion={reducedMotion}
          aggregatedByLabel={aggregatedByLabel}
        />

        <div className="mt-10">
          {isError && <ErrorState message={error?.message} onRetry={() => refetch()} />}

          {showSkeleton && !isError && <LoadingState reducedMotion={reducedMotion} />}

          {!showSkeleton && !isError && currentNodes.length > 0 && (
            <>
              {showBarChart && (
                <BarChart
                  nodes={currentNodes}
                  levelKey={`${level}-${crumbs[crumbs.length - 1]?.id ?? "root"}`}
                  clickable={!isLeafLevel}
                  onSelect={drillInto}
                  reducedMotion={reducedMotion}
                />
              )}

              <div className={showBarChart ? "mt-12" : undefined}>
                <DataTable
                  nodes={currentNodes}
                  levelLabel={aggregatedByLabel}
                  clickable={!isLeafLevel}
                  onSelect={drillInto}
                  reducedMotion={reducedMotion}
                />
              </div>

              {isLeafLevel && (
                <p className="mt-4 font-mono text-xs text-text-tertiary">
                  Individual resources are the deepest level, nothing further to drill into.
                </p>
              )}
            </>
          )}

          {!showSkeleton && !isError && currentNodes.length === 0 && (
            <p className="py-12 text-center text-text-secondary">No data at this level.</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
