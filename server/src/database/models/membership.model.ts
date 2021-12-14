import { model, Schema } from "mongoose"

import {MembershipModel} from "@interfaces/models/membership.interface"


const MembershipSchema = new Schema<MembershipModel>({
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

export const Membership= model<MembershipModel>('Membership', MembershipSchema)
