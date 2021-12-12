import { Router } from "express"
import { Routes } from "@root/interfaces/routes"
import authRoutes from "./components/auth/auth.route"
import userRoutes from "./components/user/user.route"
import emoticonRoutes from "./components/emoticon/emoticon.route"

class SiteRoute implements Routes {
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.use('/auth', authRoutes)
    this.router.use('/users', userRoutes)
    this.router.use('/emoticon', emoticonRoutes)
  }
}

export default new SiteRoute().router
