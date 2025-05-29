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
  variant?: 'grid' | 'list';
}

const RecipeGridList: React.FC<RecipeGridListProps> = ({ data, scrollSnap = false, limit = 6, variant = 'grid' }) => {
  const items = data.slice(0, limit);
  if (variant === 'list') {
    return (
      <div>
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4 py-3">
            {item.img ? (
              <img
                src={item.img}
                alt={item.title}
                className="w-20 h-16 rounded-2xl object-cover bg-gray-200"
                style={{ display: 'block' }}
              />
            ) : (
              <div className="w-20 h-16 rounded-2xl bg-gray-200 animate-pulse" />
            )}
            <div className="flex-1 min-w-0">
              {item.title ? (
                <div className="font-medium text-sm truncate">{item.title}</div>
              ) : (
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" />
              )}
              {item.desc ? (
                <div className="text-xs text-[#886364] truncate">{item.desc}</div>
              ) : (
                <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }
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
