import {model, Schema} from "mongoose"

import {EmoticonInterface} from "@interfaces/models/emoticon.interface"

const EmoticonSchema = new Schema<EmoticonInterface>({
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

export const EmoticonModel = model<EmoticonInterface>('emoticon', EmoticonSchema)
