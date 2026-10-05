const { expect } = require('@playwright/test');

class newEventPage {

    constructor(page) {
        this.page = page;

        this.pageTitle = page.getByText('+ New Event');
        this.titleInput = page.locator('#event-title-input');
        this.descriptionInput = page.getByPlaceholder('Describe the event…');
        this.categoryDropdown = page.locator('#category');
        this.city = page.locator('#city');
        this.venue = page.locator('#venue');
        this.date = page.locator('[id="event-date-&-time"]');
        this.price = page.locator('[id="price-($)"]');
        this.seats = page.locator('#total-seats');
        this.submitButton = page.getByRole('button', { name: '+ Add Event' });
    }

    async assertOnPageTitle() {
        await expect(this.pageTitle).toHaveText('+ New Event');
    }

    async fillEventDetails(title, description, city, venue, date, price, seats) {
        await this.titleInput.fill(title);
        await this.descriptionInput.fill(description);
        await this.city.fill(city);
        await this.venue.fill(venue);
        await this.date.fill(date);
        await this.price.fill(price);
        await this.seats.fill(seats);
    }

    async selectCategory(category) {
        await this.categoryDropdown.selectOption(category);
    }

    async submitEvent() {
        await this.submitButton.click();
    }

    async assertEventCreated(title) {
        await this.page.getByText(title).waitFor();
    }
}

module.exports = { newEventPage };