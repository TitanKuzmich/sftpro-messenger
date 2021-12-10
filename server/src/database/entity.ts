import {UserModel} from "@database/models/user.model"
import {MessageModel} from "@database/models/message.model"
import {MembershipModel} from "@database/models/membership.model"
import {EmoticonModel} from "@database/models/emoticon.model"
import {ChannelModel} from "@database/models/channel.model"

export const DB = {
  User: UserModel,
  Message: MessageModel,
  Membership: MembershipModel,
  Emoticon: EmoticonModel,
  Channel: ChannelModel
}
