const { expect } = require('@playwright/test');

class UpcomingEventsPage {

    pageTitleTxt = 'Upcoming Events';


    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator("//h1[contains(. , 'Upcoming Events')]");
        this.eventCards = page.locator("[data-testid='event-card']");
        this.ticketCountLocator = page.locator("[id='ticket-count']");
        this.fullnameInput = page.locator("#customerName");
        this.emailInput = page.locator("#customer-email");
        this.phoneInput = page.getByPlaceholder("+91 98765 43210");
        this.bookButton = page.locator(".confirm-booking-btn");
    }

    async assertOnPageTitle() {
        await expect(this.pageTitle).toHaveText(this.pageTitleTxt);;
    }

    async assertEventNameIsPresent(eventName) {
        await expect(this.eventCards.filter({ hasText: eventName })).toHaveCount(1);
    }

    async assertBeforeBookingSeatsIsPresent(eventName) {
        return this.logAvailableSeats(eventName, 'before');
    }

    async assertAfterBookingSeatsIsPresent(eventName) {
        return this.logAvailableSeats(eventName, 'after');
    }

    async logAvailableSeats(eventName, point) {
        const eventCard = this.eventCards.filter({ hasText: eventName });
        await expect(eventCard).toHaveCount(1);

        const seatsLabel = eventCard.getByText('seats available');
        await expect(seatsLabel).toBeVisible();
        const seatsText = await seatsLabel.textContent();
        const seatsAvailable = Number.parseInt(seatsText, 10);
        expect(Number.isNaN(seatsAvailable)).toBe(false);

        console.log(`Seats ${point} booking for ${eventName}: ${seatsAvailable}`);
        return seatsAvailable;
    }

    async clickBookNowButton(eventName) {
        const eventCard = this.eventCards.filter({ hasText: eventName });
        await expect(eventCard).toHaveCount(1);
        await eventCard.getByRole('link', { name: 'Book Now' }).click();
    }

    async assertTicketCountAfterBooking(expectedCount) {
        const ticketCountText = await this.ticketCountLocator.textContent();
        const ticketCountInt = parseInt(ticketCountText);
        expect(ticketCountInt).toBe(expectedCount);
        console.log(`Ticket count after booking: ${ticketCountInt}`);
    }

    async fillBookingDetails(fullname, email, phone) {
        await this.fullnameInput.fill(fullname);
        await this.emailInput.fill(email);
        await this.phoneInput.fill(phone);
    }

    async clickBookButton() {
        await this.bookButton.click();
    }

}

module.exports = { UpcomingEventsPage };