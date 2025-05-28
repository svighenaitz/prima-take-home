import React from "react";
import RecipeGridItem from "./RecipeGridItem";

export interface RecipeGridListItem {
  id: string;
  title: string;
  desc: string;
  img?: string;
}

export interface RecipeGridListProps {
  data: RecipeGridListItem[];
  scrollSnap?: boolean;
  limit?: number;
}

const RecipeGridList: React.FC<RecipeGridListProps> = ({ data, scrollSnap = false, limit = 6 }) => {
  const items = data.slice(0, limit);
  if (scrollSnap) {
    return (
      <div className="flex overflow-x-auto gap-3 mb-4 snap-x snap-mandatory">
        {items.map((item) => (
          <RecipeGridItem
            key={item.id}
            title={item.title}
            desc={item.desc}
            img={item.img}
            className="flex-shrink-0 w-1/2 snap-center"
          />
        ))}
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 mb-4">
      {items.map((item) => (
        <RecipeGridItem
          key={item.id}
          title={item.title}
          desc={item.desc}
          img={item.img}
        />
      ))}
    </div>
  );
};

export default RecipeGridList;
