import React from "react";

interface RecipeGridItemProps {
  title: string;
  desc: string;
  img?: string;
  time?: string;
  servings?: string;
  className?: string; // allows custom classes for layout
}

const RecipeGridItem: React.FC<RecipeGridItemProps> = ({ title, desc, img, time, servings, className }) => (
  <div className={`flex flex-col ${className ?? ""}`}>
    {img ? (
      <img
        src={img}
        alt={title}
        className="w-full aspect-square object-cover mb-1 rounded-2xl"
        style={{ display: 'block' }}
      />
    ) : (
      <div className="w-full aspect-square bg-gray-200 mb-1 rounded-2xl" />
    )}
    <div className="font-small text-sm text-left w-full truncate">{title}</div>
    <div className="text-sm text-[#886364] mb-4">{desc}</div>
    {time && servings && (
      <div className="text-xs text-[#886364]">{time} • {servings}</div>
    )}
  </div>
);

export default RecipeGridItem;
