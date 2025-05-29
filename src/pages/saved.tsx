import React from 'react';
import PageHeader from "components/PageHeader";

import Head from "next/head";
import RecipeGridList, { type RecipeGridListItem } from 'components/RecipeGridList';



import { useEffect, useState } from "react";

export default function Saved() {
  const [savedMeals, setSavedMeals] = useState<any[]>([]);

  useEffect(() => {
    const meals = JSON.parse(localStorage.getItem("savedMeals") || "[]");
    setSavedMeals(meals);
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
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <PageHeader>Saved</PageHeader>
        <div className="px-4">
          {gridData.length === 0 ? (
            <div className="p-6 text-center text-gray-400">No saved recipes yet.</div>
          ) : (
            <RecipeGridList data={gridData} variant="list" limit={1000} />
          )}
        </div>
      </div>
    </>
  );
}
