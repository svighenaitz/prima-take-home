import useLocalStorageQuery from "../hooks/useLocalStorageQuery";
import React from "react";
import RecipeGridList from "./RecipeGridList";
import type { RecipeGridListItem } from "./RecipeGridList";
import type { Meal, MealsResponse } from "../types";
import { transformMealToGridItem } from "../src/utils/mealTransform";

export interface RecipeListItem {
  title: string;
  desc: string;
  img?: string;
  time?: string;
  servings?: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.themealdb.com/api/json/v1/1';

export const RecipeList: React.FC<{ query: string; forceLoading?: boolean }> = ({ query, forceLoading }) => {
  const limit = 6;
  // Fetch recipes from TheMealDB API and cache in localStorage
  const { data, isLoading, error } = useLocalStorageQuery<MealsResponse>(
    `themealdb-search-all-${query}`,
    `${API_URL}/search.php?s=${encodeURIComponent(query)}`,
    1000 * 60 * 60 // 1 hour
  );

  const gridData = data?.meals
    ? data.meals.map((meal: Meal) => 
        transformMealToGridItem(meal, { 
          descMaxLength: 60 
        })
      )
    : [];

  if (isLoading || forceLoading) {
    // Show 6 skeleton items
    return <RecipeGridList data={Array.from({ length: limit }, (_, i) => ({
      id: `skeleton-${i}`,
      title: "",
      desc: "",
      img: ""
    }))} variant="list" limit={limit} isLoading />;
  }
  if (error) return <div>Error loading recipes.</div>;
  return <RecipeGridList data={gridData} variant="list" limit={limit} />;
};
