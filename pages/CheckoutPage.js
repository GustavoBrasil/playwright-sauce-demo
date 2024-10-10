const { faker } = require('@faker-js/faker');
const { expect } = require('@playwright/test');

/**
 * The CheckoutPage class encapsulates all interactions and validations
 * related to the checkout process in the application.
 */

class CheckoutPage {    


    constructor(page) {

        // Page elements for checkout process
        this.page = page;
        this.checkoutTitle = '.title';
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.zipCodeInput = '#postal-code';
        this.continueButton = '#continue';
        this.paymentInfo = "div[data-test='payment-info-value']";
        this.shippingInfo = "div[data-test='shipping-info-value']";
        this.itemTotalLabel = ".summary_subtotal_label";
        this.taxLabel = ".summary_tax_label";
        this.totalLabel = ".summary_total_label";

    }

    /**
     * Fills the checkout form with randomly generated data using Faker.
     */

    async fillCheckoutForm() {

        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const zipCode = faker.location.zipCode();
    
        
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.zipCodeInput, zipCode);
    
        console.log(`Checkout data: ${firstName} ${lastName}, Zip: ${zipCode}`);
    
        
        await this.page.click(this.continueButton);

    }

     /**
     * Validates if the checkout page is displayed by checking the page title.
     * @returns {boolean} True if the title includes 'Checkout'.
     */

    async validateCheckoutPage() {

        await this.page.waitForSelector(this.checkoutTitle); 
        const titleText = await this.page.textContent(this.checkoutTitle);
        return titleText.includes('Checkout'); 

    }

     /**
     * Validates payment details, shipping information, and price values.
     */

    async validateCheckoutDetails() {

        
        // Validate payment information
        const paymentInfoText = await this.page.textContent(this.paymentInfo);
        expect(paymentInfoText).toContain('SauceCard'); // Checks if the payment method has the text 'SauceCard'

        // Validate shipping information
        const shippingInfoText = await this.page.textContent(this.shippingInfo);
        expect(shippingInfoText).toBe('Free Pony Express Delivery!'); // Ensures the shipping info is correct

        // Validate item total
        const itemTotalText = await this.page.textContent(this.itemTotalLabel);
        const itemTotalValue = parseFloat(itemTotalText.replace('Item total: $', ''));
        expect(itemTotalValue).toBe(9.99); // Validates that the item total is $9.99

        // Validate tax
        const taxText = await this.page.textContent(this.taxLabel);
        const taxValue = parseFloat(taxText.replace('Tax: $', ''));
        expect(taxValue).toBe(0.80); // Ensures the tax amount is $0.80

        // Validate total price
        const totalText = await this.page.textContent(this.totalLabel);
        const totalValue = parseFloat(totalText.replace('Total: $', '')).toFixed(2); // Rounds the total value to 2 decimal places
        expect(totalValue).toBe('10.79'); // Checks if the total price is $10.79

        // Validate the sum of item total and tax matches the total price
        const calculatedTotal = (itemTotalValue + taxValue).toFixed(2); // Rounds the sum of item total and tax to 2 decimal places
        expect(calculatedTotal).toBe('10.79'); // Ensures the sum matches the total price

    }
}

module.exports = CheckoutPage;