import {model, Schema} from "mongoose"

import {EmoticonModel} from "@interfaces/models/emoticon.interface"

const EmoticonSchema = new Schema<EmoticonModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'Message',
    index: true,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
});

export const Emoticon = model<EmoticonModel>('Emoticon', EmoticonSchema)
