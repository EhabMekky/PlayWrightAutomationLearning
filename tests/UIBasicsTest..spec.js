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

   
   //Locator - find element on page
   // css and xpath

   // ton type use type or fill
   await page.locator('#username').fill('rahulshetty');
   await page.locator('#password').fill('Learning@830$3mK2');
   await page.locator('#signInBtn').click();
   await page.locator('[style*="block"]').textContent().then(text => console.log(text)); // get the text of error message and print it in console
   await expect(page.locator('[style*="block"]')).toHaveText('Incorrect username/password.'); // assert the error message
   

   //await page.expect(page.locator('#h1[class=\'my-4\']')).toHaveText('Shop Name');
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

test('Valid login', async ({ page }) => {
   const URL = 'https://rahulshettyacademy.com/loginpagepractise/';
   await page.goto(URL);

   await page.locator('#username').fill('rahulshettyacademy');
   await page.locator('#password').fill('Learning@830$3mK2');
   await page.locator('#signInBtn').click();

   const productsTitles = page.locator('.card-body a');

   const productTexts = await productsTitles.nth(0).textContent();// get the text of first product and print it in console  
  // const productTexts = await productsTitles.first().textContent();  
   console.log(productTexts);

   await expect(page).toHaveTitle('ProtoCommerce');
   console.log(await page.title());
   await expect(productsTitles).toHaveCount(4); // assert the number of products
   await expect(await page.title()).toBe('ProtoCommerce'); // assert the title of page

   const allProductTexts = await productsTitles.allTextContents(); // get the text of all products and print it in console 
   console.log(allProductTexts);
});