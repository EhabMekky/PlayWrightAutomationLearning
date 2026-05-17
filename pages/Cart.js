const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;

        this.cartProducts = page.locator('.cartSection h3');
        this.checkoutButton = page.locator('text=Checkout');
        this.removeButton = page.locator("button[class*='btn-danger']");
    }

    async getCartProdcuts()
    {
        return await this.cartProducts.allTextContents();
    }

    async assertCartProductsCount(expectedCount)
    {
        await expect(this.cartProducts).toHaveCount(expectedCount);
    }

    async isProductInCart(productName)
    {
        const products = await this.getCartProdcuts();
        return products.includes(productName);
    }

    async removeProductFromCart(productName)
    {
        const products = await this.getCartProdcuts();
        const index = products.findIndex(product => product.trim() === productName);
        if (index !== -1) {
            await this.removeButton.nth(index).click();
        }
    }

    async proceedToCheckout()
    {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;