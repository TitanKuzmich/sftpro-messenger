import httpStatus from "http-status"
import * as uuid from "uuid"

import {DB} from "@database/entity"
import { User } from "@database/models/user.model"
import {DBResponse} from "@interfaces/db"
import { UserModel} from "@interfaces/models/user.interface"
import {getCryptedPassword} from "@helpers/cryptedPassword"

import { AuthResponse } from "./auth.interface"

class AuthService {
  public userModel = DB.User

  public async createUser(username: string, password: string): Promise<UserModel> {
    const salt = uuid.v4()
    const hashedPassword = getCryptedPassword(salt, password)

    const newUser = new User({ username: username, crypted_password: hashedPassword, salt: salt })

    await newUser.save()

    return newUser
  }

  public async getAuth(userId: string): Promise<AuthResponse | null> {
    const user = await this.userModel.findOne({ where: { _id: userId } })

    if (!user || !user.id) {
      return null
    }

    return {
      _id: userId,
      username: user.username
    }
  }

  public async getUserByEmailPassword(username: string, password: string): DBResponse<UserModel> {
    if (!username || !password) {
      return null
    }

    const userData = await this.userModel.findOne({ username })

    if (!userData?._id) {
      return null
    }

    const cryptedPassword = getCryptedPassword(userData.salt, password)

    if (cryptedPassword === userData.crypted_password) {
      return userData
    }

    return null
  }
}

export default AuthService
