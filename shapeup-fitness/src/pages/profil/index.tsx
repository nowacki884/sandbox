import { signOut } from "firebase/auth"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { auth } from "../../firebase/firebase"

import { useDataContext, useSetDataContext } from "../../contexts/DataContext"
import { useUserContext } from "../../contexts/UserContext"

import Header from "../../components/Header"
import Loader from "../../components/Loader"
import UserInfo from "./components/UserInfo"
import { getPassData, getUserPassDataWithId } from "../../firebase"

export default function Profil() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const userContext = useUserContext()
  const dataContext = useDataContext()
  const setDataContext = useSetDataContext()

  const navFn = useNavigate()

  useEffect(() => {
    if (!userContext.loaded) return
    if (!userContext.data) navFn("/")
    if (dataContext.aktualnyKarnet) return setIsLoading(!userContext.loaded)
    if (userContext.data) {
      getUserPassDataWithId(userContext.data.uid)
        .then((userPass) => {
          if (userPass) {
            setDataContext("aktualnyKarnet", null, null, null, userPass, null)
            getPassData(userPass.activePass)
              .then((passData) => {
                setDataContext("daneKarnetu", null, null, null, null, passData)
                setIsLoading(!userContext.loaded)
              })
              .catch((err) => console.log(err))
          } else {
            setIsLoading(!userContext.loaded)
          }
        })
        .catch((err) => console.log(err))
    }
  }, [userContext])

  function logOut(): void {
    setDataContext("aktualnyKarnet", null, null, null, null, null)
    setDataContext("daneKarnetu", null, null, null, null, null)
    signOut(auth)
  }

  return isLoading ? (
    <section className="full">
      <Loader />
    </section>
  ) : (
    <>
      <Header />
      <main className="page profil-page">
        <section className="full">
          <div className="section-content">
            <div className="section-header">
              <h1>Profil</h1>
              <button className="big-button" onClick={logOut}>
                Wyloguj Się
              </button>
            </div>
            <div className="section-body">{isLoading ? <Loader /> : <UserInfo />}</div>
          </div>
        </section>
      </main>
    </>
  )
}
