import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import useLocalStorageQuery from "hooks/useLocalStorageQuery";
import PageHeader from "components/PageHeader";

export default function MealDetail() {
  const router = useRouter();
  const { id } = router.query;
  const mealId = typeof id === "string" ? id : "";
  const { data, isLoading, error } = useLocalStorageQuery<any>(
    `themealdb-meal-${mealId}`,
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`,
    1000 * 60 * 60 // 1 hour
  );

  const meal = data?.meals?.[0];

  return (
    <>
      <Head>
        <title>{meal ? meal.strMeal : "Loading..."}</title>
      </Head>
      <PageHeader showBack>{meal ? meal.strMeal : "Loading..."}</PageHeader>
      <div className="min-h-screen bg-[#faf7f6] pb-16">
        {isLoading || !meal ? (
          <div className="p-6">Loading...</div>
        ) : error ? (
          <div className="p-6 text-red-600">Error loading meal.</div>
        ) : (
          <div className="max-w-xl mx-auto p-4">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full rounded-2xl mb-4 object-cover aspect-video bg-gray-200"
            />
            <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="mb-4 text-[#886364]">{meal.strArea} • {meal.strCategory}</div>
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <div className="mb-4 whitespace-pre-line text-sm text-[#886364]">{meal.strInstructions}</div>
            <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
            <ul className="mb-4 grid grid-cols-2 gap-2">
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i+1}`];
                const measure = meal[`strMeasure${i+1}`];
                if (ingredient && ingredient.trim()) {
                  return (
                    <li key={i} className="text-sm text-[#886364] flex gap-2">
                      <span className="font-medium text-black">{ingredient}</span>
                      <span>{measure}</span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            {meal.strYoutube && (
              <div className="mb-4">
                <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Watch on YouTube</a>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
