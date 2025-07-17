import { io } from "socket.io-client"

const hostname = window.location.hostname
const serverAddress = `http://${hostname}:8000`
const socket = io(serverAddress, {
  forceNew: true,
})

export default socket
