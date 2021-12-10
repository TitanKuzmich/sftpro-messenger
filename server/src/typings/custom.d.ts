import * as express from "express"

import {UserAttributes} from "@interfaces/models/user.interface"

declare module "express" {
  export interface Request extends express.Request {
    user?: UserAttributes
  }

  export interface Response extends express.Response {}
  export interface NextFunction extends express.NextFunction {}
}
