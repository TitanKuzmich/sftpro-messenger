import { model, Schema } from "mongoose"

import {MessageModel} from "@interfaces/models/message.interface"

const MessageSchema = new Schema<MessageModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
    index: true,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  emoticons: [
    {userId: String, icon: String}
  ]
}, {timestamps: true})

export const Message = model<MessageModel>('message', MessageSchema)
