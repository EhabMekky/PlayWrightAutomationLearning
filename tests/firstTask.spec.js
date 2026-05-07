const { test, expect } = require('@playwright/test');


   const URL = 'https://www.rahulshettyacademy.com/client/#/auth/login';

test('Register User', async({ page })=>
{
   await page.goto(URL);

   let text = 'Practice Website for Rahul Shetty Academy Students';

   const pageTitle = page.locator("div[class='banner'] h1[class='title']");
   const registerButton = page.locator(".btn1");
   const registrationFromTitle = page.locator("h1[class='login-title']");
   const firstName = page.locator('#firstName');
   const lastName = page.locator('#lastName');
   const email = page.locator('#userEmail');
   const phnoneNumber = page.locator('#userMobile');
   const occuaptionDropdown = page.locator('select[formcontrolname="occupation"]');
  async function selectGender(gender) {
     await page.locator(`input[type="radio"][value="${gender}"]`).check();
  }
   const password = page.locator('#userPassword');
   const confirmPassword = page.locator('#confirmPassword');
   const acceptTermsCheckbox = page.locator("input[type='checkbox']");
   const submitButton = page.locator('#login');
   const successMessage = page.locator('h1[class="headcolor"]');

  
  const occuaptionsArr = ['1: Doctor', '2: Student', '3: Engineer', '4: Scientist'];


  console.log(await pageTitle.textContent()); 

  await expect(pageTitle).toHaveText(text);

  await registerButton.click();

  await expect(registrationFromTitle).toBeVisible();

  await firstName.fill('Ehab'); 
  await lastName.fill('Mekky');
  await email.fill('test1@pwc.com');
  await phnoneNumber.fill('1234567890');
  await occuaptionDropdown.selectOption(occuaptionsArr[2]);
  await selectGender('Male');
  await password.fill('Test@1234');
  await confirmPassword.fill('Test@1234');
  await acceptTermsCheckbox.check();
  await submitButton.click();
  await expect(successMessage).toHaveText('Account Created Successfully');
});


test('Login User', async({ page })=>
{
    await page.goto(URL);

    const email = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const loginButton = page.locator('input[value="Login"]');
    const pageNavbarTitle = page.locator("//div[@class='left mt-1']//p[text()='Automation Practice']");
    const productsTitles = page.locator('.card-body h5');
  
    await email.fill('test1@pwc.com');
    await password.fill('Test@1234');
    await loginButton.click();
   //  await expect(pageNavbarTitle).toBeVisible();
   //  console.log(await pageNavbarTitle.textContent());
   //  console.log(await productsTitles.nth(0).textContent());
   //  await expect(productsTitles).toHaveCount(3);

   await page.waitForLoadState('networkidle'); // Wait for the network to be idle, indicating that all products have loaded

   /*
   or use this instead of the above line if u want to wait for a specific product to be visible
       await productsTitles.first().waitFor(); // Wait for the product titles to be visible, indicating that the products have loaded
   */
    const allProductsTitles = productsTitles.allTextContents();
    console.log(await allProductsTitles);
});
