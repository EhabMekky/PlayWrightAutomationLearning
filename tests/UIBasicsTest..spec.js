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
   await page.locator('[style*="block"]').inputValue().then(text => console.log(text)); // get the text of error message and print it in console
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

test("UI Controls", async ({ page }) => {
   const URL = 'https://rahulshettyacademy.com/loginpagepractise/';
   await page.goto(URL);

   // Test UI controls here
   const email = page.locator('#username');
   const password = page.locator('#password');
   const dropdown = page.locator('select.form-control');
   const radioButtons = page.locator('.radiotextsty');
   const okayButton = page.locator('#okayBtn');
   const checkbox = page.locator('#terms');
   const blinkLink = page.locator("[href*='documents-request']");

   await email.fill('rahulshettyacademy');
   await password.fill('Learning@830$3mK2');
   await dropdown.selectOption('consult'); // Select option by value
   await radioButtons.nth(1).click(); // Check the second radio button (index starts from 0) or use first and last
   await expect(radioButtons.nth(1)).toBeChecked(); // Assert that the second radio button is checked
   await expect(okayButton).toBeVisible(); // Assert that the okay button is visible
   await okayButton.click(); // Click the okay button to close the alert
   await checkbox.uncheck(); // Uncheck the checkbox
   await expect(checkbox).not.toBeChecked(); // Assert that the checkbox is not checked
   expect(await checkbox.isChecked()).toBeFalsy(); // Another way to assert that the checkbox is not checked
   await expect(blinkLink).toHaveAttribute('class', 'blinkingText'); // Assert that the link has the correct class attribute
   //await page.pause(); // Pause the test execution to inspect the page and interact with it manually
   
});


test("Child Windows", async ({ browser }) => {
   const context = await browser.newContext();
   const page = await context.newPage();

   const URL = 'https://rahulshettyacademy.com/loginpagepractise/';
   const blinkLink = page.locator("[href*='documents-request']");
   const email = page.locator('#username');


   await page.goto(URL);

   const [newPage] = await Promise.all([
   // switch to child window, listen for new page event and click the link to open the child window
   context.waitForEvent('page'),  blinkLink.click()]);// Click the link to open the child window

   const redText = newPage.locator("p[class*='red']");

   const text = await redText.textContent(); // get the text of red text and print it in console
   console.log(text);
   const arrayText = text.split("@"); // split the text by @ and get the email id
   const domian = arrayText[1].split(" ")[0]
   console.log(domian);

   // switch back to parent window and enter the email id in email field
   await page.bringToFront(); // bring the parent window to front
   await email.fill(domian);
   console.log(await email.inputValue()); // get the value of email field and print it in console
   await page.pause(); // Pause the test execution to inspect the page and interact with it manually
});