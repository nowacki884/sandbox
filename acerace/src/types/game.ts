export interface AcePosition {
  suit: CardSuit
  position: number
}

interface RowCard {
  flipped: boolean
  value: Card
}

export interface GameData {
  acePositions: AcePosition[]
  winner: CardSuit | null
  rowCards: RowCard[]
}

export const dummyGameData: GameData = {
  acePositions: [],
  rowCards: [],
  winner: null,
}

export type CardSuit = "CLUBS" | "DIAMONDS" | "HEARTS" | "SPADES"
export type CardFace = 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | "J" | "Q" | "K" | "A"

export interface Card {
  face: CardFace
  suit: CardSuit
}
type ActionType = "DRAW" | "MOVE" | "BACK" | "FLIP"
type ActionValue = Card | CardSuit | number

export interface Action {
  actionType: ActionType
  value: ActionValue
}
