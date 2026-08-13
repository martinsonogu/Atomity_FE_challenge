import { useCallback, useMemo, useState } from "react";
import type { CostNode } from "../lib/types";

export interface Crumb {
  id: string | "root";
  label: string;
  aggregatedBy: "Cluster" | "Namespace" | "Resource";
}

export function useDrillPath(tree: CostNode[] | null) {
  const [clusterId, setClusterId] = useState<string | null>(null);
  const [namespaceId, setNamespaceId] = useState<string | null>(null);

  const cluster = useMemo(
    () => tree?.find((c) => c.id === clusterId) ?? null,
    [tree, clusterId],
  );
  const namespace = useMemo(
    () => cluster?.children?.find((n) => n.id === namespaceId) ?? null,
    [cluster, namespaceId],
  );

  // Nodes currently rendered as bars + table rows.
  const currentNodes: CostNode[] = namespace?.children ?? cluster?.children ?? tree ?? [];

  const level: "cluster" | "namespace" | "resource" = namespace
    ? "resource"
    : cluster
      ? "namespace"
      : "cluster";

  const crumbs: Crumb[] = useMemo(() => {
    const trail: Crumb[] = [{ id: "root", label: "All Clusters", aggregatedBy: "Cluster" }];
    if (cluster) trail.push({ id: cluster.id, label: cluster.name, aggregatedBy: "Namespace" });
    if (namespace) trail.push({ id: namespace.id, label: namespace.name, aggregatedBy: "Resource" });
    return trail;
  }, [cluster, namespace]);

  const drillInto = useCallback(
    (node: CostNode) => {
      if (node.level === "cluster") {
        setClusterId(node.id);
        setNamespaceId(null);
      } else if (node.level === "namespace") {
        setNamespaceId(node.id);
      }
      // resource nodes are leaves — no further drill
    },
    [],
  );

  const goToCrumb = useCallback((crumbId: string | "root") => {
    if (crumbId === "root") {
      setClusterId(null);
      setNamespaceId(null);
    } else if (crumbId === clusterId) {
      setNamespaceId(null);
    }
    // clicking the current deepest crumb is a no-op
  }, [clusterId]);

  return { level, cluster, namespace, currentNodes, crumbs, drillInto, goToCrumb };
}
