import React from "react";
import Link from "next/link";
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
  isLoading?: boolean;
}

const RecipeGridList: React.FC<RecipeGridListProps> = ({ data, scrollSnap = false, limit = 6, variant = 'grid', isLoading = false }) => {
  const items = data.slice(0, limit);
  
  if (variant === 'list') {
    return (
      <ul className="list-none p-0 m-0" aria-label="Recipe list">
        {items.map((item) => (
          <li key={item.id} className="mb-2" data-testid="recipe-card">
            <Link 
              href={`/explore/id/${item.id}`} 
              className="flex items-center gap-4 py-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
              aria-labelledby={`list-recipe-title-${item.id}`}
            >
              {isLoading ? (
                <div 
                  className="w-20 h-16 rounded-2xl bg-gray-200 animate-pulse" 
                  role="img" 
                  aria-label="Loading recipe image"
                />
              ) : item.img ? (
                <picture>
                  <source
                    media="(min-width: 1024px)"
                    srcSet={`${item.img}/large`}
                  />
                  <source
                    media="(min-width: 768px)"
                    srcSet={`${item.img}/medium`}
                  />
                  <img
                    src={`${item.img}/small`}
                    alt={`Recipe for ${item.title}`}
                    className="w-20 h-16 rounded-2xl object-cover bg-gray-200"
                    style={{ display: 'block' }}
                    loading="lazy"
                  />
                </picture>
              ) : (
                <div 
                  className="w-20 h-16 rounded-2xl bg-gray-200" 
                  role="img" 
                  aria-label="Recipe image placeholder"
                />
              )}
              <div className="flex-1 min-w-0">
                {isLoading ? (
                  <>
                    <div 
                      className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-1" 
                      aria-hidden="true"
                    />
                    <div 
                      className="h-3 w-48 bg-gray-100 rounded animate-pulse" 
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  <>
                    <h3 
                      id={`list-recipe-title-${item.id}`}
                      className="font-medium text-sm truncate"
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#4A4142] truncate">{item.desc}</p>
                  </>
                )}
              </div>
            </Link>
          </li>
        ))} 
      </ul>
    );
  }
  
  // Unify grid and scrollSnap rendering
  const containerClass = scrollSnap
    ? "flex overflow-x-auto gap-3 mb-4 snap-x snap-mandatory"
    : "grid grid-cols-2 gap-3 mb-4";
  // Use fixed width for scrollSnap items to ensure consistent sizing
  const itemClass = scrollSnap
    ? "flex-shrink-0 snap-center min-w-[50vw] sm:min-w-[16rem]"
    : "";

  // Add tabindex to scrollable container for keyboard navigation
  const scrollableProps = scrollSnap ? {
    tabIndex: 0,
    role: "region",
    "aria-label": "Scrollable recipes gallery"
  } : {};

  return (
    <div 
      className={containerClass}
      {...scrollableProps}
    >
      {items.map((item) => (
        <Link 
          href={`/explore/id/${item.id}`} 
          key={item.id}
          aria-label={`View recipe details for ${item.title}`}
        >
          <RecipeGridItem
            title={item.title}
            desc={item.desc}
            img={item.img}
            className={itemClass + " w-full h-full"}
            isLoading={isLoading}
            data-testid="recipe-card"
          />          
        </Link>
      ))}
    </div>
  );
};

export default RecipeGridList;
