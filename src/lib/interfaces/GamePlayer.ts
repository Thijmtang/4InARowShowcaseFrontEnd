export interface GamePlayer {
    ConnectionId: string,
    Username: string,
}

export interface GamePlayers {
    [key: string]: GamePlayer;
}