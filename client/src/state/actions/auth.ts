import { createAction } from "redux-act"
import { UserPayload } from "state/interfaces/auth"

export const getCurrentUserRequest = createAction("CURRENT_USER_REQUEST")
export const getCurrentUserSuccess = createAction<UserPayload>("CURRENT_USER_SUCCESS")
export const getCurrentUserFail = createAction("CURRENT_USER_FAIL")

export const clearErrors = createAction("CURRENT_USER_CLEAR_ERROR")
