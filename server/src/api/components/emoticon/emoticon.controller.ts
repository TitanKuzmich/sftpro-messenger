import { Request, Response } from "express"
import httpStatus from "http-status"

import ControllerBase from "@root/ControllerBase"
import EmoticonService from "@root/api/components/emoticon/emoticon.service"
import { DB } from "@database/entity"

class EmoticonController extends ControllerBase {
  public emoticonService = new EmoticonService()

  public getEmoticon = async (req: Request, res: Response) => {
    const emoticons = await DB.Emoticon.find({})

    if(!emoticons) {
      return this.httpError(res, "Something went wrong", httpStatus.BAD_REQUEST)
    }

    return res.json(emoticons)
  }

  public postEmoticon = async (req: Request, res: Response) => {
    const emoticon = await DB.Emoticon.create(req.body)

    const response = await this.emoticonService.addIcon(emoticon)

    if (response && response._id) {
      return res.json({ updatedMessage: response })
    }

    return this.httpError(res, "Something went wrong", httpStatus.BAD_REQUEST)
  }
}

export default EmoticonController
