/** Subset of the DummyJSON /products response we actually use. */
export interface DummyProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  brand?: string;
  rating: number;
  stock: number;
  discountPercentage: number;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
}

export interface DummyProductsResponse {
  products: DummyProduct[];
  total: number;
}

export interface CostColumns {
  cpu: number;
  ram: number;
  storage: number;
  network: number;
  gpu: number;
  /** 0–100, a savings/efficiency percentage. */
  efficiency: number;
  total: number;
}

export type CostLevel = "cluster" | "namespace" | "resource";

export interface CostNode {
  id: string;
  name: string;
  /** Secondary label for the node. */
  subtitle?: string;
  level: CostLevel;
  costs: CostColumns;
  children?: CostNode[];
  /** Product fields used to derive resource costs. */
  source?: {
    rating: number;
    stock: number;
    discountPercentage: number;
  };
}

/** Drill path: which cluster/namespace (by id) is currently open, if any. */
export interface DrillPath {
  clusterId: string | null;
  namespaceId: string | null;
}
