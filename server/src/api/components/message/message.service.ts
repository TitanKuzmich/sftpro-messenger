import httpStatus from "http-status"
import ApiError from "@helpers/api-error"
import {DB} from "@database/entity"

import {DBResponse} from "@interfaces/db"
import {MessageModel} from "@interfaces/models/message.interface"

class MessageService {
  public messageModel = DB.Message

  public async getMessageById(id: string): DBResponse<MessageModel> {
    if (!id) throw new ApiError("Message does not exists", httpStatus.INTERNAL_SERVER_ERROR)

    return await this.messageModel.findById({_id: id})
  }

  public async createMessage(payload: MessageModel): DBResponse<MessageModel> {
    const newMessage = await this.messageModel.create(payload)
    await newMessage.save()

    const expandedMessage = await this.messageModel.findOne(newMessage).populate('userId', '_id username aviUrl')

    if (!expandedMessage) {
      return null
    }

    return expandedMessage
  }

  public async editMessage(id: string, payload: MessageModel): DBResponse<MessageModel> {
    const updatedMessage = await this.messageModel.findById({ _id: id })

    if (!updatedMessage) {
      return null
    }

    await updatedMessage.update(payload)
    await updatedMessage.save()

    return updatedMessage
  }
}

export default MessageService
