import { Card, CardSuit, CardFace, GameData, Action, AcePosition } from "../types/game"

const SUITS_ARR: CardSuit[] = ["CLUBS", "DIAMONDS", "HEARTS", "SPADES"]
const FACES_ARR: CardFace[] = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"]

class DeckWithoutAces {
  #cards: Card[]

  constructor() {
    this.#cards = []

    SUITS_ARR.forEach((suit: CardSuit) => {
      FACES_ARR.forEach((face: CardFace) => {
        this.#cards.push({
          face,
          suit,
        })
      })
    })
  }

  shuffle(): void {
    const shuffleAmount: number = 10

    for (let i = 0; i < shuffleAmount; i++) {
      for (let j = 0; j < this.#cards.length; j++) {
        const randomIdx: number = Math.floor(Math.random() * this.#cards.length)

        ;[this.#cards[j], this.#cards[randomIdx]] = [this.#cards[randomIdx], this.#cards[j]]
      }
    }
  }

  drawCard(): Card {
    return this.#cards.splice(0, 1)[0]
  }
}

export function generateNewGameData(rowAmount: number = 6): [Action[], GameData] {
  const gameData: GameData = {
    acePositions: [
      { suit: "CLUBS", position: 0 },
      { suit: "DIAMONDS", position: 0 },
      { suit: "HEARTS", position: 0 },
      { suit: "SPADES", position: 0 },
    ],
    rowCards: [],
    winner: null,
  }

  const actionHistory: Action[] = []

  const deck = new DeckWithoutAces()
  deck.shuffle()

  for (let i = 0; i < rowAmount; i++) {
    gameData.rowCards.push({ flipped: false, value: deck.drawCard() })
  }

  while (true) {
    const drawnCard: Card = deck.drawCard()
    actionHistory.push({
      actionType: "DRAW",
      value: drawnCard,
    })

    const selectedAceIndex: number = gameData.acePositions.findIndex(
      (ace: AcePosition) => ace.suit === drawnCard.suit
    )
    actionHistory.push({
      actionType: "MOVE",
      value: drawnCard.suit,
    })

    gameData.acePositions[selectedAceIndex].position += 1
    if (gameData.acePositions[selectedAceIndex].position === rowAmount) {
      gameData.winner = drawnCard.suit
      break
    }

    for (let i = 0; i < rowAmount; i++) {
      const haveAllAcesLeftRow: boolean = gameData.acePositions.every(
        (ace: AcePosition) => ace.position > i
      )
      if (!haveAllAcesLeftRow) {
        break
      }

      if (!gameData.rowCards[i].flipped) {
        gameData.rowCards[i].flipped = true
        const rowCardSuit: CardSuit = gameData.rowCards[i].value.suit
        actionHistory.push({
          actionType: "FLIP",
          value: i,
        })

        const selectedAceIndex: number = gameData.acePositions.findIndex(
          (ace: AcePosition) => ace.suit === rowCardSuit
        )
        if (selectedAceIndex === -1) {
          break
        }

        gameData.acePositions[selectedAceIndex].position -= 1

        actionHistory.push({
          actionType: "BACK",
          value: rowCardSuit,
        })
      }
    }
  }

  return [actionHistory, gameData]
}
