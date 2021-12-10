import {Document} from "mongoose"

import {DbKeys} from "@interfaces/db"

import {User} from "@database/models/user.model"
import {Message} from "@database/models/message.model"
import {Membership} from "@database/models/membership.model"
import {Emoticon} from "@database/models/emoticon.model"
import {Channel} from "@database/models/channel.model"

export const DB: DbKeys = {
  User,
  Message,
  Membership,
  Emoticon,
  Channel
}
