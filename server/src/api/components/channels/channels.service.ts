import httpStatus from "http-status"
import { ObjectId } from "mongoose"

import ApiError from "@helpers/api-error"
import {DB} from "@database/entity"

import {DBResponse} from "@interfaces/db"
import {ChannelModel} from "@interfaces/models/channel.interface"
import {MembershipModel} from "@interfaces/models/membership.interface"
import { MessageModel } from "@root/interfaces/models/message.interface"

class ChannelService {
  public channelModel = DB.Channel
  public membershipModel = DB.Membership
  public messageModel = DB.Message

  public async getChannelById(id: string): DBResponse<ChannelModel> {
    if (!id) throw new ApiError("Channel does not exists", httpStatus.INTERNAL_SERVER_ERROR)

    return await this.channelModel.findById({ _id: id })
  }

  public async createChannel(payload: ChannelModel, userIds: Array<string>): DBResponse<ChannelModel> {
    const newChannel = await this.channelModel.create({...payload})
    await newChannel.save()

    if (userIds) {
      const channelId = newChannel._id

      userIds.map(async (id) => {
        await this.membershipModel.create({ userId: id, channelId: channelId})
      })
    }

    return newChannel
  }

  public async fetchUsers(channelId: string): DBResponse<Array<string | ObjectId>> {
    const memberships = await this.membershipModel.find({ channelId: channelId }).populate('userId', '_id username aviUrl')
    const users: Array<string | ObjectId> = []

    memberships.forEach((membership: MembershipModel) => {
      users.push(membership.userId)
    })

    return users
  }

  public async fetchMessages(channelId: string): DBResponse<Array<MessageModel>> {
    const response = await this.messageModel.find({ channelId: channelId }).populate('userId', '_id username aviUrl')
    const messages: Array<MessageModel> = []

    response.forEach((item: MessageModel) => {
      messages.push(item)
    })

    return messages
  }
}

export default ChannelService
