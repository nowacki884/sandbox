import { createContext, useContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase/firebase"
import { UserProviderData } from "../types"

const UserContext = createContext<UserProviderData>({
  loaded: false,
  data: null,
})

export function useUserContext(): UserProviderData {
  return useContext(UserContext)
}

interface UserProviderProps {
  children: JSX.Element
}

export default function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<UserProviderData>({
    loaded: false,
    data: null,
  })

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) =>
      setUserData({
        loaded: true,
        data: user,
      })
    )

    return () => unsub()
  }, [])

  return <UserContext.Provider value={userData}>{children}</UserContext.Provider>
}
