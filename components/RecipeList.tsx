import React from "react";
import RecipeGridList from "./RecipeGridList";
import type { RecipeGridListItem } from "./RecipeGridList";

export interface RecipeListItem {
  title: string;
  desc: string;
  img?: string;
  time?: string;
  servings?: string;
}

interface RecipeListProps {
  recipes: RecipeListItem[];
}

// Example mock data
const mockRecipes: RecipeListItem[] = [
  {
    title: "Spaghetti Carbonara",
    desc: "Classic Italian pasta dish.",
    img: "https://via.placeholder.com/150",
    time: "25 min",
    servings: "2 servings",
  },
  {
    title: "Pancakes",
    desc: "Fluffy and delicious breakfast.",
    img: "",
    time: "15 min",
    servings: "4 servings",
  },
  {
    title: "Caesar Salad",
    desc: "Crisp romaine with creamy dressing.",
    img: "https://via.placeholder.com/150",
    time: "10 min",
    servings: "1 serving",
  },
];

export const RecipeList: React.FC = () => {
  // Adapt mock data to RecipeGridListItem (id required)
  const gridData: RecipeGridListItem[] = mockRecipes.map((r, i) => ({
    id: r.title + i,
    title: r.title,
    desc: r.desc,
    img: r.img,
  }));
  return <RecipeGridList data={gridData} variant="list" />;
};
;
