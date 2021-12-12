import { DB } from "@database/entity"

import { DBResponse } from "@interfaces/db"
import { EmoticonModel } from "@interfaces/models/emoticon.interface"
import { MessageModel } from "@interfaces/models/message.interface"


class EmoticonService {
  public messageModel = DB.Message

  public async addIcon(emoticon: EmoticonModel): DBResponse<MessageModel> {
    const message = await this.messageModel.findById(emoticon.messageId)
    const emoteObj = {userId: emoticon.userId, icon: emoticon.icon}

    message.emoticons.push(emoteObj)

    await message.save()

    return message
  }
}

export default EmoticonService
