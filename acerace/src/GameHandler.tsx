import { useEffect, useState } from "react"
import CardElement from "./Card"
import { Action, Card, CardSuit, GameData } from "./types/game"
import { generateNewGameData } from "./logic/gameLogic"

export default function GameHandler({
  gameData,
  actionHistory,
  speed,
}: {
  gameData: GameData
  actionHistory: Action[]
  speed: number
}) {
  const [gameDataState, setGameDataState] = useState<GameData>(gameData)
  const [actionHistoryState, setActionHistoryState] = useState<Action[]>(actionHistory)
  const [currentMove, setCurrentMove] = useState<number>(-1)

  const [clubsPosition, setClubsPosition] = useState<number>(6)
  const [diamondsPosition, setDiamondsPosition] = useState<number>(6)
  const [heartsPosition, setHeartsPosition] = useState<number>(6)
  const [spadesPosition, setSpadesPosition] = useState<number>(6)

  const [row1Flipped, setRow1Flipped] = useState<boolean>(true)
  const [row2Flipped, setRow2Flipped] = useState<boolean>(true)
  const [row3Flipped, setRow3Flipped] = useState<boolean>(true)
  const [row4Flipped, setRow4Flipped] = useState<boolean>(true)
  const [row5Flipped, setRow5Flipped] = useState<boolean>(true)
  const [row6Flipped, setRow6Flipped] = useState<boolean>(true)

  const [currentDrawnCard, setCurrentDrawnCard] = useState<Card | null>(null)

  const [isGameOver, setIsGameOver] = useState<boolean>(false)
  const [winnerSuit, setWinnerSuit] = useState<CardSuit | null>(null)

  useEffect(() => {
    const timeout = setTimeout(() => {
      const move = currentMove + 1
      if (move === actionHistoryState.length) {
        clearTimeout(timeout)
        setWinnerSuit(gameDataState.winner)
        setIsGameOver(true)
        return
      }

      const actionData = actionHistoryState[move]

      switch (actionData.actionType) {
        case "DRAW":
          setCurrentDrawnCard(actionData.value as Card)
          break
        case "MOVE":
          if (actionData.value === "CLUBS") {
            setClubsPosition((prev) => prev - 1)
          }
          if (actionData.value === "DIAMONDS") {
            setDiamondsPosition((prev) => prev - 1)
          }
          if (actionData.value === "HEARTS") {
            setHeartsPosition((prev) => prev - 1)
          }
          if (actionData.value === "SPADES") {
            setSpadesPosition((prev) => prev - 1)
          }
          break
        case "BACK":
          if (actionData.value === "CLUBS") {
            setClubsPosition((prev) => prev + 1)
          }
          if (actionData.value === "DIAMONDS") {
            setDiamondsPosition((prev) => prev + 1)
          }
          if (actionData.value === "HEARTS") {
            setHeartsPosition((prev) => prev + 1)
          }
          if (actionData.value === "SPADES") {
            setSpadesPosition((prev) => prev + 1)
          }
          break
        case "FLIP":
          if (actionData.value === 0) {
            setRow1Flipped(false)
          }
          if (actionData.value === 1) {
            setRow2Flipped(false)
          }
          if (actionData.value === 2) {
            setRow3Flipped(false)
          }
          if (actionData.value === 3) {
            setRow4Flipped(false)
          }
          if (actionData.value === 4) {
            setRow5Flipped(false)
          }
          if (actionData.value === 5) {
            setRow6Flipped(false)
          }
          break
      }
      setCurrentMove((prev) => prev + 1)
    }, speed)
  }, [currentMove])

  function newGame(): void {
    const [newActionHistory, newGameData] = generateNewGameData()

    setGameDataState(newGameData)
    setActionHistoryState(newActionHistory)

    setClubsPosition(6)
    setDiamondsPosition(6)
    setHeartsPosition(6)
    setSpadesPosition(6)

    setRow1Flipped(true)
    setRow2Flipped(true)
    setRow3Flipped(true)
    setRow4Flipped(true)
    setRow5Flipped(true)
    setRow6Flipped(true)

    setCurrentDrawnCard(null)

    setIsGameOver(false)
    setWinnerSuit(null)

    setCurrentMove(-1)
  }

  return (
    <>
      <div className="game-wrapper">
        <div className="ace-field">
          <div className="ace-wrapper" style={{ gridColumn: 1, gridRow: clubsPosition }}>
            <CardElement cardData={{ face: "A", suit: "CLUBS" }} back={false} />
          </div>
          <div className="ace-wrapper" style={{ gridColumn: 2, gridRow: diamondsPosition }}>
            <CardElement cardData={{ face: "A", suit: "DIAMONDS" }} back={false} />
          </div>
          <div className="ace-wrapper" style={{ gridColumn: 3, gridRow: heartsPosition }}>
            <CardElement cardData={{ face: "A", suit: "HEARTS" }} back={false} />
          </div>
          <div className="ace-wrapper" style={{ gridColumn: 4, gridRow: spadesPosition }}>
            <CardElement cardData={{ face: "A", suit: "SPADES" }} back={false} />
          </div>
        </div>
        <div className="row-cards">
          <CardElement cardData={gameDataState.rowCards[5].value} back={row6Flipped} />
          <CardElement cardData={gameDataState.rowCards[4].value} back={row5Flipped} />
          <CardElement cardData={gameDataState.rowCards[3].value} back={row4Flipped} />
          <CardElement cardData={gameDataState.rowCards[2].value} back={row3Flipped} />
          <CardElement cardData={gameDataState.rowCards[1].value} back={row2Flipped} />
          <CardElement cardData={gameDataState.rowCards[0].value} back={row1Flipped} />
        </div>
        <div className="draw-section">
          <CardElement cardData={currentDrawnCard} back={currentDrawnCard === null} />
        </div>
      </div>
      {isGameOver && (
        <div className="gameover-wrapper">
          <p>{winnerSuit} WIN!</p>
          <button onClick={() => window.location.reload()}>Options</button>
          <button onClick={newGame}>Play Again</button>
        </div>
      )}
    </>
  )
}
