import { SocketEvent } from "@interfaces/socket"
// import * as supportActions from "@root/api/site/components/support/support.socket"
import { sendToWS } from "@root/socket/client"
// import { getUserById } from "@services/users.service"
// import { getUnreadRepliesByEmail } from "@services/freshdesk.service"

export const processEvent = (userId: number, event: SocketEvent) => {
  // switch (event.type) {
  //   case "support.customer.reply":
  //     return supportActions.customerReply(userId, event)
  //
  //   default:
  //     return true
  // }
}

export const userConnectHook = async (userId: number) => {
  // const user = await getUserById(userId)

  // if (!user) {
  //   return
  // }
  //
  // const unreadRepliesIds = await getUnreadRepliesByEmail(user.email)
  // sendToWS(userId, {
  //   type: "user.config",
  //   payload: { id: userId, new_tickets_replies: unreadRepliesIds }
  // })
}
