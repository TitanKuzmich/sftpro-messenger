import "../aliases"
import { createServer } from "http"
import { Server } from "socket.io"
import { decrypt } from "@helpers/jwt"
import config from "@config/index"
import { SocketEvent, Sessions } from "@interfaces/socket"
import { processEvent, userConnectHook } from "./controllers"
import "@database/connect"

export const httpServer = createServer()
const io = new Server(httpServer, {
  cors: {
    origin: "*"
  }
})

const sessions: Sessions = {}

export const sendToUserSockets = (userId: number, data: any) => {
  if (sessions[userId] != undefined) {
    sessions[userId].forEach(i => {
      io.sockets.to(i).emit("event", data)
    })
  }
}

io.on("connection", socket => {
  const userSocketId = socket.id
  const token = socket.handshake.auth ? socket.handshake.auth.token : ""
  const userData = decrypt(token)

  if (userData) {
    const userId = userData.user_id

    if (!sessions[userId]) {
      sessions[userId] = [userSocketId]
    } else {
      sessions[userId].push(userSocketId)
    }
  }

  if (!userData) {
    if (socket.handshake.address.includes("127.0.0.1") && config.env !== "test") {
      console.log("Node backend connected:", userSocketId)
    } else {
      socket.disconnect()
    }
  }

  if (userData) {
    userConnectHook(userData.user_id)
  }

  socket.on("event", (event: SocketEvent) => {
    /***
     * Event from node-backend to frontend client
     */
    if (typeof event === "object" && event.to) {
      const userEvent = { ...event }
      delete userEvent.to
      sendToUserSockets(event.to, userEvent)
    }

    /**
     * Event from frontend client to socket server
     */
    if (typeof event === "object" && userData && userData.user_id && !event.to) {
      processEvent(userData.user_id, event)
    }
  })

  socket.on("disconnect", () => {
    Object.keys(sessions).forEach(strUserId => {
      const userId = Number(strUserId)
      if (sessions[userId].includes(userSocketId)) {
        sessions[userId] = sessions[userId].filter(id => id !== userSocketId)
        if (!sessions[userId].length) {
          delete sessions[userId]
        }
      }
    })
  })
})

if (config.env !== "test") {
  httpServer.listen(config.socketPort)
  console.log("Socket server port:", config.socketPort)
}

export default io
