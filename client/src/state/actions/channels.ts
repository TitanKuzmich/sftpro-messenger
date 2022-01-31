import { createAction } from "redux-act"
import { ChannelPayload } from "state/interfaces/channels"

export const getChannelsRequest = createAction("GET_CHANNELS_REQUEST")
export const getChannelsSuccess = createAction<Array<ChannelPayload>>("GET_CHANNELS_SUCCESS")
export const getChannelsFail = createAction("GET_CHANNELS_FAIL")
