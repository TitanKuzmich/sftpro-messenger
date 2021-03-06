import { Request, Response } from "express"
import httpStatus from "http-status"

import ControllerBase from "@root/ControllerBase"
import UserService from "@root/api/components/user/user.service"
import { DB } from "@database/entity"

class UserController extends ControllerBase {
  public userService = new UserService()

  public edit = async (req: Request, res: Response) => {
    const { userId } = req.params
    const payload = req.body

    const response = await this.userService.editUser(userId, payload)

    if (response && response._id) {
      return res.json({ updatedId: response._id })
    }

    return res.json({ success: false, message: "User does not exists" })
  }

  public getAll = async (req: Request, res: Response) => {
    const users = await DB.User.find({})

    return res.json(users)
  }

  public getOne = async (req: Request, res: Response) => {
    const { userId } = req.params

    if (!userId) {
      return this.httpError(res, "Invalid users ID", httpStatus.BAD_REQUEST)
    }

    const response = await this.userService.getUserById(userId)

    return res.json({userId, response})
  }
}

export default UserController
