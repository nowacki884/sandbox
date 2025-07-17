// Deps import
import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

// Hooks import
import socket from "../hooks/useSocket"

// Context import
import { useUserContext } from "../contexts/UserContext"
import socketCallback from "../functions/socketCallback"

export default function GameRoom() {
  const params = useParams()
  const navFn = useNavigate()

  const userContext = useUserContext()

  useEffect(() => {
    socket.on("player_joined", (playerId: string) =>
      console.log(`player ${playerId} joined the room`)
    )
    socket.on("player_left", (playerId: string, gameData) =>
      console.log(`player ${playerId} left the room`, gameData)
    )
    socket.on("game_update", (gameData) => {
      console.log(gameData)
    })

    return () => {
      socket.off("player_joined")
      socket.off("player_left")
    }
  }, [])

  useEffect(() => {
    if (!params.id) navFn("/")

    socket.emit(
      "check_uid_is_in_game_room",
      params.id,
      userContext.data.uid,
      (statusCode: number, isUidInRoom: boolean) => {
        if (statusCode !== 200) return navFn("/")

        if (!isUidInRoom) {
          socket.emit(
            "join_game_room_with_id",
            params.id,
            userContext.data.uid,
            (statusCode: number) => {
              switch (statusCode) {
                case 400:
                  console.log("bad request")
                  break
                case 500:
                  console.log("internal server error")
                  break
                case 200:
                  console.log("joined room!")
                  break
                default:
                  break
              }
            }
          )
        }
      }
    )
  }, [params])

  function leaveRoom(): void {
    socket.emit("leave_game_room", params.id, userContext.data.uid, (statusCode: number) =>
      socketCallback(statusCode, () => {
        console.log("left the room!")
        navFn("/")
      })
    )
  }

  return (
    <div className="game-room">
      Game room {params.id}
      <button onClick={leaveRoom}>Leave</button>
    </div>
  )
}
