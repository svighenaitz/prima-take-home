import useLocalStorageQuery from "../hooks/useLocalStorageQuery";
import React from "react";
import RecipeGridList from "./RecipeGridList";
import type { RecipeGridListItem } from "./RecipeGridList";

export interface RecipeListItem {
  title: string;
  desc: string;
  img?: string;
  time?: string;
  servings?: string;
}

export const RecipeList: React.FC<{ query: string }> = ({ query }) => {
  const limit = 6;
  // Fetch recipes from TheMealDB API and cache in localStorage
  const { data, isLoading, error } = useLocalStorageQuery<any>(
    `themealdb-search-all-${query}`,
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`,
    1000 * 60 * 60 // 1 hour
  );

  let gridData: RecipeGridListItem[] = [];
  if (data && data.meals) {
    gridData = data.meals.map((meal: any) => ({
      id: meal.idMeal,
      title: meal.strMeal,
      desc: meal.strInstructions?.slice(0, 60) + "...",
      img: meal.strMealThumb,
    }));
  }

  if (isLoading) {
    // Show 6 skeleton items
    const skeletons: RecipeGridListItem[] = Array.from({ length : limit }, (_, i) => ({
      id: `skeleton-${i}`,
      title: "",
      desc: "",
      img: ""
    }));
    return <RecipeGridList data={skeletons} limit={limit} variant="list" />;
  }
  if (error) return <div>Error loading recipes.</div>;
  return <RecipeGridList data={gridData} variant="list" limit={limit} />;
};
