const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;

     // Locators 
        this.pageTitle = page.locator("[class='login-title']");
        this.email = page.locator('#userEmail');
        this.password = page.locator('#userPassword');
        this.loginButton = page.locator("[id='login']");
        this.errorMessage = page.locator("//div[@class='ng-star-inserted']");

    }

    async goto()
    {
        await this.page.goto("https://www.rahulshettyacademy.com/client/#/auth/login");
    }

    async login(email, password)
    {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
        await this.page.waitForLoadState('networkidle'); // Wait for the network to be idle, indicating that all products have loaded
    }

    async getErrorMessage()
    {
        return await this.errorMessage.textContent();
    }

    async assertOnPageTitle()
    {
        expect(await this.pageTitle.textContent()).toBe('Log in');
    }

    async isLoginButtonVisible()
    {
        return await this.loginButton.isVisible();
    }

}
    module.exports = LoginPage;
