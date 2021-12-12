import {Schema} from "mongoose"
import {MembershipAttributes} from "@interfaces/models/membership.interface";

export interface EmoticonAttributes {
  _id: string
  userId: string | Schema.Types.ObjectId
  messageId: string | Schema.Types.ObjectId
  icon: string
}

export interface EmoticonModel extends Schema, EmoticonAttributes {}
