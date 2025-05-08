import { Dispatch, SetStateAction, useEffect, useState } from "react"
import FullscreenButton from "./FullscreenButton"

interface TimerProps {
  timeInSeconds: number
  reset: () => void
}

export default function Timer(props: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(props.timeInSeconds)
  const [displayMinutes, setDisplayMinutes] = useState<string>("")
  const [displaySeconds, setDisplaySeconds] = useState<string>("")
  const [isPaused, setIsPaused] = useState<boolean>(false)

  function updateTimer(): void {
    let minutes: number = Math.floor(timeRemaining / 60)
    let seconds: number = timeRemaining % 60

    let newDisplayMinutes: string = minutes.toString()
    let newDisplaySeconds: string = seconds.toString()

    if (minutes < 10) newDisplayMinutes = "0" + minutes
    if (seconds < 10) newDisplaySeconds = "0" + seconds

    document.title = newDisplayMinutes + ":" + newDisplaySeconds + " - Pomidoro Clock"

    setDisplayMinutes(newDisplayMinutes)
    setDisplaySeconds(newDisplaySeconds)
  }

  useEffect(() => {
    updateTimer()

    const timeout = setTimeout(() => {
      if (isPaused) return

      if (timeRemaining === 0) {
        alert("Time's up! Good job!")
        props.reset()
        return
      }

      setTimeRemaining((prev) => prev - 1)

      updateTimer()
    }, 1000)

    return () => clearTimeout(timeout)
  }, [timeRemaining, isPaused])

  return (
    <div className="timer-wrapper">
      <h1 className="timer-display">
        {displayMinutes}:{displaySeconds}
      </h1>
      <div className="timer-options">
        <button onClick={() => setIsPaused((prev) => !prev)}>
          {isPaused ? <i className="fa fa-play"></i> : <i className="fa fa-pause"></i>}
        </button>
        <button onClick={() => props.reset()}>
          <i className="fa fa-stop"></i>
        </button>
        <FullscreenButton />
      </div>
    </div>
  )
}
