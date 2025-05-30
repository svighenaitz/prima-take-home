import React from "react";
import type { MealsResponse } from "../types";
import useLocalStorageQuery from "../hooks/useLocalStorageQuery";
import RecipeGridList from "./RecipeGridList";
import { transformMealToGridItem } from "../src/utils/mealTransform";

export interface PopularRecipesGridProps {
  query: string;
  scrollSnap?: boolean;
  limit?: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.themealdb.com/api/json/v1/1';

const PopularRecipesGrid: React.FC<PopularRecipesGridProps> = ({ query, scrollSnap = false, limit = 6 }) => {
  const url = `${API_URL}/filter.php?a=${encodeURIComponent(query)}`;
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

  const gridData = data?.meals?.map(meal => 
    transformMealToGridItem(meal, { 
      descMaxLength: 30,
      customDescription: "Delicious and easy to make!",
      appendToImage: '/small'
    })
  ) ?? [];

  return (
    <RecipeGridList
      data={gridData}
      scrollSnap={scrollSnap}
      limit={limit}
    />
  );
};

export default PopularRecipesGrid;
