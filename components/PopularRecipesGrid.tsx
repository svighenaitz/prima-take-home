import React from "react";
import type { MealsResponse } from "../types";
import useLocalStorageQuery from "../hooks/useLocalStorageQuery";

export interface PopularRecipesGridProps {
  query: string;
  scrollSnap?: boolean;
}

const PopularRecipesGrid: React.FC<PopularRecipesGridProps> = ({ query, scrollSnap = false }) => {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${encodeURIComponent(query)}`;
  const key = `popular-${query.toLowerCase()}`;
  const { data, isLoading, error } = useLocalStorageQuery<MealsResponse>(
    key,
    url,
    1000 * 60 * 60 * 24 // 24 hours
  );

  if (isLoading) return <div className="mb-4">Loading...</div>;
  if (error) return <div className="mb-4 text-red-500">Error loading recipes</div>;

  if (scrollSnap) {
    return (
      <div className="flex overflow-x-auto gap-3 mb-4 snap-x snap-mandatory">
        {data?.meals?.map((meal: MealsResponse["meals"][number]) => (
          <div
            key={meal.idMeal}
            className="flex-shrink-0 w-1/2 flex flex-col snap-center"
          >
            {meal.strMealThumb ? (
              <img
                src={meal.strMealThumb + '/small'}
                srcSet={[
                  `${meal.strMealThumb}/small 400w`,
                  `${meal.strMealThumb}/medium 800w`,
                  `${meal.strMealThumb}/large 1200w`
                ].join(', ')}
                sizes="50vw"
                alt={meal.strMeal}
                className="w-full aspect-square object-cover mb-1 rounded-2xl"
                style={{ display: 'block' }}
              />
            ) : (
              <div className="w-full aspect-square bg-gray-200 mb-1 rounded-2xl" />
            )}
            <div className="font-small text-sm text-left w-full truncate mb-4">{meal.strMeal}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {data?.meals?.map((meal: MealsResponse["meals"][number]) => (
        <div key={meal.idMeal} className="flex flex-col">
          {meal.strMealThumb ? (
            <img
              src={meal.strMealThumb + '/small'}
              srcSet={[
                `${meal.strMealThumb}/small 400w`,
                `${meal.strMealThumb}/medium 800w`,
                `${meal.strMealThumb}/large 1200w`
              ].join(', ')}
              sizes="50vw"
              alt={meal.strMeal}
              className="w-full aspect-square object-cover mb-1 rounded-2xl"
              style={{ display: 'block' }}
            />
          ) : (
            <div className="w-full aspect-square bg-gray-200 mb-1 rounded-2xl" />
          )}
          <div className="font-small text-sm text-left w-full truncate mb-4">{meal.strMeal}</div>
        </div>
      ))}
    </div>
  );
};

export default PopularRecipesGrid;
