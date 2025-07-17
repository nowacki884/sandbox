// Deps import
import { FormEvent, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { v4 as uuidV4 } from "uuid"

// Context import
import { useUserContext } from "../contexts/UserContext"

// Hooks import
import socket from "../hooks/useSocket"

// Types import
import { RegisterData } from "../../../server/src/types/users"
import { DefaultResponse, post } from "../functions/fetchMethods"

// Components improt
import Loader from "../components/Loader"

export default function Register() {
  const [loading, setLoading] = useState<boolean>(true)

  const usernameRef = useRef<HTMLInputElement>(null)

  const userContext = useUserContext()

  const navFn = useNavigate()

  useEffect(() => {
    const savedUid = localStorage.getItem("uid")
    if (savedUid) {
      socket.emit("login", savedUid)
    } else {
      setLoading(false)
    }

    if (!userContext.loaded) {
      return
    }

    if (userContext.data.uid !== "") {
      navFn("/")
    } else {
      setLoading(false)
    }
  }, [userContext])

  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault()

    const usernameVal: string | undefined = usernameRef.current?.value
    if (!usernameVal) {
      console.log("Please enter a valid username!")
      return
    }

    const newUid = uuidV4()

    const registerData: RegisterData = {
      uid: newUid,
      username: usernameVal,
    }

    post("/register", registerData)
      .then(async (res) => {
        if (res.status === 200) {
          localStorage.setItem("uid", newUid)
        }
      })
      .catch((err) => console.log(err))
  }

  return (
    <section className="page login__page">
      <div className="page_content__wrapper">
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1>Please log in</h1>
            <form onSubmit={handleSubmit}>
              <input type="text" name="username" placeholder="Username" ref={usernameRef} />
              <button type="submit">Register</button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
