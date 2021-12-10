import crypto from "crypto"

export const getCryptedPassword = (salt: string, password: string) => {
  return crypto.createHash("sha1").update(`--${salt}--${password}--`).digest("hex")
}
