import {DB} from "@database/entity"
import {getCryptedPassword} from "@helpers/cryptedPassword"

import {DBResponse} from "@interfaces/db"
import { UserModel} from "@interfaces/models/user.interface"

import { AuthResponse } from "./auth.interface"

class AuthService {
  public userModel = DB.User

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

  public async getUserByEmailPassword(email: string, password: string): DBResponse<UserModel> {
    if (!email || !password) {
      return null
    }

    const userData = await this.userModel.findOne({
      where: {
        email
      }
    })

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
