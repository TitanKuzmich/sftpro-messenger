import { model, Schema } from "mongoose"

import {MessageModel} from "@interfaces/models/message.interface"

const MessageSchema = new Schema<MessageModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'Channel',
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

export const Message = model<MessageModel>('Message', MessageSchema)
