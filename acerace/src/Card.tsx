import { Card } from "./types/game"

export default function CardElement({ cardData, back }: { cardData: Card | null; back: boolean }) {
  const cardFace = cardData
    ? typeof cardData.face === "number"
      ? cardData.face
      : cardData.face.toLowerCase()
    : ""
  const cardSuit = cardData && cardData.suit[0].toLowerCase()
  const classname = back ? "pcard-back" : `pcard-${cardFace}${cardSuit}`

  return (
    <span style={{ width: "var(--card-w)", height: "var(--card-h)" }} className={classname}></span>
  )
}
