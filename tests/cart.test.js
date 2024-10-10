const { test, expect } = require('@playwright/test');
const { validLogins, invalidLogins } = require('../data/loginData');
const LoginPage = require('../pages/LoginPage');
const ProductPage = require('../pages/ProductPage');
const CartPage = require('../pages/CartPage');

test.describe('Product Selection and Cart Validation', () => {

    let loginPage, productPage, cartPage;

    // This section sets up the common environment before each test.
    // Initializes the LoginPage, ProductPage, and CartPage objects.
    // Ensures the test starts from the login page and verifies that the login page is displayed.
    test.beforeEach(async ({ page }) => {

        loginPage = new LoginPage(page);
        productPage = new ProductPage(page);
        cartPage = new CartPage(page);

        // Navigates to the login page
        await loginPage.navigate();
        const isLoginPage = await loginPage.validateLoginPage();
        expect(isLoginPage).toBeTruthy(); // Verifies if the page is correctly rendered as the login page.

    });

    // Test case for a standard user performing product selection and cart validation.
    test('Standard User - Product Selection and Validation', async () => {

        const { username, password } = validLogins[0]; // Fetches the login credentials of "standard_user".
        await loginPage.login(username, password); // Logs in with the credentials.

        // Selects a product, validates the cart badge (to ensure an item is added), and navigates to the cart.
        await productPage.selectProduct();
        await productPage.validateCartBadge();
        await productPage.navigateToCart();

        // Verifies the details of the selected product within the cart.
        await productPage.validateProductDetails();
    });

    // Test case for "performance_glitch_user" to compare performance during login and product selection.
    test('Performance Glitch User - Product Selection and Compare Performance', async ({ page }) => {

        // Overrides login with the credentials for "performance_glitch_user".
        const { username, password } = invalidLogins[2]; // Fetches the credentials of "performance_glitch_user".
        await loginPage.login(username, password); // Logs in with these credentials.

        const startTime = Date.now(); // Starts the timer to measure performance.

        // Selects a product, validates the cart badge, navigates to the cart, and validates the product details.
        await productPage.selectProduct();
        await productPage.validateCartBadge();
        await productPage.navigateToCart();
        await cartPage.validateCartPage();
        await productPage.validateProductDetails();

        const endTime = Date.now(); // Stops the timer after the product flow.
        const loginTime = endTime - startTime; // Calculates the total time taken for this flow.

        // Logs the performance timing in the console for analysis.
        console.log(`Performance Glitch User login took: ${loginTime} ms`);

        // Appends performance timing details to a log file.
        const fs = require('fs');
        const path = require('path');
        const logFilePath = path.join(__dirname, 'performance_log.txt');
        fs.appendFileSync(logFilePath, `Performance Glitch User login took: ${loginTime} ms\n`, 'utf8');

        // Ensures the login time for "performance_glitch_user" is noticeably longer than for a standard user.
        expect(loginTime).toBeGreaterThan(120); 

    });
});
