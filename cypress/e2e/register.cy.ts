describe('register page', () => {
  it('Should show validation when complexity of password is not met', () => {
    cy.visit(' https://localhost:5173/register');

    cy.get('input[data-cy="input-email"]').type("test@gmail.com");
    cy.get('input[data-cy="input-password"]').type("iamnotcomplex");

    cy.get('button[data-cy="submit"]').click();

    cy.get('[data-cy="error-password"').should('exist');
  })
  
  it('Should redirect user on succesful register to 2fa activation screen', () => {

    const email = `${Date.now()}@aharotest.com`;
    const password = "Greenbacca2003!";


    cy.visit(' https://localhost:5173/register');

    cy.get('input[data-cy="input-email"]').type(email);
    cy.get('input[data-cy="input-password"]').type(password);

    // Save email and password for later use
    cy.wrap(email).as('registeredEmail');
    cy.wrap(password).as('registeredPassword');

    cy.get('button[data-cy="submit"]').click();
    cy.url().should('match', /\/login/);
  })

  it('Redirect to login link', () => {
    cy.visit(' https://localhost:5173/register');

    cy.get('[data-cy="link-login"]').click();
    cy.url().should('match', /\/login/);
  });

  it('Should login using the registered email and password', function() {
    // Retrieve the registered email and password from aliases
    const email = this.registeredEmail;
    const password = this.registeredPassword;

    cy.visit('https://localhost:5173/login');

    cy.get('input[data-cy="input-email"]').type(email);
    cy.get('input[data-cy="input-password"]').type(password);

    cy.get('button[data-cy="submit"]').click();

    cy.get('h1[data-cy="page-title"]').should('contain', '2FA inschakelen');
  });
});

