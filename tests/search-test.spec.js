const {test, expect} = require('@playwright/test');

test('Navigate to Amazon Egypt and search for gaming mouse', async ({page}) => {
  // Navigate directly to Amazon
  await page.goto('https://www.amazon.eg/-/en/ref=nav_logo', { timeout: 60000 });

  // Wait for search box to be visible
  await page.locator('#twotabsearchtextbox').waitFor({ state: 'visible', timeout: 60000 });

  // Get the title
  let title = await page.title();
  console.log('Page title:', title);

  // Search for gaming mouse
  const searchBox = page.locator('#twotabsearchtextbox');
  await searchBox.fill('gaming mouse');
  await searchBox.press('Enter');

  // Wait for results
  await page.waitForLoadState('domcontentloaded', { timeout: 60000 });
  console.log('Search results page title:', await page.title());
});