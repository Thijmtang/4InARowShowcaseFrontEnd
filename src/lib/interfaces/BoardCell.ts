import { PlayerTypes } from "../enums/PlayerTypes";

export type BoardCell = {
    Value: PlayerTypes,
    X: number,
    Y: number,
    New: boolean,
  }