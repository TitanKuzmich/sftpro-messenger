import { Router } from "express"
import EmoticonController from "./emoticon.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class EmoticonRoute implements Routes {
  public router = Router()
  public emoticonController = new EmoticonController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.emoticonController.getEmoticon)
    this.router.post("/", auth, this.emoticonController.postEmoticon)
  }
}

export default new EmoticonRoute().router
