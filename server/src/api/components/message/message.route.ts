import { Router } from "express"
import MessageController from "./message.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class MessageRoute implements Routes {
  public router = Router()
  public messageController = new MessageController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.messageController.getAll)
    this.router.get("/:messageId", auth, this.messageController.getOne)

    this.router.post("/", auth, this.messageController.postMessage)

    this.router.delete("/:messageId", auth, this.messageController.deleteMessage)
    this.router.patch("/edit/:messageId", auth, this.messageController.edit)
  }
}

export default new MessageRoute().router
