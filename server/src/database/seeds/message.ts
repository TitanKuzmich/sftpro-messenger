import {Schema} from "mongoose"

import {DB} from "@database/entity"

import {MessageModel} from "@interfaces/models/message.interface"
import {EmoticonModel} from "@interfaces/models/emoticon.interface"

const message: Array<Partial<MessageModel>> = []

const initMessage = async () => {
  const users = await DB.User.find({}, {_id: 1, username: 1})
  const channels = await DB.Channel.find({}, {_id: 1, name: 1})

  for (const channel of channels) {
    const numberOfChannelsMembers = Math.floor(Math.random() * (users.length -  1))

    for (let i = 0; i <= numberOfChannelsMembers; i += 1) {
      const item: {
        channelId: string | Schema.Types.ObjectId
        userId: string | Schema.Types.ObjectId
        content: string
        emoticons: Array<Partial<EmoticonModel>>
      } = {
        channelId: channel._id,
        userId: users[i]._id,
        content: "Hello from, " + users[i].username + "; to chat: " + channel.name + " " + (Math.random() + 1).toString(36).substring(7),
        emoticons: []
      }

      message.push({...item})
    }
  }
}

export default {
  model: DB.Message,
  data: message,
  initMethod: initMessage
}
