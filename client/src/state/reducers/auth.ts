import { createReducer } from "redux-act"
import * as actions from "state/actions/auth"
import { AuthState } from "state/interfaces/auth"

const defaultState: AuthState = {
  isLoading: true,
  user: {
    email: "",
    first_name: "",
    last_name: ""
  }
}

const auth = createReducer(
  {
    [actions.getCurrentUserRequest.getType()](state) {
      return {
        ...state,
        isLoading: true
      }
    },
    [actions.getCurrentUserSuccess.getType()](state, payload) {
      return {
        ...state,
        isLoading: false,
        user: payload
      }
    },
    [actions.getCurrentUserFail.getType()](state) {
      return {
        ...state,
        isLoading: false
      }
    }
  },
  defaultState
)

export default auth
