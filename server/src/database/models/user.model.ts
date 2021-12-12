import { model, Schema } from "mongoose"

import {UserModel} from "@interfaces/models/user.interface"

const UserSchema = new Schema<UserModel>({
  username: {
    type: String,
    required: true,
    unique: true
  },

  crypted_password: {
    type: String,
    required: true
  },

  salt: {
    type: String,
    field: "salt",
    required: true
  },

  aviUrl: {
    type: String
  }
})

UserSchema.pre('save', function(this: any, next: any){
  if(!this.aviUrl){
    const aviUrls = [
      'https://res.cloudinary.com/tisai/image/upload/v1639123466/tisai_ava1_ulugjx.png',
      'https://res.cloudinary.com/tisai/image/upload/v1639123499/tisai_ava2_xwxjxd.png',
      'https://res.cloudinary.com/tisai/image/upload/v1639123526/tisai_ava3_cwg9fv.png',
      'https://res.cloudinary.com/tisai/image/upload/v1639123561/tisai_ava4_gl47ku.png',
      'https://res.cloudinary.com/tisai/image/upload/v1639123590/tisai_ava5_hvlyy3.png',
      'https://res.cloudinary.com/tisai/image/upload/v1639123617/tisai_ava6_fvkiqw.png'
    ];
    const randomIndex = Math.floor(Math.random() * aviUrls.length)
    const aviUrl = aviUrls[randomIndex]
    this.aviUrl = aviUrl
  }

  next()
})

export const User = model<UserModel>('User', UserSchema)
