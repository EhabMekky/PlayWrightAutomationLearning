const { expect } = require('@playwright/test');

class HomePage {

    //Locators
    pageTitleTxt = 'Amazing Events';

    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator("//span[contains(. , 'Amazing Events')]")
        this.adminButton = page.getByRole('button', { name: 'Admin' });
        this.manageEvenetsLink = page.getByRole('navigation').getByRole('link', { name: 'Manage Events' })
        this.eventsNavbar = page.locator("[id='nav-events']");
        this.browserEventsButton = page.locator("//a[@href='/events']/span")
        this.myBooking = page.locator("[id='nav-bookings']")
    }

    async assertOnPageTitle() {
        expect(await this.pageTitle.textContent()).toBe(this.pageTitleTxt);
    }

    async clickAdminButton() {
        await this.adminButton.click();
    }

    async clickManageEventsLink() {
        await this.manageEvenetsLink.click();
    }

    async clickEventsNavbar() {
        await this.eventsNavbar.click();
    }

    async clickBrowserEventsButton() {
        await this.browserEventsButton.click();
    }

    async clickMyBooking() {
        await this.myBooking.click();
    }
}

module.exports = { HomePage };