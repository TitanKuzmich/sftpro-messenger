import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"
import ReactDOM from "react-dom"
import store from "state/store"
import InitialRouting from "@app/App/InitialRouting"

import "./styles/index.scss"

const renderApp = () => {
  const target = document.getElementById("root")
  if (!target) return

  try {
    ReactDOM.render(
      <Provider store={store}>
        <React.Suspense fallback={null}>
          <BrowserRouter>
            <InitialRouting />
          </BrowserRouter>
        </React.Suspense>
      </Provider>,
      target
    )
  } catch (err) {
    const div = document.createElement("div")
    div.innerHTML = "Something went wrong. Please contact support@wavix.com"
    target.appendChild(div)
  }

  // Insert font separated from components to prevent blinking
  const head = document.getElementsByTagName("head")[0]
  const style = document.createElement("style")
  head.appendChild(style)
}

renderApp()
