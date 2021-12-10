import {Schema} from "mongoose"

export interface MembershipInterface {
  userId: string | Schema.Types.ObjectId
  channelId: string | Schema.Types.ObjectId
}
