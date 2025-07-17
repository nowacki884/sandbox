// Deps import
import { useEffect } from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"

// Context import
import UserProvider from "./contexts/UserContext"

// Hooks import
import socket from "./hooks/useSocket"

// Pages import
import Load from "./pages/Load"
import Register from "./pages/Register"
import GameRoom from "./pages/GameRoom"

function App() {
  useEffect(() => {
    socket.on("active_users_update", (activeUsers) => console.log(activeUsers))
    socket.on("socket_room_join", (roomId: string) => console.log(`joined socket room ${roomId}`))
    socket.on("pong", (userId: string) => console.log(userId))

    return () => {
      socket.off("active_users_update")
      socket.off("socket_room_join")
      socket.off("pong")
    }
  }, [])

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Load />} />
          <Route path="/register" element={<Register />} />
          <Route path="/room/:id" element={<GameRoom />} />
        </Routes>
      </Router>
    </UserProvider>
  )
}

export default App
