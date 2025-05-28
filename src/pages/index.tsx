import React from "react";
import Head from "next/head";

const popularRecipes = [
  { title: "Pasta Carbonara", desc: "Classic Italian pasta dish", img: "/carbonara.jpg" },
  { title: "Caesar Salad", desc: "Refreshing salad with romaine lettuce", img: "/caesar.jpg" },
  { title: "Tomato Soup", desc: "Warm soup with fresh tomatoes", img: "/soup.jpg" },
];
const quickAndEasy = [
  { title: "Avocado Toast", desc: "Creamy avocado on toast", img: "/avocado.jpg" },
  { title: "Smoothie Bowl", desc: "Colorful and healthy smoothie bowl", img: "/smoothie.jpg" },
  { title: "Egg Scramble", desc: "Fluffy scrambled eggs", img: "/eggs.jpg" },
];


export default function Home() {
  return (
    <>
      <Head>
        <title>Recipes</title>
      </Head>
      <div className="min-h-screen flex flex-col bg-[#faf7f6] pb-16">
        <header className="p-4 text-center font-bold text-lg">Recipes</header>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search for recipes"
            className="w-full rounded-lg bg-[#f3eae7] py-2 px-4 mb-4 focus:outline-none placeholder:text-[#886364]"
          />
          <h2 className="font-semibold text-md mb-2">Popular Recipes</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {popularRecipes.map((r) => (
              <div key={r.title} className="bg-white rounded-lg shadow p-2 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded mb-2" />
                <div className="font-medium text-sm">{r.title}</div>
                <div className="text-xs text-[#886364]">{r.desc}</div>
              </div>
            ))}
          </div>
          <h2 className="font-semibold text-md mb-2">Quick & Easy</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            {quickAndEasy.map((r) => (
              <div key={r.title} className="bg-white rounded-lg shadow p-2 flex flex-col items-center">
                <div className="w-20 h-20 bg-gray-200 rounded mb-2" />
                <div className="font-medium text-sm">{r.title}</div>
                <div className="text-xs text-[#886364]">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>        
      </div>
    </>
  );
}
