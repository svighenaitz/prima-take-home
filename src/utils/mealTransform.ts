import type { Meal } from '../../types';
import type { RecipeGridListItem } from '../../components/RecipeGridList';

type TransformMealOptions = {
  /** Maximum length of the description before truncation */
  descMaxLength?: number;
  /** String to append to the image URL (e.g., '/small' for thumbnails) */
  appendToImage?: string;
  /** Alternative description to use instead of generating one */
  customDescription?: string;
};

/**
 * Transforms a Meal object into a RecipeGridListItem
 * @param meal The meal object to transform
 * @param options Transformation options
 * @returns A RecipeGridListItem ready for display
 */
export function transformMealToGridItem(
  meal: Pick<Meal, 'idMeal' | 'strMeal' | 'strInstructions' | 'strArea' | 'strCategory' | 'strMealThumb'>,
  options: TransformMealOptions = {}
): RecipeGridListItem {
  const { 
    descMaxLength = 80, 
    appendToImage = '',
    customDescription 
  } = options;

  // Generate description if not provided
  const desc = customDescription ?? (
    meal.strInstructions
      ? meal.strInstructions.slice(0, descMaxLength) + 
        (meal.strInstructions.length > descMaxLength ? '...' : '')
      : [meal.strArea, meal.strCategory].filter(Boolean).join(' • ')
  );

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    desc,
    img: meal.strMealThumb ? `${meal.strMealThumb}${appendToImage}` : undefined,
  };
}

/**
 * Transforms an array of Meal objects into RecipeGridListItem array
 * @param meals Array of meal objects to transform
 * @param options Transformation options
 * @returns Array of RecipeGridListItem
 */
export function transformMealsToGridItems(
  meals: Array<Pick<Meal, 'idMeal' | 'strMeal' | 'strInstructions' | 'strArea' | 'strCategory' | 'strMealThumb'>>,
  options: TransformMealOptions = {}
): RecipeGridListItem[] {
  return meals.map(meal => transformMealToGridItem(meal, options));
}
