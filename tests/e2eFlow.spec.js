const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const DashboardPage = require('../pages/DashboardPage');
const CartPage = require('../pages/Cart');
const CheckoutPage = require('../pages/CheckoutPage');
const testData = require('../utils/testData');
const data = testData.checkoutDetails;

test.describe('E2E Shopping Flow', () =>{
    test.only('Complete purchase flow - Add to cart and checkout', async({ page })=>
    {
         const loginPage = new LoginPage(page);
         const dashboardPage = new DashboardPage(page);
         const cartPage = new CartPage(page);
         const checkoutPage = new CheckoutPage(page);

         await loginPage.goto();
         await loginPage.assertOnPageTitle();
         await loginPage.login(testData.validUser.email, testData.validUser.password);  

         await dashboardPage.assertOnDashboardTitle();
         await dashboardPage.getProductsCount();
         await dashboardPage.addProductToCart(testData.products.adidas);
         await dashboardPage.addProductToCart(testData.products.iphone);
         await dashboardPage.addProductToCart(testData.products.zara);

         await expect.poll(async () => { // Polling function to check the cart count
           return await dashboardPage.getCartCount();
           }).toBe(3);
         await dashboardPage.navigateToCart(); 
        
         await cartPage.assertCartProductsCount(3);
         await cartPage.removeProductFromCart(testData.products.iphone);
         await cartPage.assertCartProductsCount(2);
         await cartPage.proceedToCheckout();

         await checkoutPage.selectCountry(testData.checkoutDetails.country);
         await checkoutPage.enterPaymentDetails(data.cvv, data.nameOnCard, data.cardNumber);
         await checkoutPage.enterCouponCode(data.couponCode);
         await checkoutPage.assertCouponApplied();
         await checkoutPage.placeOrder();
    });
});
