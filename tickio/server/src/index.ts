// Deps import
import express from "express"
import http from "node:http"
import { Server, Socket } from "socket.io"

// Funcs import
import checkDataMissmatch from "./functions/checkDataMissmatch"
import log from "./functions/log"
import users, {
  User,
  loadSavedUserData,
  registerNewUser,
  userDataBackupRoutine,
} from "./logic/userLogic"

// GameRoomManager
import GameRoomManager from "./logic/game/GameRoomManager"

// Type imports
import GameRoom from "./logic/game/Game"
import { StatusCallback, StatusCode } from "./types/codes"
import { GameRoomType, PlayerData } from "./types/game"
import { RegisterData } from "./types/users"

interface ActiveUserServer {
  socketId: string
  username: string
  level: number
}

export interface ActiveUserDisplay {
  username: string
  level: number
}

// STEP: Server init
log("STARTUP", "Initializing server...")

// Control variable - block traffic if true
let processing: boolean = true

// List of currently active users to display
const activeUsers = new Map<string, ActiveUserServer>()

// STEP: Handling users data
log("STARTUP", "Attempting to read saved user data...")

const loadUserError = loadSavedUserData()

if (loadUserError) {
  log("ERROR", "Failed to load saved user data!")
  log("ERROR", `${loadUserError}`)
  process.exit(0)
}

log("STARTUP", "User data loaded successfully!")

// STEP: Game room manager
log("STARTUP", "Creating the Game Room Manager...")

const gameRoomManager = new GameRoomManager()

log("STARTUP", "Game Room Manager successfully created!")

// STEP: Game room cleanup and updates to databases
log("STARTUP", "Setting up interval methods...")

setInterval(() => {
  userDataBackupRoutine()
  gameRoomManager.cleanupRoutine()
}, 30000)

log("STARTUP", "Interval methods set up successfully!")

// STEP: Server startup
log("STARTUP", `Starting the server...`)

const app = express()

// STEP: HTTP server middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  next()
})

app.use(express.json())

app.use((req, res, next) => {
  if (processing) {
    log("HTTP", `${req.method} ${decodeURI(req.url)} 503`)
    res.status(503).send({ msg: "Server maintenance, please try again later." })
    return
  } else {
    next()
  }
})

app.use((req, res, next) => {
  res.on("finish", () => {
    log("HTTP", `${req.method} ${decodeURI(req.url)} ${res.statusCode}`)
  })
  next()
})

const httpServer = http.createServer(app)

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
})

// STEP: HTTP handlers
app.get("/", (req, res) => {
  res.status(200).send({ msg: "Hello HTTP" })
})

app.post("/register", (req, res) => {
  const example: RegisterData = {
    uid: "",
    username: "",
  }

  const isMismatch: boolean = checkDataMissmatch(example, req.body)
  if (isMismatch) {
    res.status(400).send({ msg: "Bad request body!" })
    return
  }

  const reqBody = req.body as RegisterData

  log("USER", "New user attempt...")

  const resultMessage = registerNewUser(reqBody.uid, reqBody.username)

  let status: number = 200

  if (resultMessage === "success") {
    log("USER", `Successfully registered a new user! Welcome: ${reqBody.username}!`)
  }

  if (resultMessage === "uid_exists") {
    log("USER", `User with uid: ${reqBody.uid} already exists!`)
  }

  if (resultMessage === "username_taken") {
    status = 409
    log("USER", `Username: ${reqBody.username} is already taken!`)
  }

  res.status(status).send({ msg: resultMessage })
})

// NOTE: Test route
app.get("/test", (req, res) => {
  // const activeUsersData: ActiveUserDisplay[] = []
  // activeUsers.forEach((v, k, m) => activeUsersData.push({ username: v.username, level: v.level }))
  // res.status(200).send({ msg: "Active user list", activeUsers: activeUsersData })
  // console.log(req.body)
  // res.status(200).send({ msg: "Testing" })
  // const x = 4
  // const boardData = calculateBoardData(x)
  // res.status(200).send(boardData)
  const newRoomId = gameRoomManager.createGameRoom(3)
  if (!newRoomId) return res.status(500).send({ msg: "Internal server error!", roomId: newRoomId })
  res.status(200).send({ msg: "Room created!", roomId: newRoomId })
})

