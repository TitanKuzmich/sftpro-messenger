import { model, Schema } from "mongoose"

import {MessageInterface} from "@interfaces/models/message.interface"

const MessageSchema = new Schema<MessageInterface>({
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

export const MessageModel = model<MessageInterface>('message', MessageSchema)
