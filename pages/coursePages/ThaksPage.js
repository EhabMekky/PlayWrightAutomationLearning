const { expect } = require('@playwright/test');

class ThanksPage {

    constructor(page) {
        this.page = page;
        this.thanksMessage = page.locator("(//td[@align='center'])[2]");
        this.productsCount = page.locator("div[class='ng-star-inserted'] tr");
    }

    async assertThanksMessage()
    {
        await expect(this.thanksMessage).toHaveText('Thankyou for the order.');
    }

    async getProductsCount(productCount)
    {
        await expect(this.productsCount).toHaveCount(productCount);
    }
}

module.exports = ThanksPage;