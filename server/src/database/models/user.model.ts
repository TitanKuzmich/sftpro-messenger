import { model, Schema } from "mongoose"

import {UserInterface} from "@interfaces/models/user.interface"

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema<UserInterface>({
  username: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  aviUrl: {
    type: String
  }
})

UserSchema.pre('save', function(this: any, next: any) {
  if (!this.isModified('password')) return next()

  this.password = this.encryptPassword(this.password)
  next()
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

UserSchema.methods = {
  authenticate: function(plainTextPword: any) {
    return bcrypt.compareSync(plainTextPword, this.password);
  },
  encryptPassword: function(plainTextPword: any) {
    if (!plainTextPword) {
      return ''
    } else {
      const salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPword, salt)
    }
  },
  toJson: function() {
    const obj = this.toObject()
    delete obj.password
    return obj
  }
}


export const UserModel = model<UserInterface>('User', UserSchema)
