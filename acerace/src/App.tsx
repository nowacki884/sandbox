import { useState } from "react"
import GameHandler from "./GameHandler"
import { generateNewGameData } from "./logic/gameLogic"
import { Action, dummyGameData, GameData } from "./types/game"

const SPEEDS = {
  ultraFast: 300,
  fast: 500,
  slow: 1000,
}

export default function App() {
  const [selectedSpeed, setSelectedSpeed] = useState<number>(SPEEDS.fast)
  const [gameInProgress, setGameInProgress] = useState<boolean>(false)
  const [actionHistory, setActionHistory] = useState<Action[]>([])
  const [gameData, setGameData] = useState<GameData>(dummyGameData)

  function getNewGame(): void {
    const [actionHistory, gameData] = generateNewGameData()
    setGameData(gameData)
    setActionHistory(actionHistory)
    setGameInProgress(true)
  }

  return (
    <>
      <header>
        <h1>🃏 AceRace</h1>
      </header>
      <main>
        {!gameInProgress ? (
          <div className="start-wrapper">
            <div className="speed-wrapper">
              <p>Game speed:</p>
              <div className="speed-selection">
                <button
                  className={selectedSpeed === SPEEDS.ultraFast ? "active" : ""}
                  onClick={() => setSelectedSpeed(SPEEDS.ultraFast)}
                >
                  Ultra fast
                </button>
                <button
                  className={selectedSpeed === SPEEDS.fast ? "active" : ""}
                  onClick={() => setSelectedSpeed(SPEEDS.fast)}
                >
                  Fast
                </button>
                <button
                  className={selectedSpeed === SPEEDS.slow ? "active" : ""}
                  onClick={() => setSelectedSpeed(SPEEDS.slow)}
                >
                  Slow
                </button>
              </div>
            </div>
            <button onClick={getNewGame}>Play</button>
          </div>
        ) : (
          <GameHandler gameData={gameData} actionHistory={actionHistory} speed={selectedSpeed} />
        )}
      </main>
    </>
  )
}
