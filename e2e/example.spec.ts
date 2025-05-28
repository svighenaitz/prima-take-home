import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should display main heading', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Create T3 App/i })).toBeVisible();
  });
});
