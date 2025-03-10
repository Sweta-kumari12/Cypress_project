class HomePage {
  // Method to get the locator based on name
  getLocator(name) {
    switch (name) {
      case 'productSearchInput':
        return cy.get('div.search-head.hidden-mobile input[type="text"]');
      case 'pincodeInput':
        return cy.get('input[placeholder="Enter your pincode"]');
      case 'emailInput':
        return cy.get('input[name="customer[email]"]:eq(0)');
      case 'passwordInput':
        return cy.get('input[placeholder="Password"]');
      case 'loginButton':
        return cy.get('form#customer_login button[type="submit"]');
      default:
        throw new Error(`Invalid locator name: ${name}`);
    }
  }
  // Method to visit the website
  visit() {
    cy.visit('https://shopthearena.com/', { failOnStatusCode: false });
  }

  // Method to search for a product
  searchProduct(productName) {
    this.getLocator('productSearchInput').click().type(productName);
    cy.wait(4000);
    cy.contains(productName).click();
    return this; // return the instance of the page object for method chaining
  }

  // Method to search for an invalid product
  searchProductInvalid(productName) {
    this.getLocator('productSearchInput').click().type(productName);
    cy.wait(4000);
    if (cy.contains("No results found for")) {
      cy.log("Product not found");
      return false;
    }
    // return the instance of the page object for method chaining
  }

  // Method to select a product size
  selectProductSize(productSize) {
    cy.xpath("//label[contains(text(),'" + productSize + "')]").click();
    return this; // return the instance of the page object for method chaining
  }

  // Method to enter a pincode
  enterPincode(pincode) {
    this.getLocator('pincodeInput').click().type(pincode);
    return this; // return the instance of the page object for method chaining
  }

  // Method to add the product to the cart
  addToCart() {
    cy.contains('Add to cart').click();
    return this; // return the instance of the page object for method chaining
  }

  // Method to set the email
  setEmail(email) {
    this.getLocator('emailInput').click().type(email);
    return this;
  }

  // Method to set the password
  setPassword(password) {
    this.getLocator('passwordInput').click().type(password);
    return this;
  }

  // Method to click the login button
  clickLoginButtun() {
    this.getLocator('loginButton').click();
  }

  // Method to perform login
  login() {
    cy.get('a.Header__Icon.Icon-Wrapper.Icon-Wrapper--clickable.hidden-phone').click();
    return this;
  }

  
 
  
}

export default HomePage;