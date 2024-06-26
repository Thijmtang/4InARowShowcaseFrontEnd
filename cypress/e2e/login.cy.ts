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

  
  it('No access to lobby if not logged in', () => {
    cy.visit(' https://localhost:3000/lobby');

    cy.get('[data-cy="input-title"]').should('contain', 'Login');
  });


  it('No access to gameroom if not logged in', () => {
    cy.visit(' https://localhost:3000/game');

    cy.get('[data-cy="input-title"]').should('contain', 'Login');
  });


  it('No access to admin page if not logged in', () => {
    cy.visit(' https://localhost:3000/admin');

    cy.get('[data-cy="input-title"]').should('contain', 'Login');
  });

});