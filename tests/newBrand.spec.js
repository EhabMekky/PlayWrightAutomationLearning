const { test, expect } = require('../pages/assignment1/fixtures');

const testData = require('../utils/testData');

const data = testData.validNewBrandUser;
const eventData = testData.newEventDetails;
const customerData = testData.bookkingCustomerDetails;


test.describe('New Brand User Login Test', () => {

  test.only('Complete e2e flow to create and manage a new brand event', async ({loginPage, homePage, newEventPage, upcomingEventsPage}) => {
    await loginPage.navigateToLoginPage();
    await loginPage.assertOnPageTitle();
    await loginPage.login(data.email, data.password);
    await homePage.assertOnPageTitle();
    await homePage.clickAdminButton();
    await homePage.clickManageEventsLink();
    await newEventPage.page.waitForLoadState('networkidle'); // Wait for the network to be idle, indicating that all products have loaded
    await newEventPage.assertOnPageTitle();
    await newEventPage.fillEventDetails(eventData.title, eventData.description, eventData.city, eventData.venue, eventData.date, eventData.price, eventData.seats);
    await newEventPage.selectCategory(eventData.category);
    await newEventPage.submitEvent();
    await newEventPage.assertEventCreated(eventData.title);
    await homePage.clickEventsNavbar();
    await upcomingEventsPage.assertOnPageTitle();
    await upcomingEventsPage.assertEventNameIsPresent(eventData.title);
    const seatsBeforeBooking = await upcomingEventsPage.assertBeforeBookingSeatsIsPresent(eventData.title);
    await upcomingEventsPage.clickBookNowButton(eventData.title);
    await upcomingEventsPage.fillBookingDetails(customerData.fullname, customerData.email, customerData.phone);
    await upcomingEventsPage.clickBookButton();
    await homePage.clickEventsNavbar();
    await upcomingEventsPage.page.waitForURL('**/events');
    await upcomingEventsPage.page.reload();
    await upcomingEventsPage.assertEventNameIsPresent(eventData.title);
    const seatsAfterBooking = await upcomingEventsPage.assertAfterBookingSeatsIsPresent(eventData.title);
    expect(seatsAfterBooking).toBeLessThan(seatsBeforeBooking);
    
    // pause page
    await newEventPage.page.pause();
  });

});