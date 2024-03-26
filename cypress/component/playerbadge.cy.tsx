import PlayerBadge from "../../src/components/4InARow/PlayerBadge";
import { PlayerTypes } from "../../src/lib/enums/PlayerTypes";

describe('Player turn badge', () => {
  it('Player 1 badge should be yellow', () => {
    cy.mount(<PlayerBadge playerType={PlayerTypes.Player1}>badgeInput</PlayerBadge>);

    cy.get('.badge').should('satisfy', ($el) => {
      const classList = Array.from($el[0].classList); 
      return classList.includes('bg-warning') // passes
    })
    
  });

  it('Player 2 badge should be red', () => {
    cy.mount(<PlayerBadge playerType={PlayerTypes.Player2}>badgeInput</PlayerBadge>);

    cy.get('.badge').should('satisfy', ($el) => {
      const classList = Array.from($el[0].classList); 
      return classList.includes('bg-danger') // passes
    })
    
  })
})