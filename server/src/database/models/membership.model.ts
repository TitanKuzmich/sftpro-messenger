import { model, Schema } from "mongoose"

import {MembershipInterface} from "@interfaces/models/membership.interface"


const MembershipSchema = new Schema<MembershipInterface>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    index: true
  },
  channelId: {
    type: Schema.Types.ObjectId,
    ref: 'channel',
    required: true,
    index: true
  }
});

export const MembershipModel= model<MembershipInterface>('membership', MembershipSchema)
