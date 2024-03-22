import { GameStatus } from "../enums/GameStatus";
import { BoardCell } from "./BoardCell";
import { GamePlayer, GamePlayers } from "./GamePlayer";

export interface GameLobby {
    // status: // enum,
    CurrentPlayerTurn: string,
    GameField: BoardCell[],
    Status: GameStatus,
    Code: string,
    Players: GamePlayers,

}