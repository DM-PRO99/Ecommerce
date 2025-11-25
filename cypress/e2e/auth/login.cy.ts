describe('Authentication', () => {
  beforeEach(() => {
    // Clear session and visit login page
    cy.clearCookies();
    cy.visit('/auth/login');
  });

  it('should display login form', () => {
    // Check if the login form is visible
    cy.get('form').should('be.visible');
    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible').and('contain', 'Sign in');
  });

  it('should show validation errors', () => {
    // Submit empty form
    cy.get('button[type="submit"]').click();
    
    // Check for validation errors
    cy.get('input[name="email"]:invalid').should('exist');
    cy.get('input[name="password"]:invalid').should('exist');
  });

  it('should show error for invalid credentials', () => {
    // Attempt to login with invalid credentials
    cy.get('input[name="email"]').type('invalid@example.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();
    
    // Check for error message
    cy.get('[role="alert"]').should('be.visible').and('contain', 'Invalid credentials');
  });

  it('should login with valid credentials', () => {
    // Login with environment variables
    cy.login(Cypress.env('email'), Cypress.env('password'));
    
    // Check if redirected to dashboard
    cy.url().should('include', '/dashboard');
    
    // Check if user is logged in by looking for dashboard elements
    cy.get('h1').should('contain', 'Products');
  });
});
