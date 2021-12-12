import {Schema} from "mongoose"

import {EmoticonModel} from "@interfaces/models/emoticon.interface"

export interface MessageAttributes {
  _id: string
  userId: string | Schema.Types.ObjectId
  channelId: string | Schema.Types.ObjectId
  content: string
  emoticons: Array<Partial<EmoticonModel>>
}


export interface MessageModel extends Schema, MessageAttributes {}
