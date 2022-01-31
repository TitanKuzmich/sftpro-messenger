import { createReducer } from "redux-act"
import * as actions from "state/actions/users"
import { UsersState } from "state/interfaces/users"

const defaultState: UsersState = {
  isLoading: true,
  users: []
}

const users = createReducer(
  {
    [actions.getUsersRequest.getType()](state) {
      return {
        ...state,
        isLoading: true
      }
    },
    [actions.getUsersSuccess.getType()](state, payload) {
      return {
        ...state,
        isLoading: false,
        users: payload.users
      }
    },
    [actions.getUsersFail.getType()](state) {
      return {
        ...state,
        isLoading: false
      }
    }
  },
  defaultState
)

export default users
