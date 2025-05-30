import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import StarToggle from "components/StarToggle";
import { useEffect, useState } from "react";
import useLocalStorageQuery from "hooks/useLocalStorageQuery";
import PageHeader from "components/PageHeader";
import type { Meal, MealsResponse } from "types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://www.themealdb.com/api/json/v1/1';

export default function MealDetail() {
  const router = useRouter();
  const { id } = router.query;
  const mealId = typeof id === "string" ? id : "";
  const [isSaved, setIsSaved] = useState(false);

  const { data, isLoading, error } = useLocalStorageQuery<MealsResponse>(
    `themealdb-meal-${mealId}`,
    `${API_URL}/lookup.php?i=${mealId}`,
    1000 * 60 * 60 // 1 hour
  );
  const meal = data?.meals?.[0];

  useEffect(() => {
    if (!mealId || !meal) return;
    const savedMeals = JSON.parse(localStorage.getItem("savedMeals") ?? "[]") as Meal[];
    setIsSaved(savedMeals.some((m: Meal) => m.idMeal === mealId));
  }, [mealId, meal]);

  const handleToggleSaved = (filled: boolean) => {
    const savedMeals = JSON.parse(localStorage.getItem("savedMeals") ?? "[]") as Meal[];
    let updated;
    if (filled) {
      // Add full meal object if not present
      if (!savedMeals.some((m: Meal) => m.idMeal === mealId)) {
        updated = [...savedMeals, meal];
      } else {
        updated = savedMeals;
      }
    } else {
      // Remove by id
      updated = savedMeals.filter((m: Meal) => m.idMeal !== mealId);
    }
    localStorage.setItem("savedMeals", JSON.stringify(updated));
    setIsSaved(filled);
  };


  return (
    <>
      <Head>
        <title>{meal ? meal.strMeal : "Loading..."}</title>
      </Head>
      <PageHeader
        showBack
        rightElement={
          meal && (
            <StarToggle
              filled={isSaved}
              onToggle={handleToggleSaved}
            />
          )
        }
      >
        {meal ? meal.strMeal : "Loading..."}
      </PageHeader>
      <div className="min-h-screen bg-[#faf7f6] pb-16" data-testid="recipe-detail-page">
        {isLoading || !meal ? (
          <div className="p-6">Loading...</div>
        ) : error ? (
          <div className="p-6 text-red-600">Error loading meal.</div>
        ) : (
          <div className="max-w-xl mx-auto p-4">
            <picture>
              <source
                media="(min-width: 1024px)"
                srcSet={`${meal.strMealThumb}/large`}
              />
              <source
                media="(min-width: 768px)"
                srcSet={`${meal.strMealThumb}/medium`}
              />
              <img
                src={`${meal.strMealThumb}/small`}
                alt={meal.strMeal}
                className="w-full rounded-2xl mb-4 object-cover aspect-video bg-gray-200"
              />
            </picture>
            <h1 className="text-2xl font-bold mb-2">{meal.strMeal}</h1>
            <div className="mb-4 text-[#886364]">{meal.strArea} • {meal.strCategory}</div>
            <h2 className="text-lg font-semibold mb-2">Instructions</h2>
            <div className="mb-4 whitespace-pre-line text-sm text-[#886364]">{meal.strInstructions}</div>
            <h2 className="text-lg font-semibold mb-2">Ingredients</h2>
            <ul className="mb-4 grid grid-cols-2 gap-2">
              {Array.from({ length: 20 }, (_, i) => {
                const ingredient = meal[`strIngredient${i+1}` as keyof Meal];
                const measure = meal[`strMeasure${i+1}` as keyof Meal];
                if (ingredient?.trim()) {
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
