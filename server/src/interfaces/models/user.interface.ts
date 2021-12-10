import { Schema } from "mongoose"

export interface UserAttributes {
  _id: string
  username: string
  crypted_password: string
  aviUrl: string
  salt: string
}

export interface UserModel extends Schema, UserAttributes {}
