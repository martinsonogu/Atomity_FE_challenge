import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { buildCostTree } from "../lib/aggregate";
import type { DummyProductsResponse } from "../lib/types";

const PRODUCTS_URL =
  "https://dummyjson.com/products?limit=100&select=title,price,category,brand,rating,stock,discountPercentage,weight,dimensions";

async function fetchProducts(): Promise<DummyProductsResponse> {
  const { data } = await axios.get<DummyProductsResponse>(PRODUCTS_URL);
  return data;
}

export function useCostData(enabled: boolean) {
  const query = useQuery({
    queryKey: ["dummyjson-products"],
    queryFn: fetchProducts,
    enabled,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 1,
  });

  const tree = useMemo(() => {
    if (!query.data) return null;
    return buildCostTree(query.data.products);
  }, [query.data]);

  return {
    tree,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}
