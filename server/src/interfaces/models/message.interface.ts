import {Schema} from "mongoose"

import {Emoticon} from "@interfaces/models/emoticon.interface"

export interface MessageInterface {
  userId: string | Schema.Types.ObjectId
  channelId: string | Schema.Types.ObjectId
  content: string
  emoticons: Array<Partial<Emoticon>>
}
