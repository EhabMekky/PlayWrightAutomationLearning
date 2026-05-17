const { expect } = require('@playwright/test');


class DashboardPage {
 
    constructor(page) {
        this.page = page;
        this.dashboardTitle = page.locator("//h3[contains(., 'Automation')]");
        this.products= page.locator('.card-body');
        this.productTitle = page.locator(".card-body  h5 b");
        this.addToCartButton = page.locator("button:has-text('Add To Cart')");
        this.cartIcon = page.locator("[routerlink='/dashboard/cart']");
        this.cartCount = page.locator("[routerlink='/dashboard/cart'] label");
    }

    async assertOnDashboardTitle()
    {
        expect(await this.dashboardTitle.textContent()).toBe('Automation');
    }

    async getProductsCount()
    {
        return await this.products.count();
    }

    async addProductToCart(productName)
    {
        const count  = await this.products.count();
        for(let i=0; i < count; i++)
        {
            const title =  await this.productTitle.nth(i).textContent();
            if(title.trim() === productName)
            {
                await this.addToCartButton.nth(i).click();
                await this.page.waitForLoadState('networkidle'); // Wait for the network to be idle, indicating that all products have loaded
                break;
            }
        }
    }

    async getCartCount()
    {
        const text = await this.cartCount.textContent();
        return Number.parseInt(text);
    }

    async getAllProductsTitles()
    {
        return await this.productTitle.allTextContents();
    }

    async navigateToCart()
    {
        await this.cartIcon.click();
        await this.page.waitForLoadState('networkidle'); // Wait for the network to be idle, indicating that all products have loaded
    }
}

module.exports = DashboardPage;