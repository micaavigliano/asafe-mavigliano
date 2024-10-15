describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/auth')
  }); 

  it('render the UI', () => {
    cy.get('[data-test-id="title-cypress"]').should('exist')
    .should('have.text', 'Login');
    cy.get('input#email-input').should('exist');
    cy.get('input#password-input').should('exist');
    cy.get('button').contains('Login').should('exist');
  })

  it('switches to sign-up form when button is clicked', () => {
    cy.get('button').contains('Create new account').click();
    cy.get('[data-test-id="title-cypress"]').should('have.text', 'Sign up');
    cy.get('button').contains('Create account').should('exist');
  });

  it('shows an error if the password is too short', () => {
    cy.get('input#email-input').type('test@example.com');
    cy.get('input#password-input').type('123');
    cy.get('button[data-testid="button-switch"]').click();
    cy.contains('Password must be at least 7 characters long.').should('be.visible');
  });

  it('the user is not created show an error message', () => {
    cy.get('[data-testid="email-input"]').type('test3333@gmail.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="button-switch"]').click();
    cy.contains('No user found or invalid password').should('be.visible')
  })

  it('the user creates a new user', () => {
    cy.get('[data-testid="email-input"]').type('test5@gmail.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('button').contains('Create new account').click();
    cy.get('[data-test-id="title-cypress"]').should('have.text', 'Sign up');
    cy.get('button').contains('Create account').click()
    cy.get('[data-test-id="title-cypress"]').should('have.text', 'Login');
    cy.get('[data-testid="email-input"]').type('test4@gmail.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('button').contains('Login').click()
    cy.url().should('include', '/dashboard');
  })
})