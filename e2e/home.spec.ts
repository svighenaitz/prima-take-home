import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
  });

  test('should load the home page successfully', async ({ page }) => {
    // Verify the page title
    await expect(page).toHaveTitle(/Recipes/);
    
    // Verify main heading is visible
    await expect(page.getByRole('heading', { name: /Quick & Easy/i })).toBeVisible();
    
    // Verify the search form is present
    await expect(page.getByRole('textbox', { name: /search/i })).toBeVisible();
    
    // Verify popular recipes section is present
    await expect(page.getByRole('heading', { name: /Popular Recipes/i })).toBeVisible();
  });

  test('should display popular recipes', async ({ page }) => {
    // Wait for recipe cards to load
    const recipeCards = page.getByTestId('recipe-card');
    await expect(recipeCards.first()).toBeVisible({ timeout: 10000 });
    
    // Verify we have at least one recipe card
    const count = await recipeCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify each card has an image and a title
    for (let i = 0; i < Math.min(count, 3); i++) {
      const card = recipeCards.nth(i);
      await expect(card.getByRole('img')).toBeVisible();
      await expect(card.getByRole('heading')).toBeVisible();
    }
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

  test('should allow searching for recipes', async ({ page }) => {
    // Find the search input and button
    const searchInput = page.getByRole('textbox', { name: /search/i });
    
    // Enter a search query
    await searchInput.fill('pasta');
    
    // Verify we're on the explore page with the search query
    await expect(page).toHaveURL(/\/explore\?query=pasta/);
    
    // Verify the search results are displayed
    await expect(page.getByTestId('recipe-card').first()).toBeVisible({ timeout: 10000 });
    
    // Verify we have at least one recipe card in the results
    const recipeCards = page.getByTestId('recipe-card');
    const count = await recipeCards.count();
    expect(count).toBeGreaterThan(0);
  });
});
