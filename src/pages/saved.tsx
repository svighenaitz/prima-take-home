import React from 'react';

import Head from "next/head";
import { RecipeList } from "components/RecipeList";

const savedRecipes = [
  { title: "Spicy Chicken Stir-Fry", time: "30 min", servings: "4 servings", img: "/chicken-stirfry.jpg" },
  { title: "Creamy Tomato Pasta", time: "45 min", servings: "6 servings", img: "/tomato-pasta.jpg" },
  { title: "Avocado Toast with Egg", time: "20 min", servings: "2 servings", img: "/avocado-toast.jpg" },
  { title: "Beef Tacos", time: "60 min", servings: "8 servings", img: "/beef-tacos.jpg" },
  { title: "Shrimp Scampi", time: "25 min", servings: "4 servings", img: "/shrimp-scampi.jpg" },
];

export default function Saved() {
  return (
    <>
      <Head>
        <title>Saved Recipes</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <header className="p-4 flex items-center font-bold text-lg">
          <span className="material-icons">arrow_back</span>
          <span className="flex-1 text-center">Saved</span>
          <span className="material-icons">menu</span>
        </header>
        <div className="px-4">
          <RecipeList recipes={savedRecipes.map(r => ({
            ...r,
            desc: r.time && r.servings ? `${r.time} • ${r.servings}` : ""
          }))} />
        </div>
      </div>
    </>
  );
}
