import { Request, Response } from "express"
import httpStatus from "http-status"

import ControllerBase from "@root/ControllerBase"
import ChannelService from "@root/api/components/channels/channels.service"
import { DB } from "@database/entity"

class ChannelsController extends ControllerBase {
  public channelModel = DB.Channel
  public channelService = new ChannelService()

  public getAll = async (req: Request, res: Response) => {
    const messages = await this.channelModel.find({})

    return res.json(messages)
  }

  public createChannel = async (req: Request, res: Response) => {
    const newChannel = req.body
    const userIds = req.body.userIds

    const createdChannel = await this.channelService.createChannel(newChannel, userIds)

    return res.json(createdChannel)
  }

  public getOne = async (req: Request, res: Response) => {
    const { messageId } = req.params

    if (!messageId) {
      return this.httpError(res, "There is no channel with that ID", httpStatus.BAD_REQUEST)
    }

    const response = await this.channelService.getChannelById(messageId)

    return res.json(response)
  }

  public deleteChannel = async (req: Request, res: Response) => {
    const { channelId } = req.params

    const deletedChannel = await this.channelModel.findByIdAndDelete({ channelId })
    const deletedMembership = await DB.Membership.findByIdAndDelete({ channelId })

    if (deletedChannel && deletedMembership) {
      return res.json({ deletedChannel, deletedMembership })
    }

    return res.json({ success: false, message: "Something went wrong" })
  }

  public getUsers = async (req: Request, res: Response) => {
    const { channelId } = req.params

    const users = await this.channelService.fetchUsers(channelId)

    if (users) {
      return res.json({ users })
    }

    return res.json({ success: false, message: "Something went wrong" })
  }

  public getMessages = async (req: Request, res: Response) => {
    const { channelId } = req.params

    const messages = await this.channelService.fetchMessages(channelId)

    return res.json({ messages })
  }
}

export default ChannelsController
