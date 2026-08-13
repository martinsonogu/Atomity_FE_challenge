import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { buildCostTree } from "../lib/aggregate";
import type { DummyProductsResponse } from "../lib/types";
import type { TimeRange } from "../components/TimeFilterPill";

const PRODUCTS_URL =
  "https://dummyjson.com/products?limit=100&select=title,price,category,brand,rating,stock,discountPercentage,weight,dimensions";

function getTimeMultiplier(range: TimeRange): number {
  switch (range) {
    case "Last 7 Days":
      return 0.7;
    case "Last 30 Days":
      return 1;
    case "Last 90 Days":
      return 1.7;
    default:
      return 1;
  }
}

async function fetchProducts(): Promise<DummyProductsResponse> {
  const { data } = await axios.get<DummyProductsResponse>(PRODUCTS_URL);
  return data;
}

export function useCostData(enabled: boolean, timeRange: TimeRange) {
  const query = useQuery({
    queryKey: ["dummyjson-products", timeRange],
    queryFn: fetchProducts,
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const tree = useMemo(() => {
    if (!query.data) return null;
    const multiplier = getTimeMultiplier(timeRange);
    const adjusted = query.data.products.map((product) => ({
      ...product,
      price: Number((product.price * multiplier).toFixed(2)),
    }));
    return buildCostTree(adjusted);
  }, [query.data, timeRange]);

  return {
    tree,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
