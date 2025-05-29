import React from "react";
import type { MealsResponse } from "../types";
import useLocalStorageQuery from "../hooks/useLocalStorageQuery";
import RecipeGridList from "./RecipeGridList";

export interface PopularRecipesGridProps {
  query: string;
  scrollSnap?: boolean;
  limit?: number;
}

const PopularRecipesGrid: React.FC<PopularRecipesGridProps> = ({ query, scrollSnap = false, limit = 6 }) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(query)}`;
  const key = `popular-${query.toLowerCase()}`;
  const { data, isLoading, error } = useLocalStorageQuery<MealsResponse>(
    key,
    url,
    1000 * 60 * 60 * 24 // 24 hours
  );

  if (isLoading) return <RecipeGridList
    data={Array.from({ length: limit }, (_, i) => ({
      id: `skeleton-${i}`,
      title: "",
      desc: "",
      img: ""
    }))}
    scrollSnap={scrollSnap}
    limit={limit}
    isLoading
  />;
  if (error) return <div className="mb-4 text-red-500">Error loading recipes</div>;

  const gridData = data?.meals?.map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    desc: "Delicious and easy to make!",
    img: meal.strMealThumb ? meal.strMealThumb + '/small' : undefined,
  })) ?? [];

  return (
    <RecipeGridList
      data={gridData}
      scrollSnap={scrollSnap}
      limit={limit}
    />
  );
};

export default PopularRecipesGrid;
