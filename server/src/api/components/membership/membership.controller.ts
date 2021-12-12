import { Request, Response } from "express"
import httpStatus from "http-status"

import ControllerBase from "@root/ControllerBase"
import { DB } from "@database/entity"

class MembershipController extends ControllerBase {

  public getMembership = async (req: Request, res: Response) => {
    const memberships = await DB.Membership.find({})

    if(!memberships) {
      return this.httpError(res, "Something went wrong", httpStatus.BAD_REQUEST)
    }

    return res.json(memberships)
  }
}

export default MembershipController
