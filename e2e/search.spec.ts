import { test, expect } from '@playwright/test';

test.describe('Search Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the home page before each test
    await page.goto('/');
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
