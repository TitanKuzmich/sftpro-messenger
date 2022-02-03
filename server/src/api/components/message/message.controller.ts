import { Request, Response } from "express"
import httpStatus from "http-status"

import ControllerBase from "@root/ControllerBase"
import MessageService from "@root/api/components/message/message.service"
import { DB } from "@database/entity"

class MessageController extends ControllerBase {
  public messageService = new MessageService()

  public getAll = async (req: Request, res: Response) => {
    const messages = await DB.Message.find({})

    return res.json(messages)
  }

  public postMessage = async (req: Request, res: Response) => {
    const message = req.body
    const newMessage = await this.messageService.createMessage(message)

    return res.json(newMessage)
  }

  public getOne = async (req: Request, res: Response) => {
    const { messageId } = req.params

    if (!messageId) {
      return this.httpError(res, "Invalid message ID", httpStatus.BAD_REQUEST)
    }

    const response = await this.messageService.getMessageById(messageId)

    return res.json(response)
  }

  public edit = async (req: Request, res: Response) => {
    const { messageId } = req.params
    const payload = req.body

    const response = await this.messageService.editMessage(messageId, payload)

    if (response && response._id) {
      return res.json({ updatedMessage: response })
    }

    return res.json({ success: false, message: "Message does not exists" })
  }

  public deleteMessage = async (req: Request, res: Response) => {
    const { messageId } = req.params

    const response = await DB.Message.findByIdAndDelete({ _id: messageId })

    if (response) {
      return res.json({ deletedId: response._id })
    }

    return res.json({ success: false, message: "Something went wrong" })
  }
}

export default MessageController
