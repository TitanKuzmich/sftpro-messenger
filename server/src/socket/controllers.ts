import { SocketEvent } from "@interfaces/socket"
// import * as supportActions from "@root/api/site/components/support/support.socket"
import { sendToWS } from "@root/socket/client"
// import { getUserById } from "@services/users.service"
// import { getUnreadRepliesByEmail } from "@services/freshdesk.service"

export const processEvent = (userId: string, event: SocketEvent) => {
  // switch (event.type) {
  //   case "support.customer.reply":
  //     return supportActions.customerReply(userId, event)
  //
  //   default:
  //     return true
  // }
}

export const userConnectHook = async (userId: string) => {
  // const users = await getUserById(userId)

  // if (!users) {
  //   return
  // }
  //
  // const unreadRepliesIds = await getUnreadRepliesByEmail(users.email)
  // sendToWS(userId, {
  //   type: "users.config",
  //   payload: { id: userId, new_tickets_replies: unreadRepliesIds }
  // })
}
