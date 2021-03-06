import { Router } from "express"
import { Routes } from "@root/interfaces/routes"
import authRoutes from "./components/auth/auth.route"
import userRoutes from "./components/user/user.route"
import emoticonRoutes from "./components/emoticon/emoticon.route"
import membershipRoutes from "./components/membership/membership.route"
import messageRoutes from "./components/message/message.route"
import channelsRoutes from "./components/channels/channels.route"

class SiteRoute implements Routes {
  public router = Router()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.use('/auth', authRoutes)
    this.router.use('/users', userRoutes)
    this.router.use('/emoticon', emoticonRoutes)
    this.router.use('/membership', membershipRoutes)
    this.router.use('/messages', messageRoutes)
    this.router.use('/channels', channelsRoutes)
  }
}

export default new SiteRoute().router
