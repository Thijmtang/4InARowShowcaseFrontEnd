import { FormCard } from "../../src/components/FormCard"

describe('Formcard', () => {
  it('Copies given children', () => {
    cy.mount(<FormCard>test</FormCard>)
    cy.get('div').should('contain', 'test');
  })
})