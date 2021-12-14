import {model, Schema} from "mongoose"

import {ChannelModel} from "@interfaces/models/channel.interface"

const ChannelSchema = new Schema<ChannelModel>({
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

export const Channel = model<ChannelModel>('Channel', ChannelSchema)
