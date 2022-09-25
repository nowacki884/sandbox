const secondInMs = 1000

const menu = document.querySelector('.menu')
const startButton = document.querySelector('.menu button')
const tiles = document.querySelectorAll('.tile')

// Winning conditions
const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2]
]

// Random ID generator
function generateId(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvqxyz1234567890'
    let output = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        output += chars[randomIndex]
    }

    return output
}

class Game {
    id
    state
    winner
    board

    constructor() {
        this.id = generateId()
        this.state = true
        this.winner = null
        this.board = Array(9).fill(null)
    }

    // Place symbol on the board
    placeSymbol(index, value) {
        const img = document.createElement('img')
        img.classList.add('symbol')
        value ? img.src = './assets/cross.svg' : img.src = './assets/circle.svg'
        tiles[index].appendChild(img)
    }

    // Check who wins
    #checkWinner() {
        if (!this.state) return

        winningLines.forEach((line) => {
            const [a, b, c] = line
            if (this.board[a] !== null && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
                this.winner = this.board[a]
                this.state = false
                console.log(this.winner ? "You win!" : "You lost!")
            }
        })
    }

    // Pick a random spot
    #computeAiMove() {
        if (!this.state) return

        const emptyTiles = []

        this.board.forEach((tile, index) => {
            if (tile === null) emptyTiles.push(index)
        })

        const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)]

        setTimeout(() => {
            this.board[randomIndex] = false
            this.placeSymbol(randomIndex, false)
            this.#checkWinner()
        }, secondInMs)
    }

    // User input
    place(index) {
        if (!this.state) return

        if (this.board[index] !== null) return console.log('Pick a different tile!')

        this.board[index] = true

        this.placeSymbol(index, true)

        this.#checkWinner()

        this.#computeAiMove()
    }
}

startButton.addEventListener('click', () => {
    menu.style.display = 'none'

    const game = new Game()

    tiles.forEach((tile) => {
        tile.addEventListener('click', () => {
            const tileIndex = tile.getAttribute('data-index')
            game.place(tileIndex)
        })
    })
})