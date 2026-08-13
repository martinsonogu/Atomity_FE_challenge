import type { CostColumns, CostNode, DummyProduct } from "./types";

/** Maps product data to a deterministic sample cost hierarchy. */

const MONTHLY_MULTIPLIER = 6;
const MAX_CLUSTERS = 5;
const MAX_NAMESPACES_PER_CLUSTER = 5;
const MAX_RESOURCES_PER_NAMESPACE = 8;

function slug(...parts: string[]): string {
  return parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function titleCase(s: string): string {
  return s.replace(/(^|[\s-])\S/g, (c) => c.toUpperCase()).replace(/-/g, " ");
}

function productCosts(p: DummyProduct): CostColumns {
  const monthly = Math.round(p.price * MONTHLY_MULTIPLIER);

  const raw = {
    cpu: Math.max(0.2, p.rating ?? 1),
    ram: Math.max(1, (p.stock % 50) + 1),
    storage: Math.max(0.5, p.weight ?? 1),
    network: Math.max(0.5, p.dimensions?.depth ?? 5),
    gpu: Math.max(0.1, p.discountPercentage ?? 0.1),
  };
  const sum = raw.cpu + raw.ram + raw.storage + raw.network + raw.gpu;

  const cpu = Math.round((monthly * raw.cpu) / sum);
  const ram = Math.round((monthly * raw.ram) / sum);
  const storage = Math.round((monthly * raw.storage) / sum);
  const network = Math.round((monthly * raw.network) / sum);
  // gpu absorbs the rounding remainder so columns always sum exactly to total
  const gpu = monthly - cpu - ram - storage - network;

  return {
    cpu,
    ram,
    storage,
    network,
    gpu: Math.max(0, gpu),
    efficiency: Math.round(p.discountPercentage ?? 0),
    total: monthly,
  };
}

function sumCosts(children: CostNode[]): CostColumns {
  const base: CostColumns = { cpu: 0, ram: 0, storage: 0, network: 0, gpu: 0, efficiency: 0, total: 0 };
  let weightedEff = 0;

  for (const child of children) {
    base.cpu += child.costs.cpu;
    base.ram += child.costs.ram;
    base.storage += child.costs.storage;
    base.network += child.costs.network;
    base.gpu += child.costs.gpu;
    base.total += child.costs.total;
    weightedEff += child.costs.efficiency * child.costs.total;
  }

  base.efficiency = base.total > 0 ? Math.round(weightedEff / base.total) : 0;
  return base;
}

export function buildCostTree(products: DummyProduct[]): CostNode[] {
  const byCategory = new Map<string, DummyProduct[]>();
  for (const p of products) {
    const list = byCategory.get(p.category) ?? [];
    list.push(p);
    byCategory.set(p.category, list);
  }

  const clusters: CostNode[] = [];

  for (const [category, categoryProducts] of byCategory) {
    const byBrand = new Map<string, DummyProduct[]>();
    for (const p of categoryProducts) {
      const brandKey = p.brand?.trim() || "Unbranded";
      const list = byBrand.get(brandKey) ?? [];
      list.push(p);
      byBrand.set(brandKey, list);
    }

    const namespaces: CostNode[] = [];
    for (const [brand, brandProducts] of byBrand) {
      const resources: CostNode[] = brandProducts
        .map((p) => ({
          id: slug(category, brand, String(p.id)),
          name: p.title,
          subtitle: brand,
          level: "resource" as const,
          costs: productCosts(p),
          source: {
            rating: p.rating,
            stock: p.stock,
            discountPercentage: p.discountPercentage,
          },
        }))
        .sort((a, b) => b.costs.total - a.costs.total)
        .slice(0, MAX_RESOURCES_PER_NAMESPACE);

      namespaces.push({
        id: slug(category, brand),
        name: titleCase(brand),
        subtitle: `${resources.length} resource${resources.length === 1 ? "" : "s"}`,
        level: "namespace",
        costs: sumCosts(resources),
        children: resources,
      });
    }

    namespaces.sort((a, b) => b.costs.total - a.costs.total);
    const topNamespaces = namespaces.slice(0, MAX_NAMESPACES_PER_CLUSTER);

    clusters.push({
      id: slug(category),
      name: titleCase(category),
      subtitle: `${topNamespaces.length} namespace${topNamespaces.length === 1 ? "" : "s"}`,
      level: "cluster",
      costs: sumCosts(topNamespaces),
      children: topNamespaces,
    });
  }

  clusters.sort((a, b) => b.costs.total - a.costs.total);
  return clusters.slice(0, MAX_CLUSTERS);
}
