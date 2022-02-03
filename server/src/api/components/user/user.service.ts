import httpStatus from "http-status"
import ApiError from "@helpers/api-error"
import { DB } from "@database/entity"

import { DBResponse } from "@interfaces/db"
import { UserModel } from "@interfaces/models/user.interface"

class UserService {
  public userModel = DB.User

  public async getUserById(id: string): DBResponse<UserModel> {
    if (!id) throw new ApiError("User does not exists", httpStatus.INTERNAL_SERVER_ERROR)

    return await this.userModel.findById({ _id: id })
  }

  public async editUser(id: string, payload: UserModel): DBResponse<UserModel> {
    const updatedUser = await this.userModel.findById( { _id: id })

    if (!updatedUser) {
      return null
    }

    await updatedUser.updateOne({...payload})
    await updatedUser.save()

    return updatedUser
  }
}

export default UserService
