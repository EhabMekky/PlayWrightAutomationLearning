const { expect } = require('@playwright/test');

class myBooking {
    constructor(page) {
        this.page = page;
        this.url = 'https://eventhub.rahulshettyacademy.com/bookings';
        this.pageTitle = "EventHub — Discover & Book Events";
        this.todayEvent = (date) => page.locator(`//div[@id='booking-card'][1]/div[1]/div[1]/div[2]/span[contains(.,'${date}')]`);
        this.viewDetailsButton = page.locator("//div[@id='booking-card'][1]//a")
        this.bookingRef = (email) => page.locator(`(//span[contains(.,'${email}')])[1]`);
        this.eventName = (eventName) => page.locator(`//span[contains(.,'${eventName}')][1]`)
        this.refundLink = page.locator("#check-refund-btn")
        this.refundLinkResult = page.locator("#refund-result")
    }

    async assertOnMyBookingPage() {
        await expect(this.page).toHaveURL(this.url);
        await expect(this.page).toHaveTitle(this.pageTitle);
    }

    async assertOnTodaysEvent(date) {
        await expect(this.todayEvent(date)).toBeVisible();
    }

    async clickOnViewDetailsButton() {
        await this.viewDetailsButton.click();
    }

    async assertBookingRefIsPresent(email) {
        await expect(this.bookingRef(email)).toBeVisible();
    }

    async assertEventNameIsPresent(eventName) {
        await expect(this.eventName(eventName)).toBeVisible();
    }

    async clickRefundLink() {
        await this.refundLink.click();
    }

    async assertRefundLinkResult() {
        await expect(this.refundLinkResult).toContainText("Eligible for refund");
    }
}

module.exports = { myBooking };