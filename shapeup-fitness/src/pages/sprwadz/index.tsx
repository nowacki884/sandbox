import { useState } from "react"

import EmailForm from "./components/EmailForm"
import IdForm from "./components/IdForm"

export default function Sprawdz() {
  const [selectedMethod, setSelectedMethod] = useState<boolean>(true)

  return (
    <main className="page sprawdz-page find-page">
      <section className="full">
        <div className="section-content">
          <div className="section-header">
            <h1>Sprawdź użytkownika</h1>
          </div>
          <div className="selection-wrapper">
            <button
              onClick={() => setSelectedMethod(true)}
              className={selectedMethod ? "active" : ""}
            >
              E-Mail
            </button>
            <button
              onClick={() => setSelectedMethod(false)}
              className={!selectedMethod ? "active" : ""}
            >
              ID
            </button>
          </div>
          <div className="section-body">
            {selectedMethod ? <h1>E-mail</h1> : <h1>ID</h1>}
            {selectedMethod ? <EmailForm /> : <IdForm />}
          </div>
        </div>
      </section>
    </main>
  )
}
