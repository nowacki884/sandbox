import QRCode from "react-qr-code"
import { Link } from "react-router-dom"

import { useUserContext } from "../../../contexts/UserContext"
import { useDataContext } from "../../../contexts/DataContext"

export default function UserInfo() {
  const userContext = useUserContext()
  const dataContext = useDataContext()

  const websiteOrigin: string = window.location.origin
  const ext: string = `/sprawdz/${userContext.data?.uid}`
  const qrCodeValue: string = `${websiteOrigin}${ext}`

  return (
    userContext.data && (
      <div className="user-info-wrapper">
        <div className="user-info-element">
          <div style={{ backgroundColor: "white", padding: "16px" }}>
            <Link to={ext}>
              <QRCode value={qrCodeValue} />
            </Link>
          </div>
          <pre>{userContext.data.uid}</pre>
        </div>
        <div className="user-info-element">
          {userContext.data && (
            <>
              <div className="user-info-section">
                <div className="user-info-header">
                  <h1>{userContext.data.displayName}</h1>
                </div>
                <h3>E-Mail: {userContext.data.email}</h3>
                <h3>
                  Data założenia:{" "}
                  {new Date(userContext.data.metadata.creationTime || "").toLocaleDateString()}
                </h3>
              </div>
              {dataContext.aktualnyKarnet && dataContext.daneKarnetu && (
                <>
                  <div className="user-info-section">
                    <h2>Karnet</h2>
                    <h3>Rodzaj: {dataContext.daneKarnetu.name}</h3>
                    <h3>
                      Ważny do:{" "}
                      {dataContext.aktualnyKarnet.validUntil.toDate().toLocaleDateString()}
                    </h3>
                    <h3>
                      Data zakupu:{" "}
                      {dataContext.aktualnyKarnet.purchaseDate.toDate().toLocaleDateString()}
                    </h3>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    )
  )
}
