// Deps import
import { createContext, ReactNode, useContext, useEffect, useState } from "react"

// Hooks import
import socket from "../hooks/useSocket"

// Types import
import { User } from "../../../server/src/logic/userLogic"

interface UserData {
  data: User
  loaded: boolean
}

const UserContext = createContext<UserData>({
  data: {
    exp: 0,
    level: 0,
    uid: "",
    username: "",
  },
  loaded: false,
})

export function useUserContext() {
  return useContext(UserContext)
}

export default function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    data: {
      exp: 0,
      level: 0,
      uid: "",
      username: "",
    },
    loaded: false,
  })

  function setUserDataNull(): void {
    setUserData({
      data: {
        exp: 0,
        level: 0,
        uid: "",
        username: "",
      },
      loaded: true,
    })
  }

  useEffect(() => {
    socket.on("bad_login_data", () => setUserDataNull())
    socket.on("uid_not_found", () => setUserDataNull())
    socket.on("user_data", (userData: User) => {
      setUserData({
        data: userData,
        loaded: true,
      })
    })

    return () => {
      socket.off("bad_login_data")
      socket.off("uid_not_found")
      socket.off("user_data")
    }
  }, [])

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}
