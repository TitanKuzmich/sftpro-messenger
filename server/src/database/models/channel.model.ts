import {model, Schema} from "mongoose"

import {EmoticonModel} from "@interfaces/models/channel.interface"

const ChannelSchema = new Schema<EmoticonModel>({
  name: {
    type: String,
    required: true,
    index: true
  },

  private: {
    type: Boolean,
    default: false
  }
});

export const Channel = model<EmoticonModel>('channel', ChannelSchema)
