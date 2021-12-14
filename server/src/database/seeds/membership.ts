import {Schema} from "mongoose"

import {DB} from "@database/entity"

import {MembershipModel} from "@interfaces/models/membership.interface"

const membership: Array<Partial<MembershipModel>> = []

const initMembership = async () => {
  const users = await DB.User.find({}, {_id: 1})
  const channels = await DB.Channel.find({}, {_id: 1})

  for (const channelId of channels) {
    const numberOfChannelsMembers = Math.floor(Math.random() * (users.length -  1))

    for (let i = 0; i <= numberOfChannelsMembers; i += 1) {
      const item: {
        channelId: string | Schema.Types.ObjectId
        userId: string | Schema.Types.ObjectId
      } = {
        channelId: channelId,
        userId: users[i]
      }

      membership.push({...item})
    }
  }
}

export default {
  model: DB.Membership,
  data: membership,
  initMethod: initMembership
}
