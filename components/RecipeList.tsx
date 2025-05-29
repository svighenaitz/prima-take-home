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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading recipes.</div>;
  return <RecipeGridList data={gridData} variant="list" />;
};
