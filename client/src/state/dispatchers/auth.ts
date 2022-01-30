import { Dispatch } from "redux"
import * as actions from "state/actions/auth"
import API from "lib/api"
import config from "config"

export const getCurrentUser = (action: string) => (dispatch: Dispatch) => {
  const url = action === "login" ? config.paths.auth : config.paths.register

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
