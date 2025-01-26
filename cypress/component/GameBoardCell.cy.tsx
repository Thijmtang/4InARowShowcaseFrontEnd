import GameBoardCell from "../../src/components/4InARow/GameBoardCell";
import { PlayerTypes } from "../../src/lib/enums/PlayerTypes";
import { BoardCell } from "../../src/lib/interfaces/BoardCell";

describe("GameBoardCell", () => {
  it("Player 1 newly placed cell", () => {
    const cell: BoardCell = {
      Value: PlayerTypes.Player1,
      X: 0,
      Y: 0,
      New: true,
    };
    const callback = () => {};

    cy.mount(
      <GameBoardCell
        cell={cell}
        animation={true}
        clickEvent={callback}
        clickable={true}
      ></GameBoardCell>
    );

    cy.get(".cell").should("satisfy", ($el) => {
      const classList = Array.from($el[0].classList);
      return classList.includes("new") && classList.includes("player-1"); // passes
    });
  });

  it("Player 1 old placed cell", () => {
    const cell: BoardCell = {
      Value: PlayerTypes.Player1,
      X: 0,
      Y: 0,
      New: true,
    };
    const callback = () => {};

    cy.mount(
      <GameBoardCell
        cell={cell}
        clickable={true}
        animation={false}
        clickEvent={callback}
      ></GameBoardCell>
    );

    cy.get(".cell").should("satisfy", ($el) => {
      const classList = Array.from($el[0].classList);
      return !classList.includes("new") && classList.includes("player-1"); // passes
    });
  });

  it("Player 2 newly placed cell", () => {
    const cell: BoardCell = {
      Value: PlayerTypes.Player2,
      X: 0,
      Y: 0,
      New: true,
    };
    const callback = () => {};

    cy.mount(
      <GameBoardCell
        cell={cell}
        animation={true}
        clickable={true}
        clickEvent={callback}
      ></GameBoardCell>
    );

    cy.get(".cell").should("satisfy", ($el) => {
      const classList = Array.from($el[0].classList);
      return classList.includes("new") && classList.includes("player-2"); // passes
    });
  });

  it("Player 2 old placed cell", () => {
    const cell: BoardCell = {
      Value: PlayerTypes.Player2,
      X: 0,
      Y: 0,
      New: true,
    };
    const callback = () => {};

    cy.mount(
      <GameBoardCell
        cell={cell}
        animation={false}
        clickable={true}
        clickEvent={callback}
      ></GameBoardCell>
    );

    cy.get(".cell").should("satisfy", ($el) => {
      const classList = Array.from($el[0].classList);
      return !classList.includes("new") && classList.includes("player-2"); // passes
    });
  });
});
