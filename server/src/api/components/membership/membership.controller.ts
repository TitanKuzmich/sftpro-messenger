import { Request, Response } from "express"

import ControllerBase from "@root/ControllerBase"
import { DB } from "@database/entity"

class MembershipController extends ControllerBase {

  public getMembership = async (req: Request, res: Response) => {
    const memberships = await DB.Membership.find({})

    return res.json(memberships)
  }
}

export default MembershipController
