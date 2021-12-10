import { Router } from "express"
import AuthController from "./auth.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class AuthRoute implements Routes {
  public router = Router()
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.authController.get)
    this.router.post("/", this.authController.auth)
  }
}

export default new AuthRoute().router
