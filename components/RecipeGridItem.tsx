import React from "react";

interface RecipeGridItemProps {
  title: string;
  desc: string;
  img?: string;
  time?: string;
  servings?: string;
  className?: string; // allows custom classes for layout
  isLoading?: boolean; // whether to show skeleton loading state
}

const RecipeGridItem: React.FC<RecipeGridItemProps> = ({ title, desc, img, time, servings, className, isLoading = false }) => (
  isLoading ? (
    // Skeleton loading state
    <article className={`flex flex-col ${className ?? ""}`} data-testid="recipe-card-loading">
      {/* Skeleton image placeholder */}
      <div 
        className="w-full aspect-square bg-gray-200 mb-1 rounded-2xl animate-pulse" 
        role="img" 
        aria-label="Loading recipe image"
      />
      
      {/* Skeleton title placeholder */}
      <div 
        className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-1" 
        aria-hidden="true"
      />
      
      {/* Skeleton description placeholder */}
      <div 
        className="h-3 w-full bg-gray-100 rounded animate-pulse mb-4" 
        aria-hidden="true"
      />
      
      {/* Skeleton time & servings placeholder (only if time and servings would be shown) */}
      {(time ?? servings) && (
        <div 
          className="h-3 w-1/2 bg-gray-100 rounded animate-pulse" 
          aria-hidden="true"
        />
      )}
    </article>
  ) : (
  <article 
    className={`flex flex-col ${className ?? ""}`} 
    aria-labelledby={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
    data-testid="recipe-card"
    data-recipe-id={title.replace(/\s+/g, '-').toLowerCase()}
  >
    {img ? (
      <img
        src={img}
        alt={`Recipe for ${title}`}
        className="w-full aspect-square object-cover mb-1 rounded-2xl"
        style={{ display: 'block' }}
        loading="lazy"
      />
    ) : (
      <div 
        className="w-full aspect-square bg-gray-200 mb-1 rounded-2xl" 
        role="img" 
        aria-label="Recipe image placeholder"
      />
    )}
    <h3 
      id={`recipe-title-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className="font-small text-sm text-left w-full truncate">
      {title}
    </h3>
    <p className="text-sm text-[#4A4142] mb-4">{desc}</p>
    {time && servings && (
      <p className="text-xs text-[#4A4142]">
        <span className="sr-only">Preparation time: </span>{time} • 
        <span className="sr-only">Servings: </span>{servings}
      </p>
    )}
  </article>
));

export default RecipeGridItem;
