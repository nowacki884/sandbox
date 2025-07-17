// Types import
import { GameRoomType, BoardData } from "../types/game"

export default function calculateBoardData(gameType: GameRoomType): BoardData {
  const combinationsArray: number[][] = []

  const boardSize: number = Math.pow(gameType, 2)

  const cellIndexes: number[] = []
  for (let i = 0; i < boardSize; i++) {
    cellIndexes.push(i)
  }

  // NOTE: Horizontal combinations
  const tmpCopy = cellIndexes
  for (let i = 0; i < gameType; i++) {
    const tmpArr: number[] = tmpCopy.splice(0, gameType)
    combinationsArray.push(tmpArr)
  }

  // NOTE: Vertical combinations
  const tmpArr: number[][] = []
  for (let i = 0; i < gameType; i++) {
    const tmpComb: number[] = []
    combinationsArray.forEach((comb) => {
      tmpComb.push(comb[i])
    })
    tmpArr.push(tmpComb)
  }
  tmpArr.forEach((arr) => combinationsArray.push(arr))

  // NOTE: Across combinations
  const LtoRStartingPoint: number = 0
  const LtoRIteratorSize: number = gameType + 1
  const LtoRCombination: number[] = []

  const RtoLStartingPoint: number = gameType - 1
  const RtoLIteratorSize: number = gameType - 1
  const RtoLCombination: number[] = []

  for (let i = 0; i < gameType; i++) {
    LtoRCombination.push(LtoRStartingPoint + i * LtoRIteratorSize)
    RtoLCombination.push(RtoLStartingPoint + i * RtoLIteratorSize)
  }

  combinationsArray.push(LtoRCombination)
  combinationsArray.push(RtoLCombination)

  const data: BoardData = {
    board: Array(boardSize).fill(null),
    winningCombinations: combinationsArray,
    minMovesForEndgame: gameType * 2 - 1,
  }
  return data
}
