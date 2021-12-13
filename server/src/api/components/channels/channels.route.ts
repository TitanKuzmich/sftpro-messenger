import { Router } from "express"
import ChannelsController from "./channels.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class ChannelsRoute implements Routes {
  public router = Router()
  public channelController = new ChannelsController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.channelController.getAll)
    this.router.post("/", auth, this.channelController.createChannel)
    this.router.get("/:chatId", auth, this.channelController.getOne)
    this.router.delete("/:chatId", auth, this.channelController.deleteChannel)

    this.router.patch("/:chatId/users", auth, this.channelController.getUsers)
    this.router.patch("/:chatId/messages", auth, this.channelController.getMessages)
  }
}

export default new ChannelsRoute().router
