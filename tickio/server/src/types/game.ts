export type GameRoomType = 3 | 4 | 5

export type Symbol = "X" | "O" | null

export interface Move {
  cellIndex: number
  playerUid: string
}

export interface ProgressData {
  isActive: boolean
  turn: Symbol
  p1Symbol: Symbol
  p2Symbol: Symbol
  board: Symbol[]
}

export interface PostGameData {
  id: string
  finalBoard: Symbol[]
  p1Uid: string
  p2Uid: string
  winnerUid: string
  moveHistory: Move[]
  timeSpent: number
  date: string
}

export interface BoardData {
  board: Symbol[]
  winningCombinations: number[][]
  minMovesForEndgame: number
}

export interface PlayerData {
  p1: string
  p2: string
}
