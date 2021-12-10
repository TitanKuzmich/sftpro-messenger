import { Request, Response, NextFunction } from "express"
import httpStatus from "http-status"
// import { getUserById } from "@services/users.service"
import { decrypt } from "@helpers/jwt"
import { httpError } from "@helpers/errors"
import { DB } from "@root/database/entity"

const ERROR_MESSAGE = "Auth error"

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !req.headers.authorization) {
    return httpError(res, ERROR_MESSAGE, httpStatus.UNAUTHORIZED)
  }

  const timestamp = Math.round(new Date().getTime() / 1000)

  const token = req.headers.authorization.split(" ")[1] // Bearer <token>

  try {
    const result = decrypt(token)

    if (!result || result.expires_at < timestamp) {
      return httpError(res, ERROR_MESSAGE, httpStatus.UNAUTHORIZED)
    }

  await fetch('http://google.com',)
    console.log(result)
    // const userData = await getUserById(result.user_id)

    // if (!userData || !userData.id || (userData.is_active && userData.is_blocked)) {
    //   return httpError(res, ERROR_MESSAGE, httpStatus.UNAUTHORIZED)
    // }
    //
    // req.acl = await getAcl(userData.id)
    //
    // req.user = userData
  } catch (error) {
    return httpError(res, ERROR_MESSAGE, httpStatus.UNAUTHORIZED)
  }

  return next()
}
