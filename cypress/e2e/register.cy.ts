describe('register page', () => {
  it('Should show validation when complexity of password is not met', () => {
    cy.visit(' https://localhost:3000/register');

    cy.get('input[data-cy="input-email"]').type("test@gmail.com");
    cy.get('input[data-cy="input-password"]').type("iamnotcomplex");

    cy.get('button[data-cy="submit"]').click();

    cy.get('[data-cy="error-password"').should('exist');
  })
  
  it('Redirect user on succesful login to 2fa activation screen after fresh register', () => {

    const email = `${Date.now()}@aharotest.com`;
    const password = "Greenbacca2003!";


    cy.visit(' https://localhost:3000/register');

    cy.get('input[data-cy="input-email"]').type(email);
    cy.get('input[data-cy="input-password"]').type(password);

    // Save email and password for later use
    cy.wrap(email).as('registeredEmail');
    cy.wrap(password).as('registeredPassword');

    cy.get('button[data-cy="submit"]').click();
    cy.url().should('match', /\/login/);
  })



  it('Redirect to login link', () => {
    cy.visit(' https://localhost:3000/register');

    cy.get('[data-cy="link-login"]').click();
    cy.url().should('match', /\/login/);
  });


  it('Cant register same email', function() {
    const email = this.registeredEmail;
    const password = this.registeredPassword;

    cy.visit(' https://localhost:3000/register');

    cy.get('input[data-cy="input-email"]').type(email);
    cy.get('input[data-cy="input-password"]').type(password);

    cy.get('button[data-cy="submit"]').click();


    cy.wait(1500);
    // Wait for the toast notification to appear
    cy.get('.Toastify__toast--error').should('be.visible');
    cy.get('.Toastify__toast--error').should('contain', 'Je account kon niet aangemaakt worden, probeer het later opnieuw'); 
  })
  


  it('Should login using the registered email and password and redirect to 2FA activation', function() {
    // Retrieve the registered email and password from aliases
    const email = this.registeredEmail;
    const password = this.registeredPassword;

    cy.visit('https://localhost:3000/login');

    cy.get('input[data-cy="input-email"]').type(email);
    cy.get('input[data-cy="input-password"]').type(password);

    cy.get('button[data-cy="submit"]').click();

    cy.get('h1[data-cy="page-title"]').should('contain', '2FA inschakelen');
  });


  
});

