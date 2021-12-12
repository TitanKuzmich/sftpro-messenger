import { Router } from "express"
import UserController from "./user.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class UserRoute implements Routes {
  public router = Router()
  public userController = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.userController.getAll)
    this.router.get("/:id", auth, this.userController.getOne)
    this.router.patch("/edit", auth, this.userController.edit)
  }
}

export default new UserRoute().router
