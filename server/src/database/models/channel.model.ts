import {model, Schema} from "mongoose"

import {ChannelInterface} from "@interfaces/models/channel.interface"

const ChannelSchema = new Schema<ChannelInterface>({
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

export const ChannelModel= model<ChannelInterface>('channel', ChannelSchema)
