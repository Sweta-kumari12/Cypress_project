import HomePage from './HomePage';
import 'cypress-file-upload';
describe('Search', () => {
  let homePage;
  let cartPage;
  let data;
  let searchData;

  beforeEach(() => {
    // Load data from CSV file
    cy.fixture('Data.csv').then((csvData) => {
      data = csvData;
      searchData = parseCsvData(data);
    });

    homePage = new HomePage();

    homePage.visit();
  });

  it('should search for a product and add it to the cart for valid data without login', () => {
    const [productName, productSize, pincode] = searchData[0];
    cy.title().should('contain', 'Shop The Arena'); // Assertion: Verify if the page title contains "Shop The Arena"
    homePage
      .searchProduct(productName) // Search for a product
      .selectProductSize(productSize) // Select the product size
      .enterPincode(pincode) // Enter the pincode for delivery
      .addToCart() ;// Add the product to the cart
    
    cy.wait(4000);
    cy.screenshot(); // Take a screenshot
  });

  it('should search for a product and add it to the cart for invalid data without login', () => {
    const [productName, productSize, pincode] = searchData[1];
    cy.title().should('contain', 'Shop The Arena'); // Assertion: Verify if the page title contains "Shop The Arena"
    // Check if the product search is valid
    if (homePage.searchProductInvalid(productName)) {
      homePage
        .selectProductSize(productSize) // Select the product size
        .enterPincode(pincode) // Enter the pincode for delivery
        .addToCart(); // Add the product to the cart
    }
    cy.screenshot(); // Take a screenshot
  });

  it('Search after login for invalid data', () => {
    const [productName, productSize, pincode, Email, password] = searchData[3];
    cy.title().should('contain', 'Shop The Arena'); // Assertion: Verify if the page title contains "Shop The Arena"
    homePage
      .login() // Perform login
      .setEmail(Email) // Set the email
      .setPassword(password) // Set the password
      .clickLoginButtun(); // Click the login button

    cy.wait(4000);

    // Check if the product search is valid
    if (homePage.searchProductInvalid(productName)) {
      homePage
        .selectProductSize(productSize) // Select the product size
        .enterPincode(pincode) // Enter the pincode for delivery
        .addToCart(); // Add the product to the cart
    }
    cy.screenshot(); // Take a screenshot
  });

  it('Search after login for valid data', () => {
    const [productName, productSize, pincode, Email, password] = searchData[2];
    cy.title().should('contain', 'Shop The Arena'); // Assertion: Verify if the page title contains "Shop The Arena"
    homePage.login(); // Perform login
    homePage.setEmail(Email); // Set the email
    homePage.setPassword(password); // Set the password

    cy.wait(4000);

    homePage
      .searchProduct(productName) // Search for a product
      .selectProductSize(productSize) // Select the product size
      .enterPincode(pincode) // Enter the pincode for delivery
      .addToCart(); // Add the product to the cart

    cy.wait(4000);
    cy.screenshot(); // Take a screenshot
  });

  function parseCsvData(csvData) {
    const rows = csvData.split('\n');
    const headers = rows[0].split(',');

    // Parse CSV data and return as an array of arrays
    return rows.slice(1).map((row) => row.split(','));
  }
});