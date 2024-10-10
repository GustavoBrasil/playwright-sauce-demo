// tests/checkoutFlow.test.js

// Import Playwright's test and expect functions for running and validating tests
const { test, expect } = require('@playwright/test');
// Import the page object classes for the Product, Checkout, and Login pages
const ProductPage = require('../pages/ProductPage');
const CheckoutPage = require('../pages/CheckoutPage');
const LoginPage = require('../pages/LoginPage');
// Import valid and invalid login credentials for testing
const { validLogins, invalidLogins } = require('../data/loginData');

// Describe a test suite for the End-to-End (E2E) Checkout Flow
test.describe('E2E Checkout Flow', () => {

  let loginPage, productPage, checkoutPage;

  // Common setup before each test in the suite
  test.beforeEach(async ({ page }) => {

    // Initialize instances of the page objects
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    checkoutPage = new CheckoutPage(page);

    // Navigate to the login page and validate the login page has loaded
    await loginPage.navigate();
    const isLoginPage = await loginPage.validateLoginPage();
    expect(isLoginPage).toBeTruthy(); // Assert that the login page is displayed

  });

  // E2E test for a successful checkout with the "standard_user"
  test('Should complete checkout with user "standard_user"', async ({}) => {

    const { username, password } = validLogins[0]; // Get credentials for "standard_user"
    await loginPage.login(username, password); // Perform login
    const isLoggedIn = await productPage.validateProductPage();
    expect(isLoggedIn).toBeTruthy(); // Assert the user is redirected to the product page

    // Select a product and proceed to checkout
    await productPage.selectProduct(); // Add product to cart
    await productPage.validateCartBadge(); // Validate the cart shows the correct quantity
    await productPage.navigateToCart(); // Navigate to the cart page
    await productPage.validateProductDetails(); // Validate the product details in the cart
    await productPage.proceedToCheckout(); // Proceed to checkout

    const isCheckoutPage = await checkoutPage.validateCheckoutPage();
    expect(isCheckoutPage).toBeTruthy(); // Assert the checkout page is displayed
    await checkoutPage.fillCheckoutForm(); // Fill in the checkout form with generated data
    await checkoutPage.validateCheckoutDetails(); // Validate the checkout summary details

  });

  // E2E test for a successful checkout with the "performance_glitch_user"
  test('Should complete checkout with user "performance_glitch_user"', async ({ page }) => {

    await page.setDefaultTimeout(60000); // Set a longer timeout for performance glitches
    const { username, password } = invalidLogins[2]; // Get credentials for "performance_glitch_user"
    await loginPage.login(username, password); // Perform login
    const isLoggedIn = await productPage.validateProductPage();
    expect(isLoggedIn).toBeTruthy(); // Assert the user is redirected to the product page

    // Select a product and proceed to checkout, even with possible performance issues
    await productPage.selectProduct(); // Add product to cart
    await productPage.validateCartBadge(); // Validate the cart shows the correct quantity
    await productPage.navigateToCart(); // Navigate to the cart page
    await productPage.validateProductDetails(); // Validate the product details in the cart
    await productPage.proceedToCheckout(); // Proceed to checkout

    const isCheckoutPage = await checkoutPage.validateCheckoutPage();
    expect(isCheckoutPage).toBeTruthy(); // Assert the checkout page is displayed
    await checkoutPage.fillCheckoutForm(); // Fill in the checkout form with generated data
    await checkoutPage.validateCheckoutDetails(); // Validate the checkout summary details

  });
});