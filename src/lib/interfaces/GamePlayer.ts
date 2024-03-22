import { PlayerTypes } from "../enums/PlayerTypes";

export interface GamePlayer {
    ConnectionId: string,
    Username: string,
    PlayerType: PlayerTypes,
}



export interface GamePlayers {
    [key: string]: GamePlayer;
}