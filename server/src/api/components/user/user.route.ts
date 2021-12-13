import { Router } from "express"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

import UserController from "./user.controller"

class UserRoute implements Routes {
  public router = Router()
  public userController = new UserController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.userController.getAll)
    this.router.get("/:userId", auth, this.userController.getOne)
    this.router.patch("/edit/:userId", auth, this.userController.edit)
  }
}

export default new UserRoute().router
