const { test, expect } = require('../pages/assignment1/fixtures');
const testData = require('../utils/testData');

const data = testData.validNewBrandUser;
const eventData = testData.newEventDetails

test.describe('Assignment 2 Test Cases', () => {

    test.only("Eligibility Test Case", async ({ loginPage, homePage, upcomingEventsPage, myBooking }) => {
        await loginPage.navigateToLoginPage();
        await loginPage.assertOnPageTitle();
        await loginPage.login(data.email, data.password);
        await homePage.assertOnPageTitle();
        await homePage.clickBrowserEventsButton();
        await upcomingEventsPage.assertOnPageTitle();
        await upcomingEventsPage.clickBookNowButton(eventData.title);
        await upcomingEventsPage.fillBookingDetails(testData.bookkingCustomerDetails.fullname, testData.bookkingCustomerDetails.email, testData.bookkingCustomerDetails.phone);
        await upcomingEventsPage.clickConfirmButton();
        await homePage.clickMyBooking();
        await myBooking.assertOnMyBookingPage();
        await myBooking.assertOnTodaysEvent(testData.refundDate);
        await myBooking.clickOnViewDetailsButton();
        await myBooking.assertBookingRefIsPresent(testData.bookkingCustomerDetails.email);
        await myBooking.assertEventNameIsPresent(eventData.title);
        await myBooking.clickRefundLink();
        await myBooking.assertRefundLinkResult();
    });
});
