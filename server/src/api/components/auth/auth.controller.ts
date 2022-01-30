import { Request, Response } from "express"
import httpStatus from "http-status"

import ControllerBase from "@root/ControllerBase"
import AuthService from "@root/api/components/auth/auth.service"
import {createJWT} from "@helpers/jwt"
import { DB } from "@database/entity"

class AuthController extends ControllerBase {
  public authService = new AuthService()

  public get = async (req: Request, res: Response) => {
    if (!req.user) return
    const response = await this.authService.getAuth(req.user._id)
    res.json(response)
  }

  public auth = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await this.authService.getUserByEmailPassword(username, password)

    if (!user || !user._id) {
      return this.httpError(res, "Invalid email or password", httpStatus.UNAUTHORIZED)
    }

    const token = createJWT(user._id)
    const token_ttl = 900

    if (!token) {
      return this.httpError(res, "Invalid email or password", httpStatus.UNAUTHORIZED)
    }

    return res.json({token, token_ttl})
  }

  public register = async (req: Request, res: Response) => {
    const { username, password } = req.body
    const exist = await DB.User.findOne({ username: username})

    if(exist) {
      return this.httpError(res, "Username already exists. Try another nickname.", httpStatus.BAD_REQUEST)
    }

    const newUser = await this.authService.createUser(username, password)
    const token = createJWT(newUser._id)

    if (!token) {
      return this.httpError(res, "Invalid email or password", httpStatus.UNAUTHORIZED)
    }

    return res.json(token)
  }
}

export default AuthController
