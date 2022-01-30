import { createStore, applyMiddleware, combineReducers } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly"
import thunk from "redux-thunk"
import auth from "state/reducers/auth"
import { AuthState } from "state/interfaces/auth"

const composeEnhancers = composeWithDevTools({
  name: "SftproChatApp"
})

export type State = {
 auth: AuthState
}

const reducer = combineReducers<State>({
  auth
})

const store: any = createStore(reducer, composeEnhancers(applyMiddleware(thunk)))

export default store
