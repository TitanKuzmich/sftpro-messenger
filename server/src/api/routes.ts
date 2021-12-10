import { Router } from "express"
import { Routes } from "@root/interfaces/routes"
import authRoutes from "./components/auth/auth.route"

class SiteRoute implements Routes {
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.use('/auth', authRoutes)
    // this.router.use('/users', require('./user/user_routes'))
    // this.router.use('/channels', require('./channel/channel_routes'))
    // this.router.use('/memberships', require('./membership/membership_routes'))
    // this.router.use('/messages', require('./message/message_routes'))
    // this.router.use('/emoticons', require('./emoticon/emoticon_routes'))
  }
}

export default new SiteRoute().router
