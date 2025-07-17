// Deps import
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

// Context import
import { useUserContext } from "../contexts/UserContext"

// Hooks import
import socket from "../hooks/useSocket"

// Components import
import Loader from "../components/Loader"

// Styles import
import "../styles/Load.css"
import socketCallback from "../functions/socketCallback"

export default function Load() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const userContext = useUserContext()

  const navFn = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedUid = localStorage.getItem("uid")

    if (!savedUid) {
      navFn("/register")
      return
    }

    if (!userContext.loaded) {
      socket.emit("login", savedUid)
      return
    }
    if (userContext.data.uid === "") {
      navFn("/register")
    } else {
      setIsLoading(false)
    }
  }, [userContext])

  function test(): void {
    socket.emit("create_game_room", 3, (statusCode: number, param: any) => {
      switch (statusCode) {
        case 400:
          console.log("Bad request")
          break
        case 500:
          console.log("Internal server error")
          break
        case 200:
          if (!param) {
            console.log("no room id!")
            return
          }
          navFn(`/room/${param}`)
          break
        default:
          break
      }
    })
  }

  function join(): void {
    const inputVal: string | undefined = inputRef.current?.value
    if (!inputVal) return

    socket.emit("join_game_room_with_id", inputVal, userContext.data.uid, (statusCode: number) =>
      socketCallback(statusCode, () => {
        console.log(`joining room ${inputVal}`)
        navFn(`/room/${inputVal}`)
      })
    )
  }

  return (
    <section className="page loading__page">
      <div className="page_content__wrapper">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <h1>
              {userContext.data.username} LVL: {userContext.data.level}
            </h1>
            <button onClick={test}>test</button>
            <input type="text" placeholder="Room ID" ref={inputRef} />
            <button onClick={join}>Join</button>
          </>
        )}
      </div>
    </section>
  )
}
