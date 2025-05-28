import React from "react";

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

export const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => (
  <div>
    {recipes.map((r) => (
      <div key={r.title} className="flex items-center gap-4 py-3 border-b last:border-b-0">
        <div className="w-16 h-16 rounded bg-gray-200" />
        <div className="flex-1">
          <div className="font-medium text-sm">{r.title}</div>
          <div className="text-xs text-[#886364]">
            {r.desc}
            {r.time && r.servings ? (
              <>
                <span> • {r.time}</span>
                <span> • {r.servings}</span>
              </>
            ) : null}
          </div>
        </div>
      </div>
    ))}
  </div>
);
