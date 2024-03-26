describe('login page', () => {
  it('Invalid password', () => {
    cy.visit(' https://localhost:3000/login');

    cy.get('input[data-cy="input-email"]').type("test@gmail.com");
    cy.get('input[data-cy="input-password"]').type("Idontexist"); 
  
    cy.get('button[data-cy="submit"]').click();

    cy.wait(1500);
    // Wait for the toast notification to appear
    cy.get('.Toastify__toast--error').should('be.visible');
    cy.get('.Toastify__toast--error').should('contain', 'Er is iets fout gegaan, probeer het later opnieuw!'); 
  });



  it('Redirect to register link', () => {
    cy.visit(' https://localhost:3000/login');

    cy.get('[data-cy="link-register"]').click();
    cy.url().should('match', /\/register/);
  });




    
});