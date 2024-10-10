const { expect } = require('@playwright/test');

class ProductPage {

    constructor(page) {

        this.page = page;
        this.productName = '.inventory_item_name';
        this.productDetails = '.inventory_item_desc';
        this.productPrice = '.inventory_item_price';
        this.addToCartButton = '#add-to-cart-sauce-labs-bike-light';
        this.cartButton = '.shopping_cart_link';
        this.cartBadge = '.shopping_cart_badge';
        this.pageTitle = '.title';       
        this.checkoutButton = this.page.locator('#checkout');

    }

    async selectProduct() {

        await this.page.click(this.addToCartButton); // Adiciona o produto ao carrinho

    }

    async navigateToCart() {

        await this.page.click(this.cartButton); // Navega até o carrinho

    }

    async validateProductDetails() {

        const productName = await this.page.textContent(this.productName);
        const productDetails = await this.page.textContent(this.productDetails);
        const productPrice = await this.page.textContent(this.productPrice);

        expect(productName).toBe('Sauce Labs Bike Light'); // Valida nome do produto
        expect(productDetails).toBe('A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.'); // Valida descrição do produto
        expect(productPrice).toBe('$9.99'); // Valida preço do produto

    }

    async validateCartBadge() {

        const cartCount = await this.page.textContent(this.cartBadge);
        expect(cartCount).toBe('1'); // Verifica se o ícone do carrinho exibe a quantidade correta

    }


    async proceedToCheckout() {

        await this.checkoutButton.click();

    }

    
    async validateProductPage() {

        await this.page.waitForSelector(this.pageTitle); // Aguarda o seletor estar disponível
        const titleText = await this.page.locator(this.pageTitle).textContent();
        console.log('Texto da página:', titleText); // Log do texto da página
        return titleText.includes('Products'); // Verifica se contém 'Products'

    }  

    async getPageTitle() {
        return await this.page.locator(this.pageTitle).textContent();
    }

    
}
module.exports = ProductPage;