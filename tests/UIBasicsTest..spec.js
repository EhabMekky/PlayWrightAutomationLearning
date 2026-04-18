const {test, expect} = require('@playwright/test')

// test is a function provided by Playwright to define a test case. It takes two arguments: the name of the test and an asynchronous function that contains the test logic. The 'browser' parameter is passed to the asynchronous function, allowing you to interact with the browser instance during the test.
// Fixtures are a way to set up and tear down the test environment. They can be used to create a browser instance, navigate to a specific URL, or perform any necessary setup before the test runs. In this case, the 'browser' fixture is likely being used to create a browser instance that can be used within the test.
test('First Playwright Test Broswer context', async ({browser})=> //anonymous function
{
   // context 
   // chrome - plugin / cookies 
   const context = await browser.newContext(); // Create new broswer session & add await to allow session to opne
   const page = await context.newPage();
   const URL = "https://rahulshettyacademy.com/loginpagepractise/";
   await page.goto(URL);

   let title = await page.title();
   console.log(title);
   await expect(page).toHaveTitle(title);
});

test('First Playwright Test', async ({page})=> //anonymous function
{
   URL = "https://google.com";
   await page.goto(URL);

   //get the title of page - assert 
   let title = await page.title();
   console.log(title);
   await expect(page).toHaveTitle(title);
});