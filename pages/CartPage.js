const { expect } = require('@playwright/test');

/**
 * CartPage class represents the shopping cart page in the web application.
 * This class contains methods to interact with and validate elements on the cart page.
 */

class CartPage {

    constructor(page) {

        this.page = page;
        this.pageTitle = '.title';

    }

    /**
     * Validates that the user is on the cart page by checking the page title.
     * This method waits for the title element and asserts that its text content is 'Your Cart'.*/
    

    async validateCartPage() {

        const title = await this.page.textContent(this.pageTitle);
        expect(title).toBe('Your Cart');
    }
    
}
module.exports = CartPage;