// Types import
import calculateBoardData from "../../functions/calculateBoardData"
import { StatusCode } from "../../types/codes"
import {
  BoardData,
  GameRoomType,
  Move,
  PlayerData,
  PostGameData,
  ProgressData,
  Symbol,
} from "../../types/game"

// NOTE: In dev mode client sends 2 requests

// TODO: Test all methods!
export default class GameRoom {
  id: string
  #isActive: boolean
  #p1Uid: string
  #p2Uid: string
  #p1Symbol: Symbol
  #p2Symbol: Symbol
  #turn: Symbol
  #winnerUid: string | null
  #moveHistory: Move[]
  #startTime: number
  #endTime: number
  #board: Symbol[]
  #winningCombinations: number[][]
  #minMovesForEndgame: number

  constructor(gameRoomId: string, type: GameRoomType) {
    this.id = gameRoomId
    this.#isActive = false
    this.#p1Uid = ""
    this.#p2Uid = ""
    this.#p1Symbol = null
    this.#p2Symbol = null
    this.#turn = null
    this.#winnerUid = ""
    this.#moveHistory = []
    this.#startTime = 0
    this.#endTime = 0

    const boardData: BoardData = calculateBoardData(type)
    this.#board = boardData.board
    this.#winningCombinations = boardData.winningCombinations
    this.#minMovesForEndgame = boardData.minMovesForEndgame
  }

  getPlayers(): PlayerData {
    return {
      p1: this.#p1Uid,
      p2: this.#p2Uid,
    }
  }

  addPlayer(uid: string): StatusCode {
    const con1: boolean = !uid || typeof uid !== "string"
    if (con1) return StatusCode.BAD_REQUEST

    const con2: boolean =
      this.#isActive || this.#winnerUid !== "" || uid === this.#p1Uid || uid === this.#p2Uid
    if (con2) return StatusCode.FORBIDDEN

    if (this.#p1Uid === "") {
      this.#p1Uid = uid
      return StatusCode.OK
    }
    if (this.#p2Uid === "") {
      this.#p2Uid = uid
      return StatusCode.OK
    }

    return StatusCode.FORBIDDEN
  }

  removePlayer(uid: string): StatusCode {
    if (!uid) return StatusCode.BAD_REQUEST
    if (uid !== this.#p1Uid && uid !== this.#p2Uid) return StatusCode.BAD_REQUEST
    if (this.#p1Uid === "" && this.#p2Uid === "") return StatusCode.FORBIDDEN

    if (this.#p1Uid === uid) {
      this.#p1Uid = ""
    }
    if (this.#p2Uid === uid) {
      this.#p2Uid = ""
    }

    if (this.#isActive) this.forfeit(uid)
    return StatusCode.OK
  }

  start(): ProgressData | null {
    const con1 = this.#isActive || this.#p1Uid === "" || this.#p2Uid === ""
    if (con1) return null

    this.#turn = "X"

    const coinFlip: boolean = Math.random() < 0.5
    this.#p1Symbol = coinFlip ? "X" : "O"
    this.#p2Symbol = coinFlip ? "O" : "X"

    this.#isActive = true
    this.#startTime = Date.now()

    return this.getProgressData()
  }

  getBoard(): Symbol[] {
    return this.#board
  }

  placeSymbol(uid: string, cellIndex: number): ProgressData | null {
    const con1 = !uid || !cellIndex || cellIndex >= this.#board.length || cellIndex < 0
    if (con1) return null

    const con2 =
      !this.#isActive ||
      uid !== this.#p1Uid ||
      uid !== this.#p2Uid ||
      this.#board[cellIndex] !== null
    if (con2) return null

    if (uid === this.#p1Uid && this.#turn === this.#p1Symbol) {
      this.#board[cellIndex] = this.#p1Symbol
      this.#turn = this.#p2Symbol
    }
    if (uid === this.#p2Uid && this.#turn === this.#p2Symbol) {
      this.#board[cellIndex] = this.#p2Symbol
      this.#turn = this.#p1Symbol
    }

    const moveData: Move = {
      cellIndex,
      playerUid: uid,
    }
    this.#moveHistory.push(moveData)

    if (this.#moveHistory.length >= this.#minMovesForEndgame) {
      const winnerUid: string | null = this.#checkWinner(cellIndex)
      if (winnerUid) this.#endGame(winnerUid)
    }

    return this.getProgressData()
  }

  #checkWinner(cellIndex: number): string | null {
    let winnerUid: string | null = null

    const winningCombinationForMove: number[][] = this.#winningCombinations.filter(
      (combination) => {
        combination.includes(cellIndex)
      }
    )

    for (let i = 0; i < winningCombinationForMove.length; i++) {
      const combination: number[] = winningCombinationForMove[i]

      const cellValuesOnBoard: Symbol[] = []
      combination.forEach((combinationCellIndex) => {
        cellValuesOnBoard.push(this.#board[combinationCellIndex])
      })

      const checkingSymbol: Symbol = cellValuesOnBoard[0]

      const areCellsFilled: boolean = cellValuesOnBoard.every((cell) => cell !== null)
      if (!areCellsFilled) continue

      const areCellsFilledByOnePlayer: boolean = cellValuesOnBoard.every(
        (cell) => cell === checkingSymbol
      )
      if (!areCellsFilledByOnePlayer) continue

      if (checkingSymbol === this.#p1Symbol) {
        winnerUid = this.#p1Uid
        break
      }
      if (checkingSymbol === this.#p2Symbol) {
        winnerUid = this.#p2Uid
        break
      }
    }

    return winnerUid
  }

  #endGame(winnerUid: string): void {
    this.#isActive = false
    this.#winnerUid = winnerUid
    this.#endTime = Date.now()
  }

  getProgressData(): ProgressData {
    const data: ProgressData = {
      isActive: this.#isActive,
      turn: this.#turn,
      p1Symbol: this.#p1Symbol,
      p2Symbol: this.#p2Symbol,
      board: this.#board,
    }
    return data
  }

  isGameOver(): boolean {
    return !this.#isActive && this.#winnerUid !== null && this.#endTime > 0
  }

  getPostGameData(): PostGameData | null {
    if (!this.#isActive || !this.#winnerUid) return null

    const data: PostGameData = {
      id: this.id,
      finalBoard: this.#board,
      p1Uid: this.#p1Uid,
      p2Uid: this.#p2Uid,
      winnerUid: this.#winnerUid,
      moveHistory: this.#moveHistory,
      timeSpent: this.#endTime - this.#startTime,
      date: new Date().toLocaleDateString(),
    }

    return data
  }

  forfeit(loserUid: string): StatusCode {
    if (!loserUid) return StatusCode.BAD_REQUEST
    const con2: boolean = !this.#isActive || loserUid !== this.#p1Uid || loserUid !== this.#p2Uid
    if (con2) return StatusCode.FORBIDDEN

    if (loserUid === this.#p1Uid) this.#endGame(this.#p2Uid)
    if (loserUid === this.#p2Uid) this.#endGame(this.#p1Uid)
    return StatusCode.OK
  }

  isRoomFull(): boolean {
    return this.#p1Uid !== "" && this.#p2Uid !== ""
  }

  isRoomEmpty(): boolean {
    return this.#p1Uid === "" && this.#p2Uid === ""
  }

  isRoomOpen(): boolean {
    const con1: boolean = this.#p1Uid === "" || this.#p2Uid === ""
    const con2: boolean = this.#isActive === false
    return con1 && con2
  }
}
