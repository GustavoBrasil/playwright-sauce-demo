// pages/LoginPage.js

/**
 * The LoginPage class encapsulates all interactions and validations
 * related to the login process in the application.
 */

class LoginPage {


    constructor(page) {

      this.page = page;
      
      this.loginLogo = '.login_logo';
      this.userInput = this.page.locator('#user-name');
      this.passwordInput = this.page.locator('#password');
      this.loginButton = this.page.locator('#login-button');
      this.errorMessage = this.page.locator('[data-test="error"]');
      this.title = '.title';

    }
  
    /**
     * Navigates to the login page.
     */
    async navigate() {
      await this.page.goto('/'); // Navigates to the homepage (login page)
  }

  /**
   * Validates that the login page is displayed by checking the presence of the logo.
   * @returns {boolean} True if the logo text contains 'Swag Labs'.
   */
  async validateLoginPage() {
      await this.page.waitForSelector(this.loginLogo); // Waits for the login page logo to be visible
      const titleText = await this.page.locator(this.loginLogo).textContent();
      return titleText.includes('Swag Labs'); // Checks if the logo text is 'Swag Labs'
  }

  /**
   * Logs in using the provided username and password.
   */
  async login(username, password) {
      await this.userInput.fill(username); // Fills in the username
      await this.passwordInput.fill(password); // Fills in the password
      await this.loginButton.click(); // Submits the login form
  }

  /**
   * Validates that the login was successful by checking the page title.
   * @returns {boolean} True if the title is 'Products'.
   */
  async validateLoginSuccess() {
      await this.page.waitForSelector(this.title); // Waits for the title element to be visible
      const titleText = await this.page.locator(this.title).textContent();
      return titleText === 'Products'; // Ensures the page title is 'Products' after login
  }

  /**
   * Retrieves the error message displayed on failed login attempts.
   * @returns {string} The error message text.
   */
  async getErrorMessage() {
      return await this.errorMessage.textContent(); // Returns the text of the error message
  }
}

module.exports = LoginPage;