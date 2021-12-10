import { Router } from "express"
import { Routes } from "@root/interfaces/routes"
// import authRoutes from "./components/auth/auth.route"

class SiteRoute implements Routes {
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    // this.router.use("/auth", authRoutes)
  }
}

export default new SiteRoute().router
