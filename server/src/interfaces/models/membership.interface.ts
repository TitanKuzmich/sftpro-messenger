import {Schema} from "mongoose"

export interface MembershipAttributes {
  _id: string
  userId: string | Schema.Types.ObjectId
  channelId: string | Schema.Types.ObjectId
}

export interface MembershipModel extends Schema, MembershipAttributes {}
