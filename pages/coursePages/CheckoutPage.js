const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;

        this.countryInput = page.locator("[placeholder='Select Country']");
        this.countryDropdownOptions = page.locator("section button span");
        this.placeOrderButton = page.locator("text=Place Order");
        this.cvvInput = page.locator("(//input[@type='text'])[2]");
        this.nameOnCardInput = page.locator("(//input[@type='text'])[1]");
        this.couponCodeInput = page.locator("(//input[@type='text'])[4]");
        this.applyCouponButton = page.locator("//button[contains(., 'Apply')]");
        this.copounSuccessMessage = page.locator("//p[contains(., 'Coupon')]");
        this.cardNumberInput = page.locator("(//input[@type='text'])[3]");
    }

    async selectCountry(countryName)
    {
        await this.countryInput.type(countryName, { delay: 100 });
        await this.countryDropdownOptions.waitFor();
        const count = await this.countryDropdownOptions.count();
        for(let i=0; i < count; i++)
        {
            const text = await this.countryDropdownOptions.nth(i).textContent();
            if (text.toLowerCase().includes(countryName.toLowerCase())) {
                await this.countryDropdownOptions.nth(i).click();
                break;
            }   
        }

    }

    async enterPaymentDetails(cvv, nameOnCard, cardNumber)
    {
        await this.cvvInput.fill(cvv);
        await this.nameOnCardInput.fill(nameOnCard);
        await this.cardNumberInput.fill(cardNumber);
    }

    async enterCouponCode(couponCode)
    {
        await this.couponCodeInput.fill(couponCode);
        await this.applyCouponButton.click();
    }

    async placeOrder()
    {
        await this.placeOrderButton.click();
    }

    async assertCouponApplied()
    {
        await expect(this.copounSuccessMessage).toBeVisible();
    }
}
module.exports = CheckoutPage;