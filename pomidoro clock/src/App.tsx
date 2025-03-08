import { useEffect, useState } from "react"

import Timer from "./Timer"
import FullscreenButton from "./FullscreenButton"

const SECONDS_IN_25_MINS: number = 1500
const SECONDS_IN_10_MINS: number = 600
const SECONDS_IN_5_MINS: number = 300

export default function App() {
  const [selectedTime, setSelectedTime] = useState<number>(SECONDS_IN_25_MINS)
  const [isStarted, setIsStarted] = useState<boolean>(false)

  useEffect(() => {
    if (!isStarted) document.title = "Pomidoro Clock"
  }, [isStarted])

  return (
    <>
      <header>
        <h1>🍅 Pomidoro Clock</h1>
      </header>
      <main>
        {isStarted ? (
          <Timer timeInSeconds={selectedTime} resetCallback={setIsStarted} />
        ) : (
          <>
            <div className="time-selector-wrapper">
              <button
                className={selectedTime === SECONDS_IN_25_MINS ? "active" : ""}
                onClick={() => setSelectedTime(SECONDS_IN_25_MINS)}
              >
                25 min
              </button>
              <button
                className={selectedTime === SECONDS_IN_5_MINS ? "active" : ""}
                onClick={() => setSelectedTime(SECONDS_IN_5_MINS)}
              >
                5 min
              </button>
              <button
                className={selectedTime === SECONDS_IN_10_MINS ? "active" : ""}
                onClick={() => setSelectedTime(SECONDS_IN_10_MINS)}
              >
                10 min
              </button>
            </div>
            <div className="option-wrapper">
              <button onClick={() => setIsStarted(true)}>
                <i className="fa fa-play"></i>
              </button>
              <FullscreenButton />
            </div>
          </>
        )}
      </main>
    </>
  )
}
