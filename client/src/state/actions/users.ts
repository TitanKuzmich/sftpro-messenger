import { createAction } from "redux-act"
import { UserPayload } from "state/interfaces/users"

export const getUsersRequest = createAction("GET_USERS_REQUEST")
export const getUsersSuccess = createAction<Array<UserPayload>>("GET_USERS_SUCCESS")
export const getUsersFail = createAction("GET_USERS_FAIL")
