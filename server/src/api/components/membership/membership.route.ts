import { Router } from "express"
import MembershipController from "./membership.controller"
import { auth } from "@root/api/middlewares/auth"

import { Routes } from "@interfaces/routes"

class MembershipRoute implements Routes {
  public router = Router()
  public membershipController = new MembershipController()

  constructor() {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get("/", auth, this.membershipController.getMembership)
  }
}

export default new MembershipRoute().router
