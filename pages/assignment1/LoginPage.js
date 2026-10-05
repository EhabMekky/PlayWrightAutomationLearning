const { expect } = require('@playwright/test');

class LoginPage{
    
    constructor(page){
        this.page = page;

        this.pageTitle = page.locator("//span[contains(. , 'Rahul Shetty Academy')]")
        this.emailInput = page.locator("#email")  
        this.passwordInput = page.locator("#password")  
        this.signInButton = page.locator("#login-btn")
    }

    async navigateToLoginPage(){
        await this.page.goto('https://eventhub.rahulshettyacademy.com/login');
    }

    async assertOnPageTitle(){
        expect(await this.pageTitle.textContent()).toBe('Rahul Shetty Academy');
    }

    async login(email, password){
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle'); // Wait for the network to be idle, indicating that all products have loaded
    }
}
module.exports = { LoginPage };