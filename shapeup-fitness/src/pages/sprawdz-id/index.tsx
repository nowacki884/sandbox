import { Timestamp } from "firebase/firestore"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { getPassData, getUserPassDataWithId } from "../../firebase"

import { UserPassData } from "../../types"

import Loader from "../../components/Loader"

import CheckCircle from "../../assets/icons/check-circle.svg"
import CrossCircle from "../../assets/icons/cross-circle.svg"

export default function SprawdzID() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [userPassData, setUserPassData] = useState<UserPassData | null>(null)
  const [karnetName, setKarnetName] = useState<string>("")
  const [isKarnetValid, setIsKarnetValid] = useState<boolean>(false)

  const params = useParams()

  useEffect(() => {
    async function getData(): Promise<void> {
      if (!params.id) return

      let passId: number = -1

      try {
        const savedUserPassData = await getUserPassDataWithId(params.id)

        if (!savedUserPassData) return setIsLoading(false)

        passId = savedUserPassData.activePass
        setUserPassData(savedUserPassData)
        const newTimestamp = new Timestamp(Math.floor(new Date().getTime() / 1000), 0)

        setIsKarnetValid(
          newTimestamp.seconds > savedUserPassData.purchaseDate.seconds &&
            newTimestamp.seconds < savedUserPassData.validUntil.seconds
        )
      } catch (error) {
        console.log(error)
      }

      try {
        const savedPassData = await getPassData(passId)

        if (!savedPassData) return setIsLoading(false)

        setKarnetName(savedPassData.name)
      } catch (error) {
        console.log(error)
      }

      setIsLoading(false)
    }

    getData()
  }, [])

  return (
    <main className="page sprawdz-page">
      {isLoading ? (
        <section className="full">
          <Loader />
        </section>
      ) : (
        <section className="full">
          <div className="section-content">
            <div className="section-header">
              <h1>Sprawdzanie karnetu</h1>
            </div>
            <div className="section-body">
              {isKarnetValid ? (
                <img src={CheckCircle} alt="check" />
              ) : (
                <img src={CrossCircle} alt="cross" />
              )}
              <div className="user-info">
                <h1>{userPassData?.username}</h1>
                <h2>
                  Adres e-mail: <span>{userPassData?.email}</span>
                </h2>
                <h2>
                  Karnet: <span>{karnetName || "brak"}</span>
                </h2>
                {/* <h2>Karnet ważny: {isKarnetValid ? "YAY" : "NAY"}</h2> */}
                {userPassData && karnetName && (
                  <h2>
                    Ważność karnetu:{" "}
                    <span>
                      {new Date(userPassData.purchaseDate.seconds * 1000).toLocaleDateString()} -{" "}
                      {new Date(userPassData.validUntil.seconds * 1000).toLocaleDateString()}
                    </span>
                  </h2>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
