import jwt from "jsonwebtoken"
import config from "@config/index"
import { JWT } from "@interfaces/jwt"

export const decrypt = (token: string): JWT | null => {
  try {
    const data: JWT = jwt.verify(token, config.jwtSecret) as JWT
    if (data.user_id) {
      return data
    }
  } catch (_) {
    return null
  }

  return null
}

export const encrypt = (payload: JWT): string => {
  return jwt.sign(payload, config.jwtSecret)
}

const getTimeStamp = () => Math.round(new Date().getTime() / 1000)

export const createJWT = (userId: string, ttl: number = config.jwtTTL) =>
  encrypt({
    user_id: userId,
    expires_at: getTimeStamp() + ttl
  })

export const createRefresh = (userId: string) =>
  encrypt({
    user_id: userId,
    expires_at: getTimeStamp() + config.refreshTokenTTL
  })
