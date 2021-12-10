import {Schema} from "mongoose"

export interface EmoticonInterface {
  userId: string | Schema.Types.ObjectId
  messageId: string | Schema.Types.ObjectId
  icon: string
}
