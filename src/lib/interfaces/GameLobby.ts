import { GameStatus } from "../enums/GameStatus";
import { BoardCell } from "./BoardCell";
import { GamePlayers } from "./GamePlayer";

export interface GameLobby {
    CurrentPlayerTurn: string,
    Winner: string,
    GameField: BoardCell[],
    Status: GameStatus,
    Code: string,
    Players: GamePlayers,
}