// STEP: Socket handlers
io.on("connection", (socket: Socket) => {
  // NOTE: Save user id for current socket connection
  const currentSocketUserData: RegisterData = {
    uid: "",
    username: "",
  }

  // NOTE: Helper functions
  function activeUsersUpdate(): void {
    const activeUsersData: ActiveUserDisplay[] = []
    activeUsers.forEach((v, k, m) => activeUsersData.push({ username: v.username, level: v.level }))

    io.emit("active_users_update", activeUsersData)
  }

  function logInUser(userData: User): void {
    socket.emit("user_data", userData)

    activeUsers.set(userData.uid, {
      socketId: socket.id,
      username: userData.username,
      level: userData.level,
    })

    activeUsersUpdate()
    currentSocketUserData.uid = userData.uid
    currentSocketUserData.username = userData.username
    log("USER", `User ${userData.username} has logged in!`)
  }

  socket.on("ping", () => {
    log("SOCKET", "ping")
    socket.emit("pong", currentSocketUserData.uid)
  })

  // NOTE: Auth routes
  socket.on("login", (uid: string) => {
    if (!uid || typeof uid !== "string") {
      socket.emit("bad_request")
      return
    }

    if (processing) {
      socket.emit("server_maintenance")
      return
    }

    if (!uid || typeof uid !== "string") {
      socket.emit("bad_login_data")
      return
    }

    const userData: User | undefined = users.data.find((user) => user.uid === uid)
    if (!userData) {
      socket.emit("uid_not_found")
      return
    }

    logInUser(userData)
  })

  socket.on("disconnect", () => {
    activeUsers.delete(currentSocketUserData.uid)
    activeUsersUpdate()
  })

  // NOTE: Game room routes
  socket.on("create_game_room", (gameRoomType: GameRoomType, cb: StatusCallback) => {
    if (!gameRoomType) {
      cb(StatusCode.BAD_REQUEST)
      return
    }

    const newRoomId: string | null = gameRoomManager.createGameRoom(gameRoomType)
    if (!newRoomId) {
      cb(StatusCode.INTERNAL_SERVER_ERROR)
      return
    }

    cb(StatusCode.OK, newRoomId)
  })

  socket.on("check_does_game_room_exist", (gameRoomId: string, cb: StatusCallback) => {
    if (!gameRoomId || typeof gameRoomId !== "string") {
      cb(StatusCode.BAD_REQUEST)
      return
    }

    const gameRoomStatus: StatusCode = gameRoomManager.doesGameRoomExist(gameRoomId)
    cb(gameRoomStatus)
  })

  socket.on("check_uid_is_in_game_room", (gameRoomId: string, uid: string, cb: StatusCallback) => {
    const con1: boolean =
      !gameRoomId || !uid || typeof gameRoomId !== "string" || typeof uid !== "string"
    if (con1) {
      cb(StatusCode.BAD_REQUEST)
      return
    }

    const selectedRoom: GameRoom | undefined = gameRoomManager.selectGameRoom(gameRoomId)
    if (!selectedRoom) {
      cb(StatusCode.NOT_FOUND)
      return
    }

    const playerData: PlayerData = selectedRoom.getPlayers()
    const isUidInRoom: boolean = uid === playerData.p1 || uid === playerData.p2
    cb(StatusCode.OK, isUidInRoom)
  })

  socket.on("join_game_room_with_id", (gameRoomId: string, uid: string, cb: StatusCallback) => {
    const con1: boolean =
      !gameRoomId || !uid || typeof gameRoomId !== "string" || typeof uid !== "string"
    if (con1) {
      cb(StatusCode.BAD_REQUEST)
      return
    }

    const joiningStatus: StatusCode = gameRoomManager.joinGameRoomWithId(gameRoomId, uid)
    if (joiningStatus === StatusCode.OK) {
      socket.join(gameRoomId)
      socket.emit("socker_room_join", gameRoomId)
      socket.to(gameRoomId).emit("player_joined", currentSocketUserData.username)
    }

    cb(joiningStatus)
    log("GAME", `Player ${currentSocketUserData.username} joined the room ${gameRoomId}!`)

    // NOTE: Update users boards
    // Start the game automatically when room is full
    // Send update to players
    const selectedGameRoom: GameRoom | undefined = gameRoomManager.selectGameRoom(gameRoomId)
    if (!selectedGameRoom) return

    if (selectedGameRoom.isRoomFull()) {
      const initGameData = selectedGameRoom.start()
      socket.emit("game_update", initGameData)
      socket.to(gameRoomId).emit("game_update", initGameData)
      log("GAME", `Game ${gameRoomId} started!`)
    }
  })

  // FIXME: something fucky wucky happening when leaving the game
  // game doesn't forfeit when it's started and player leaves
  socket.on("leave_game_room", (gameRoomId: string, uid: string, cb: StatusCallback) => {
    if (!gameRoomId || typeof gameRoomId !== "string") {
      cb(StatusCode.BAD_REQUEST)
      return
    }

    const leavingStatus: StatusCode = gameRoomManager.removePlayerFromGameRoom(gameRoomId, uid)
    cb(leavingStatus)
    log("GAME", `Player ${currentSocketUserData.username} left the room ${gameRoomId}!`)

    if (leavingStatus === StatusCode.OK) {
      socket.leave(gameRoomId)

      // TODO: Check the return values
      // In the client it sends null as post game data
      const game = gameRoomManager.selectGameRoom(gameRoomId)
      // NOTE: 1st to inspect
      if (!game)
        return socket.to(gameRoomId).emit("player_left", currentSocketUserData.username, null)

      // NOTE: 2nd to inspect
      const postGameData = game.getPostGameData()
      if (!postGameData)
        return socket.to(gameRoomId).emit("player_left", currentSocketUserData.username, null)

      socket
        .to(gameRoomId)
        .emit("player_left", currentSocketUserData.username, game.getPostGameData())
      log(
        "GAME",
        `Winner in room ${gameRoomId}: ${
          users.data.filter((user) => user.uid === postGameData.winnerUid)[0].username
        }!`
      )
    }
  })

  // TODO: Handle game logic
})

const PORT = 8000
httpServer.listen(PORT)

log("STARTUP", `Server started and listening on port: ${PORT}!`)

processing = false
