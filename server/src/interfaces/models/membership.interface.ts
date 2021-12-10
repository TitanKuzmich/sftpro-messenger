import {Schema} from "mongoose"

export interface MembershipAttributes {
  userId: string | Schema.Types.ObjectId
  channelId: string | Schema.Types.ObjectId
}

export interface MembershipModel extends Schema, MembershipAttributes {}
