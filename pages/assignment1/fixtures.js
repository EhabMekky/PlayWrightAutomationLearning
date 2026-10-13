const base = require('@playwright/test');
const { LoginPage } = require('./LoginPage');
const { HomePage } = require('./HomePage');
const { newEventPage } = require('./newEventPage');
const { UpcomingEventsPage } = require('./UpcomingEventsPage');
const { myBooking } = require('./myBooking');

// Custom fixtures: page objects are created for you and injected into each test
const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  newEventPage: async ({ page }, use) => {
    await use(new newEventPage(page));
  },
  upcomingEventsPage: async ({ page }, use) => {
    await use(new UpcomingEventsPage(page));
  },
  myBooking: async ({ page }, use) => {
    await use(new myBooking(page));
  }
});

module.exports = { test, expect: base.expect };
