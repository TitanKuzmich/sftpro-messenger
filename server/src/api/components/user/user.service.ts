import httpStatus from "http-status"
import ApiError from "@helpers/api-error"
import {DB} from "@database/entity"

import {DBResponse} from "@interfaces/db";
import {UserModel} from "@interfaces/models/user.interface"

export const getUserById = async (id: number): DBResponse<UserModel> => {
  if (!id) throw new ApiError("User does not exists", httpStatus.INTERNAL_SERVER_ERROR)

  return await DB.User.findOne({where: { _id: id } })
}
