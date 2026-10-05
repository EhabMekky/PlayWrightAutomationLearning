import{test, expect} from '@playwright/test';

test('PlayWright special locators', async ({page}) => {

    await page.goto('https://www.rahulshettyacademy.com/angularpractice/');

    await page.getByLabel('Check me out if you Love IceCreams!').click();

    await page.getByLabel('Employed').check();

    await page.getByLabel('Gender').selectOption('Female');

    await page.getByPlaceholder('Password').fill('rahulshettyacademy');

    await page.getByRole('button', { name: 'Submit' }).click();

    await page.getByText('Success! The Form has been submitted successfully!.').waitFor();

    await page.getByRole('link', { name: 'Shop' }).click();

    await page.locator('app-card > div').filter({ hasText: 'Blackberry' }).getByRole('button', { name: 'Add' }).click();


    //assert on page title
    await expect(page).toHaveTitle('ProtoCommerce');


    await page.pause();

    
})