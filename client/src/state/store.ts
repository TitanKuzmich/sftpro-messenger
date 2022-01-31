import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import auth from "state/reducers/auth"
import users from "state/reducers/users"
import { AuthState } from "state/interfaces/auth"
import { UsersState } from "state/interfaces/users"

const composeEnhancers = composeWithDevTools({
  name: "SftproChatApp"
})

export type State = {
  auth: AuthState
  users: UsersState
}

const reducer = combineReducers<State>({
  auth,
  users,
})

const store: any = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
