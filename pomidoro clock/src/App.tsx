import { useEffect, useState } from "react"

import Timer from "./Timer"
import FullscreenButton from "./FullscreenButton"
import TimeSelectorButton from "./TimeSelectorButton"

const SECONDS_IN_25_MINS: number = 1500
const SECONDS_IN_10_MINS: number = 600
const SECONDS_IN_5_MINS: number = 300

export default function App() {
  const [selectedTime, setSelectedTime] = useState<number>(SECONDS_IN_25_MINS)
  const [isStarted, setIsStarted] = useState<boolean>(false)

  function reset(): void {
    setIsStarted(false)
  }

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
          <Timer timeInSeconds={selectedTime} reset={reset} />
        ) : (
          <>
            <div className="time-selector-wrapper">
              <TimeSelectorButton
                time={SECONDS_IN_25_MINS}
                selectedTime={selectedTime}
                setTime={setSelectedTime}
              />
              <TimeSelectorButton
                time={SECONDS_IN_5_MINS}
                selectedTime={selectedTime}
                setTime={setSelectedTime}
              />
              <TimeSelectorButton
                time={SECONDS_IN_10_MINS}
                selectedTime={selectedTime}
                setTime={setSelectedTime}
              />
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
