import { Dispatch } from "redux"
import * as actions from "state/actions/auth"
import API from "lib/api"

export const getCurrentUser = (url: string) => (dispatch: Dispatch) => {
  dispatch(actions.getCurrentUserRequest())
  API.get(url, { params: { fallback: false } })
    .then(({ data }) => {
      if (data.id) {
        dispatch(actions.getCurrentUserSuccess(data))
      } else {
        dispatch(actions.getCurrentUserFail())
      }
    })
    .catch(() => dispatch(actions.getCurrentUserFail()))
}
