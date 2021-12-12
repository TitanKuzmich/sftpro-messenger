import { Router } from "express"
import MessageController from "./message.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class MessageRoute implements Routes {
  public router = Router()
  public userController = new MessageController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.userController.getAll)
    this.router.post("/", auth, this.userController.postMessage)

    this.router.get("/:id", auth, this.userController.getOne)
    this.router.patch("/edit", auth, this.userController.edit)
    this.router.delete("/edit", auth, this.userController.deleteMessage)
  }
}

export default new MessageRoute().router
