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
    this.router.get("/:userId", auth, this.channelController.getAll)
    this.router.post("/", auth, this.channelController.createChannel)
    this.router.get("/channel/:channelId", auth, this.channelController.getOne)
    this.router.delete("/:channelId", auth, this.channelController.deleteChannel)

    this.router.get("/users/:channelId", auth, this.channelController.getUsers)
    this.router.get("/messages/:channelId", auth, this.channelController.getMessages)
  }
}

export default new ChannelsRoute().router
