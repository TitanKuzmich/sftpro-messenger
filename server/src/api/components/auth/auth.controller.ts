import { Request, Response } from "express"
import httpStatus from "http-status"

import config from "@root/config"
import ControllerBase from "@root/ControllerBase"
import AuthService from "@root/api/components/auth/auth.service"
import {createJWT} from "@helpers/jwt"

class AuthController extends ControllerBase {
  public authService = new AuthService()

  public get = async (req: Request, res: Response) => {
    if (!req.user) return
    const response = await this.authService.getAuth(req.user._id)
    res.json(response)
  }

  public auth = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const userIp = req.clientIp || ""

    const user = await this.authService.getUserByEmailPassword(email, password)

    if (!user || !user._id) {
      return this.httpError(res, "Invalid email or password", httpStatus.UNAUTHORIZED)
    }

    const token = createJWT(user._id)

    if (!token) {
      return this.httpError(res, "Invalid email or password", httpStatus.UNAUTHORIZED)
    }

    return res.json(token)
  }
}

export default AuthController
