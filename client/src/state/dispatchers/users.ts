import { Dispatch } from "redux"
import * as actions from "state/actions/users"
import API from "lib/api"

export const getUsers = () => (dispatch: Dispatch) => {
  dispatch(actions.getUsersRequest())
  API.get("/users", { params: { fallback: false } })
    .then(({ data }) => {
      if (data.id) {
        dispatch(actions.getUsersSuccess(data))
      } else {
        dispatch(actions.getUsersFail())
      }
    })
    .catch(() => dispatch(actions.getUsersFail()))
}
