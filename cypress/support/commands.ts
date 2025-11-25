/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      login(email?: string, password?: string): Chainable<Subject>;
      addProduct(product: { name: string; price: number; quantity: number; reference: string; imageUrl: string }): Chainable<Subject>;
      deleteProduct(reference: string): Chainable<Subject>;
    }
  }
}

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

// Custom command for login
Cypress.Commands.add('login', (email?: string, password?: string) => {
  cy.session([email, password], () => {
    cy.visit('/auth/login');
    cy.get('input[name="email"]').type(email || '');
    cy.get('input[name="password"]').type(password || '');
    cy.get('button[type="submit"]').click();
    // Wait for the login to complete and redirect to dashboard
    cy.url().should('include', '/dashboard');
  });
});

// Command to add a product
Cypress.Commands.add('addProduct', (product: { name: string; price: number; quantity: number; reference: string; imageUrl: string }) => {
  cy.visit('/dashboard/products/new');
  
  // Fill in the form
  cy.get('input[name="name"]').type(product.name);
  cy.get('input[name="reference"]').type(product.reference);
  cy.get('input[name="price"]').type(product.price.toString());
  cy.get('input[name="quantity"]').type(product.quantity.toString());
  
  // For file upload, we'll just set the value directly since we can't upload files in tests
  cy.get('input[name="imageUrl"]').then(($input) => {
    // @ts-ignore - Setting the value directly for testing
    $input.val(product.imageUrl);
    $input.trigger('change');
  });
  
  // Submit the form
  cy.get('button[type="submit"]').click();
  
  // Verify the product was added
  cy.get('div[role="alert"]').should('contain', 'Product created successfully');
});

// Command to delete a product by reference
Cypress.Commands.add('deleteProduct', (reference: string) => {
  cy.visit('/dashboard/products');
  
  // Find the product row with the given reference and click delete
  cy.contains('tr', reference)
    .find('button:contains("Delete")')
    .click();
  
  // Confirm the deletion
  cy.on('window:confirm', () => true);
  
  // Verify the product was deleted
  cy.get('div[role="alert"]').should('contain', 'Product deleted successfully');
});

export {}
