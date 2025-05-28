import React from "react";
import type { MealsResponse } from "../types";
import useLocalStorageQuery from "../hooks/useLocalStorageQuery";

export interface PopularRecipesGridProps {
  query: string;
}

const PopularRecipesGrid: React.FC<PopularRecipesGridProps> = ({ query }) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(query)}`;
  const key = `popular-${query.toLowerCase()}`;
  const { data, isLoading, error } = useLocalStorageQuery<MealsResponse>(
    key,
    url,
    1000 * 60 * 60 * 24 // 24 hours
  );

  if (isLoading) return <div className="mb-4">Loading...</div>;
  if (error) return <div className="mb-4 text-red-500">Error loading recipes</div>;

  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {data?.meals?.map((meal: MealsResponse["meals"][number]) => (
        <div key={meal.idMeal} className="bg-white rounded-lg shadow p-2 flex flex-col items-center">
          {meal.strMealThumb ? (
            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-20 h-20 object-cover rounded mb-2" />
          ) : (
            <div className="w-20 h-20 bg-gray-200 rounded mb-2" />
          )}
          <div className="font-medium text-sm text-center">{meal.strMeal}</div>
        </div>
      ))}
    </div>
  );
};

export default PopularRecipesGrid;
