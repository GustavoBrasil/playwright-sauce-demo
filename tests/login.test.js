// tests/loginScenarios.test.js

// This test suite covers various login scenarios using different user types and credentials.
// It includes both valid and invalid login attempts and verifies the system's response.

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');  // Importing the LoginPage class
const ProductPage = require('../pages/ProductPage');  // Importing the ProductPage class
const { validLogins, invalidLogins } = require('../data/loginData'); // User credentials for login

test.describe('Login Scenarios', () => {

  let loginPage, productPage;

  // beforeEach block runs before each test case to set up the login and product pages
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);  // Initialize LoginPage with the current page
    productPage = new ProductPage(page);  // Initialize ProductPage with the current page
    await loginPage.navigate();  // Navigate to the login page
    const isLoginPage = await loginPage.validateLoginPage();  // Check if the login page is loaded
    expect(isLoginPage).toBeTruthy();  // Expect login page to load successfully
  });

  // Test case: successful login using valid credentials
  // This test verifies that a valid user can log in successfully and land on the Products page.
  test('Should login successfully with valid user credentials', async ({}) => {
    const { username, password } = validLogins[0];  // Retrieve credentials for "standard_user"
    await loginPage.login(username, password);  // Perform login
    const isLoggedIn = await productPage.validateProductPage();  // Validate if navigated to the Products page
    expect(isLoggedIn).toBeTruthy();  // Expect the login to be successful
  });

  // Test case: failed login using locked_out_user
  // This test checks the behavior when trying to log in with a locked-out user.
  test('Should fail to login with user "locked_out_user"', async ({}) => {
    const { username, password } = invalidLogins[1];  // Retrieve credentials for "locked_out_user"
    await loginPage.login(username, password);  // Attempt login
    const errorMsg = await loginPage.getErrorMessage();  // Capture the error message
    expect(errorMsg).toContain('Epic sadface: Sorry, this user has been locked out.');  // Verify correct error message
  });

  // Test case: failed login with incorrect credentials
  // This test validates the error message when incorrect username or password is used.
  test('Should fail to login with incorrect user credentials', async ({}) => {
    const { username, password } = invalidLogins[0];  // Retrieve incorrect credentials
    await loginPage.login(username, password);  // Attempt login
    const errorMsg = await loginPage.getErrorMessage();  // Capture error message
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');  // Verify the error message
  });

  // Test case: login with "performance_user"
  // This test checks the login functionality for a user with performance issues.
  test('Should login with user "performance_user"', async ({}) => {
    const { username, password } = invalidLogins[2];  // Retrieve credentials for "performance_user"
    await loginPage.login(username, password);  // Perform login
    const isLoggedIn = await productPage.validateProductPage();  // Validate if the Products page is loaded
    expect(isLoggedIn).toBeTruthy();  // Expect successful login despite performance issues
  });

  // Test case: login with "problem_user"
  // This test verifies the login behavior for a user known to cause issues in the system.
  test('Should login with user "problem_user"', async ({}) => {
    const { username, password } = invalidLogins[3];  // Retrieve credentials for "problem_user"
    await loginPage.login(username, password);  // Perform login
    const isLoggedIn = await productPage.validateProductPage();  // Check if navigated to the Products page
    expect(isLoggedIn).toBeTruthy();  // Expect successful login despite potential issues

    // Additional verification for anomalies post-login
    const pageTitle = await productPage.getPageTitle();  // Get the title of the current page
    expect(pageTitle).toBe('Products');  // Verify the page title is correct
  });

  // Test case: login with "error_user"
  // This test checks the login functionality for a user prone to errors.
  test('Should login with user "error_user"', async ({}) => {
    const { username, password } = invalidLogins[4];  // Retrieve credentials for "error_user"
    await loginPage.login(username, password);  // Perform login
    const isLoggedIn = await productPage.validateProductPage();  // Validate if navigated to the Products page
    expect(isLoggedIn).toBeTruthy();  // Expect successful login despite the user being prone to errors
  });

  // Test case: login with "visual_user"
  // This test validates the login process for a user with visual challenges.
  test('Should login with user "visual_user"', async ({}) => {
    const { username, password } = invalidLogins[5];  // Retrieve credentials for "visual_user"
    await loginPage.login(username, password);  // Perform login
    const isLoggedIn = await productPage.validateProductPage();  // Validate if navigated to the Products page
    expect(isLoggedIn).toBeTruthy();  // Expect successful login
  });

});