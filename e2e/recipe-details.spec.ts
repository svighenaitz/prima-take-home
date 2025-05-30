import { test, expect } from '@playwright/test';

test.describe('Recipe Details Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('should navigate to recipe details when a recipe is clicked', async ({ page }) => {
    // Wait for recipe cards to load
    const recipeCards = page.getByTestId('recipe-card');
    await expect(recipeCards.first()).toBeVisible({ timeout: 10000 });
    
    // Get the first recipe's title and ID
    const firstRecipe = recipeCards.first();
    const recipeTitle = await firstRecipe.getByRole('heading').first().textContent();
    const recipeId = await firstRecipe.getAttribute('data-recipe-id');
    
    // Click on the first recipe card
    await firstRecipe.click();
    
    // Verify navigation to recipe details page
    await expect(page).toHaveURL(/\/explore\/id\/\d+/, { timeout: 10000 });
    
    // Verify we're on the recipe detail page and the title is visible
    await expect(page.getByTestId('recipe-detail-page')).toBeVisible();
    await expect(
      page.locator('[data-testid="recipe-detail-page"] h1').filter({ hasText: recipeTitle! })
    ).toBeVisible();
  });

  
});
