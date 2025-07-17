// Deps import
import GameRoom from "./Game"

// Functions import
import generateId from "../../functions/generateId"
import log from "../../functions/log"

// Types import
import { StatusCode } from "../../types/codes"
import { GameRoomType } from "../../types/game"

export default class GameRoomManager {
  #gameRooms: GameRoom[]
  #processing: boolean

  constructor() {
    this.#gameRooms = []
    this.#processing = false
  }

  getAllGameRooms(): GameRoom[] {
    return this.#gameRooms
  }

  selectGameRoom(gameRoomId: string): GameRoom | undefined {
    if (!gameRoomId || typeof gameRoomId !== "string") return undefined

    return this.#gameRooms.find((gameRoom) => gameRoom.id === gameRoomId)
  }

  createGameRoom(gameType: GameRoomType): string | null {
    if (!gameType) return null
    if (this.#processing) return null

    let newId: string = ""

    for (let i = 0; newId === ""; i++) {
      const generatedId: string = generateId()
      const doesRoomIdExist: StatusCode = this.doesGameRoomExist(generatedId)
      if (doesRoomIdExist !== StatusCode.OK) {
        newId = generatedId
      }
    }

    const newGame = new GameRoom(newId, gameType)
    this.#gameRooms.push(newGame)

    log("GAME", `New Game Room created - ${newGame.id}`)
    return newGame.id
  }

  deleteGameRoom(gameRoomId: string): StatusCode {
    if (!gameRoomId || typeof gameRoomId !== "string") return StatusCode.BAD_REQUEST
    if (this.#processing) return StatusCode.FORBIDDEN

    this.#processing = true

    const roomIndex: number = this.#gameRooms.findIndex((gameRoom) => gameRoom.id === gameRoomId)
    if (roomIndex === -1) {
      this.#processing = false
      return StatusCode.FORBIDDEN
    }

    this.#gameRooms.splice(roomIndex, 1)

    this.#processing = false
    return StatusCode.OK
  }

  joinGameRoomWithId(gameRoomId: string, uid: string): StatusCode {
    const con1: boolean =
      !gameRoomId || !uid || typeof gameRoomId !== "string" || typeof uid !== "string"
    if (con1) return StatusCode.BAD_REQUEST

    const selectedGameRoom: GameRoom | undefined = this.selectGameRoom(gameRoomId)
    if (!selectedGameRoom) return StatusCode.NOT_FOUND

    return selectedGameRoom.addPlayer(uid)
  }

  joinRandomGameRoom(uid: string): string | null {
    if (!uid || typeof uid !== "string") return null

    const openRooms: GameRoom[] = this.#gameRooms.filter(
      (gameRoom) => gameRoom.isRoomOpen() === true
    )
    if (openRooms.length < 1) return null

    const randomOpenRoomIndex: number = Math.floor(Math.random() * openRooms.length)
    const randomOpenRoomId: string = openRooms[randomOpenRoomIndex].id

    const joiningStatus: StatusCode = this.joinGameRoomWithId(randomOpenRoomId, uid)
    if (joiningStatus !== StatusCode.OK) return null

    return randomOpenRoomId
  }

  removePlayerFromGameRoom(gameRoomId: string, uid: string): StatusCode {
    const con1: boolean =
      !gameRoomId || !uid || typeof gameRoomId !== "string" || typeof uid !== "string"
    if (con1) return StatusCode.BAD_REQUEST

    const selectedGameRoom: GameRoom | undefined = this.selectGameRoom(gameRoomId)
    if (!selectedGameRoom) return StatusCode.NOT_FOUND

    const leavingStatus: StatusCode = selectedGameRoom.removePlayer(uid)
    return leavingStatus
  }

  doesGameRoomExist(gameRoomId: string): StatusCode {
    if (!gameRoomId || typeof gameRoomId !== "string") return StatusCode.BAD_REQUEST

    const gameRoomData: GameRoom | undefined = this.selectGameRoom(gameRoomId)
    if (!gameRoomData) return StatusCode.NOT_FOUND

    return StatusCode.OK
  }

  cleanupRoutine(): void {
    if (this.#processing || this.#gameRooms.length < 1) return

    const emptyGameRooms: GameRoom[] = this.#gameRooms.filter(
      (gameRoom) => gameRoom.isRoomEmpty() === true
    )
    if (emptyGameRooms.length < 1) return

    log("INFO", "Starting game room cleanup routine...")

    const successfulRoomsDeleted: string[] = []

    emptyGameRooms.forEach((emptyGameRoom) => {
      const status: StatusCode = this.deleteGameRoom(emptyGameRoom.id)
      switch (status) {
        case StatusCode.BAD_REQUEST:
          log(
            "ERROR",
            `Error when attempting to remove a room! (invalid room ID) ${emptyGameRoom.id}`
          )
          break
        case StatusCode.FORBIDDEN:
          log(
            "ERROR",
            `Error when attempting to remove a room! (server error/room not found) ${emptyGameRoom.id}`
          )
          break
        case StatusCode.OK:
          log("INFO", `Room ${emptyGameRoom.id} successfully removed!`)
          successfulRoomsDeleted.push(emptyGameRoom.id)
          break
        default:
          break
      }
    })

    log("INFO", `Game room cleanup finished - ${successfulRoomsDeleted.length} rooms deleted!`)
  }
}
