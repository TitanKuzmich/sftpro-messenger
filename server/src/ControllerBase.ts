import express from "express"
import { createJWT, decrypt, encrypt } from "@helpers/jwt"

interface JWT {
  decrypt: typeof decrypt
  encrypt: typeof encrypt
  create: typeof createJWT
}

abstract class ControllerBase {
  public jwt: JWT = {
    decrypt,
    encrypt,
    create: createJWT
  }

  public httpError = (res: express.Response, message: string, code: number) => {
    return res.status(code).json({ success: false, message })
  }
}

export default ControllerBase
