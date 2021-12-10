import {model, Schema} from "mongoose"

import {EmoticonModel} from "@interfaces/models/emoticon.interface"

const EmoticonSchema = new Schema<EmoticonModel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    index: true,
    required: true
  },
  messageId: {
    type: Schema.Types.ObjectId,
    ref: 'message',
    index: true,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
});

export const Emoticon = model<EmoticonModel>('emoticon', EmoticonSchema)
