import { PlayerTypes } from "../enums/PlayerTypes";

export interface BoardCell {
    Value: PlayerTypes,
    X: number,
    Y: number,
    New: boolean,
  }