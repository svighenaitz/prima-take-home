import React from 'react';

import Head from "next/head";
import { SearchBar } from "components/SearchBar";
import { RecipeList } from "components/RecipeList";

const recipes = [
  { title: "Lemon Herb Roasted Chicken", desc: "Quick and easy weeknight dinner", img: "/chicken.jpg" },
  { title: "Creamy Tomato Soup", desc: "A classic comfort food", img: "/tomato-soup.jpg" },
  { title: "Grilled Corn Salad", desc: "Perfect for a summer barbecue", img: "/corn-salad.jpg" },
  { title: "Avocado Toast with Egg", desc: "A refreshing and healthy option", img: "/avocado-toast.jpg" },
  { title: "Chocolate Chip Cookies", desc: "A sweet treat for any occasion", img: "/cookies.jpg" },
];

export default function Explore() {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <header className="p-4 flex items-center justify-between font-bold text-lg">
          <span className="material-icons">menu</span>
          Recipes
          <span className="material-icons">search</span>
        </header>
        <div className="px-4">
          <SearchBar placeholder="Search for recipes" />
          <RecipeList recipes={recipes} />
        </div>
      </div>
    </>
  );
}

