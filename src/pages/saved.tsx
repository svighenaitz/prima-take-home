import React from 'react';
import PageHeader from "components/PageHeader";
import Head from "next/head";
import RecipeGridList, { type RecipeGridListItem } from 'components/RecipeGridList';
import { useEffect, useState } from "react";

// Define a proper type for meal data
interface MealData {
  idMeal: string;
  strMeal: string;
  strInstructions?: string;
  strArea?: string;
  strCategory?: string;
  strMealThumb?: string;
}

export default function Saved() {
  const [savedMeals, setSavedMeals] = useState<MealData[]>([]);

  useEffect(() => {
    try {
      const meals = JSON.parse(localStorage.getItem("savedMeals") ?? "[]") as MealData[];
      setSavedMeals(meals);
    } catch (error) {
      console.error("Error parsing saved meals:", error);
      setSavedMeals([]);
    }
  }, []);

  const gridData: RecipeGridListItem[] = savedMeals.map((meal) => ({
    id: meal.idMeal,
    title: meal.strMeal,
    desc: meal.strInstructions
      ? meal.strInstructions.slice(0, 80) + (meal.strInstructions.length > 80 ? '...' : '')
      : [meal.strArea, meal.strCategory].filter(Boolean).join(' • '),
    img: meal.strMealThumb,
  }));

  return (
    <>
      <Head>
        <title>Saved Recipes</title>
        <meta name="description" content="View your saved recipes collection" />
      </Head>
      <main className="min-h-screen flex flex-col bg-[#faf7f6] pb-16" id="main-content">
        <PageHeader>Saved</PageHeader>
        <section 
          className="px-4" 
          aria-labelledby="saved-recipes-heading"
        >
          <h2 id="saved-recipes-heading" className="sr-only">Saved Recipes</h2>
          {gridData.length === 0 ? (
            <div 
              className="p-6 text-center text-gray-600" 
              role="status" 
              aria-live="polite"
            >
              No saved recipes yet.
            </div>
          ) : (
            <RecipeGridList 
              data={gridData} 
              variant="list" 
              limit={1000} 
            />
          )}
        </section>
      </main>
    </>
  );
}
