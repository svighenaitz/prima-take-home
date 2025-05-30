import React, { useEffect, useState } from 'react';
import Head from "next/head";
import PageHeader from "components/PageHeader";
import RecipeGridList from 'components/RecipeGridList';
import type { Meal } from '../../types';
import { transformMealToGridItem } from '../utils/mealTransform';

// Define a type that includes all fields needed for the transform function
type PickedMeal = Pick<Meal, 'idMeal' | 'strMeal' | 'strInstructions' | 'strArea' | 'strCategory' | 'strMealThumb'>;

export default function Saved() {
  const [savedMeals, setSavedMeals] = useState<PickedMeal[]>([]);

  useEffect(() => {
    try {
      const meals = JSON.parse(localStorage.getItem("savedMeals") ?? "[]") as PickedMeal[];
      setSavedMeals(meals);
    } catch (error) {
      console.error("Error parsing saved meals:", error);
      setSavedMeals([]);
    }
  }, []);

  const gridData = savedMeals.map(meal => 
    transformMealToGridItem(meal, { descMaxLength: 80 })
  );

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
