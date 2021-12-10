import express from "express"

export const httpError = (res: express.Response, message: string, code: number) => {
  return res.status(code).json({ success: false, message })
}
